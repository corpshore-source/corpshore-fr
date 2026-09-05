import { NextRequest, NextResponse } from "next/server";

async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  /**
   * Fail closed in production, open everywhere else.
   *
   * `return true` was the old behaviour and it is the wrong one here. The site
   * key is hardcoded in the pages, so the widget always renders and visitors
   * are always challenged; accepting a submission that nothing verified turns
   * that challenge into theatre, and the form reads as protected while being
   * wide open. Refusing is worse for one honest visitor and better than the
   * alternative, which is not knowing.
   *
   * Outside production there is no secret to expect, so the form still works
   * locally and on previews.
   */
  if (!secret) {
    const production = process.env.VERCEL_ENV
      ? process.env.VERCEL_ENV === "production"
      : process.env.NODE_ENV === "production";
    return !production;
  }

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret, response: token }),
  });
  const data = await res.json();
  return data.success === true;
}

async function getZohoAccessToken(): Promise<string | null> {
  const { ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN } = process.env;
  if (!ZOHO_CLIENT_ID || !ZOHO_CLIENT_SECRET || !ZOHO_REFRESH_TOKEN) return null;

  const res = await fetch("https://accounts.zoho.com/oauth/v2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      refresh_token: ZOHO_REFRESH_TOKEN,
      client_id: ZOHO_CLIENT_ID,
      client_secret: ZOHO_CLIENT_SECRET,
      grant_type: "refresh_token",
    }),
  });
  const data = await res.json();
  return data.access_token ?? null;
}

async function subscribeToZohoCampaigns(
  accessToken: string,
  contact: { email: string; firstName: string; lastName: string; company?: string }
): Promise<void> {
  const listKey = process.env.ZOHO_CAMPAIGNS_LIST_KEY;
  if (!listKey) return;

  const contactInfo = JSON.stringify({
    "Contact Email": contact.email,
    "First Name": contact.firstName,
    "Last Name": contact.lastName,
    ...(contact.company ? { Company: contact.company } : {}),
  });

  await fetch(
    `https://campaigns.zoho.com/api/v1.1/json/listsubscribe?resfmt=JSON&listkey=${encodeURIComponent(listKey)}&contactinfo=${encodeURIComponent(contactInfo)}`,
    {
      method: "POST",
      headers: { Authorization: `Zoho-oauthtoken ${accessToken}` },
    }
  );
}

async function createZohoCRMLead(
  accessToken: string,
  data: Record<string, string>
): Promise<string | null> {
  const body = {
    data: [
      {
        Last_Name: data.nom ?? "Unknown",
        First_Name: data.prenom ?? "",
        Email: data.email ?? "",
        Phone: data.tel ?? "",
        Company: data.societe ?? "",
        Country: data.pays ?? "",
        Description: `[Corpshore.fr contact form]\nService: ${data.service ?? ""}\n\n${data.message ?? ""}`,
        Lead_Source: "Website",
      },
    ],
  };

  const res = await fetch("https://www.zohoapis.com/crm/v7/Leads", {
    method: "POST",
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const result = await res.json();
  return (result?.data?.[0]?.details?.id as string) ?? null;
}

async function addZohoNote(
  accessToken: string,
  leadId: string,
  content: string
): Promise<void> {
  await fetch("https://www.zohoapis.com/crm/v7/Notes", {
    method: "POST",
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: [
        {
          Note_Title: "Données outils — corpshore.fr",
          Note_Content: content,
          Parent_Id: leadId,
          se_module: "Leads",
        },
      ],
    }),
  });
}

export async function POST(req: NextRequest) {
  let data: Record<string, string>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Validate Turnstile
  const turnstileToken = data["cf-turnstile-response"] ?? "";
  const tsOk = await verifyTurnstile(turnstileToken);
  if (!tsOk) {
    return NextResponse.json({ error: "Security check failed. Please try again." }, { status: 400 });
  }

  // Zoho integration (env-gated — activates once ZOHO_REFRESH_TOKEN is set)
  try {
    const accessToken = await getZohoAccessToken();
    if (accessToken) {
      const [leadId] = await Promise.all([
        createZohoCRMLead(accessToken, data),
        subscribeToZohoCampaigns(accessToken, {
          email: data.email ?? "",
          firstName: data.prenom ?? "",
          lastName: data.nom ?? "",
          company: data.societe,
        }),
      ]);
      if (leadId && data.tool_insights) {
        await addZohoNote(accessToken, leadId, data.tool_insights);
      }
    }
  } catch {
    // Zoho errors are non-fatal — form submission succeeds regardless
  }

  return NextResponse.json({ ok: true });
}
