import { NextRequest, NextResponse } from "next/server";

async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // skip in dev if not set

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
): Promise<void> {
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

  await fetch("https://www.zohoapis.com/crm/v7/Leads", {
    method: "POST",
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
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
      await Promise.all([
        subscribeToZohoCampaigns(accessToken, {
          email: data.email ?? "",
          firstName: data.prenom ?? "",
          lastName: data.nom ?? "",
          company: data.societe,
        }),
        createZohoCRMLead(accessToken, data),
      ]);
    }
  } catch {
    // Zoho errors are non-fatal — form submission succeeds regardless
  }

  return NextResponse.json({ ok: true });
}
