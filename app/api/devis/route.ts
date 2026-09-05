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

async function createCRMLead(
  accessToken: string,
  fields: Record<string, string>
): Promise<string | null> {
  const description = [
    `[Formulaire Devis — corpshore.fr]`,
    `Service : ${fields.service ?? ""}`,
    `Effectif souhaité : ${fields.effectif ?? ""}`,
    `Délai de démarrage : ${fields.delai ?? ""}`,
    `Budget mensuel estimé : ${fields.budget ?? "Non précisé"}`,
    ``,
    `Description du projet :`,
    fields.description ?? "",
  ].join("\n");

  const body = {
    data: [
      {
        Last_Name: fields.nom ?? "Unknown",
        First_Name: fields.prenom ?? "",
        Email: fields.email ?? "",
        Phone: fields.tel ?? "",
        Company: fields.societe ?? "",
        Website: fields.site_web ?? "",
        Country: fields.pays ?? "",
        Description: description,
        Lead_Source: "Website - Formulaire Devis",
        No_of_Employees: parseInt(fields.effectif_count ?? "0") || undefined,
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

async function addNote(
  accessToken: string,
  leadId: string,
  title: string,
  content: string
): Promise<void> {
  await fetch("https://www.zohoapis.com/crm/v7/Notes", {
    method: "POST",
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: [{ Note_Title: title, Note_Content: content, Parent_Id: leadId, se_module: "Leads" }],
    }),
  });
}

async function attachFileToCRMLead(
  accessToken: string,
  leadId: string,
  file: File
): Promise<void> {
  const form = new FormData();
  form.append("Content", file, file.name);
  await fetch(`https://www.zohoapis.com/crm/v7/Leads/${leadId}/Attachments`, {
    method: "POST",
    headers: { Authorization: `Zoho-oauthtoken ${accessToken}` },
    body: form,
  });
}

export async function POST(req: NextRequest) {
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const get = (key: string) => ((formData.get(key) as string) ?? "").trim();

  const tsOk = await verifyTurnstile(get("cf-turnstile-response"));
  if (!tsOk) {
    return NextResponse.json({ error: "Security check failed. Please try again." }, { status: 400 });
  }

  const fields: Record<string, string> = {
    nom: get("nom"),
    prenom: get("prenom"),
    email: get("email"),
    tel: get("tel"),
    societe: get("societe"),
    site_web: get("site_web"),
    pays: get("pays"),
    service: get("service"),
    effectif: get("effectif"),
    effectif_count: get("effectif_count"),
    delai: get("delai"),
    budget: get("budget"),
    description: get("description"),
  };

  const files = formData.getAll("files") as File[];
  const validFiles = files.filter((f) => f instanceof File && f.size > 0 && f.size < 10 * 1024 * 1024);

  try {
    const accessToken = await getZohoAccessToken();
    if (accessToken) {
      const leadId = await createCRMLead(accessToken, fields);
      if (leadId) {
        // Tool insights from interactive tools, if present
        const toolInsights = get("tool_insights");
        if (toolInsights) {
          await addNote(accessToken, leadId, "Données outils — corpshore.fr", toolInsights);
        }
        // Upload attachments sequentially
        for (const file of validFiles) {
          await attachFileToCRMLead(accessToken, leadId, file);
        }
      }
    }
  } catch {
    // Non-fatal — form submission still acknowledged
  }

  return NextResponse.json({ ok: true });
}

export const maxDuration = 30;
