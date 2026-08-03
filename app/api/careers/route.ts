import { NextRequest, NextResponse } from "next/server";

async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
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
): Promise<void> {
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

  await fetch("https://recruit.zoho.com/recruit/v2/Candidates", {
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

  const tsOk = await verifyTurnstile(data["cf-turnstile-response"] ?? "");
  if (!tsOk) {
    return NextResponse.json({ error: "Security check failed. Please try again." }, { status: 400 });
  }

  try {
    const accessToken = await getZohoAccessToken();
    if (accessToken) {
      await createRecruitCandidate(accessToken, data);
    }
  } catch {
    // Non-fatal — submission still acknowledged
  }

  return NextResponse.json({ ok: true });
}
