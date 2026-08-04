import { NextRequest, NextResponse } from "next/server";

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

export async function POST(req: NextRequest) {
  let body: { email?: string; rgpd?: boolean };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  if (!body.rgpd) {
    return NextResponse.json({ error: "Consent required" }, { status: 400 });
  }

  try {
    const accessToken = await getZohoAccessToken();
    if (accessToken) {
      const listKey = process.env.ZOHO_CAMPAIGNS_LIST_KEY;
      if (listKey) {
        const contactInfo = JSON.stringify({ "Contact Email": email });
        await fetch(
          `https://campaigns.zoho.com/api/v1.1/json/listsubscribe?resfmt=JSON&listkey=${encodeURIComponent(listKey)}&contactinfo=${encodeURIComponent(contactInfo)}`,
          {
            method: "POST",
            headers: { Authorization: `Zoho-oauthtoken ${accessToken}` },
          }
        );
      }
    }
  } catch {
    // Non-fatal — still acknowledge subscription
  }

  return NextResponse.json({ ok: true });
}
