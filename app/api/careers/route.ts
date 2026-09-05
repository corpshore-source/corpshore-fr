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

async function createRecruitCandidate(
  accessToken: string,
  data: Record<string, string>
): Promise<string | null> {
  const body = {
    data: [
      {
        Last_Name: data.nom ?? "Unknown",
        First_Name: data.prenom ?? "",
        Email: data.email ?? "",
        Mobile: data.tel ?? "",
        Current_Location: data.pays ?? "",
        Applied_For: data.poste ?? "",
        Cover_Letter: data.lettre ?? "",
        Source_Of_Application: "corpshore.fr",
      },
    ],
  };
  const res = await fetch("https://recruit.zoho.com/recruit/v2/Candidates", {
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

async function uploadCvToRecruit(
  accessToken: string,
  candidateId: string,
  cvFile: File
): Promise<void> {
  const form = new FormData();
  form.append("file", cvFile, cvFile.name);
  await fetch(
    `https://recruit.zoho.com/recruit/v2/Candidates/${candidateId}/Attachments`,
    {
      method: "POST",
      headers: { Authorization: `Zoho-oauthtoken ${accessToken}` },
      body: form,
    }
  );
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
    pays: get("pays"),
    poste: get("poste"),
    lettre: get("lettre"),
  };

  try {
    const accessToken = await getZohoAccessToken();
    if (accessToken) {
      const candidateId = await createRecruitCandidate(accessToken, fields);
      const cvFile = formData.get("cv");
      if (candidateId && cvFile instanceof File && cvFile.size > 0) {
        await uploadCvToRecruit(accessToken, candidateId, cvFile);
      }
    }
  } catch {
    // Non-fatal
  }

  return NextResponse.json({ ok: true });
}
