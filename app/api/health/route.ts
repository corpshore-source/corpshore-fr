import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Le site key est écrit en dur dans les pages, il ne peut donc jamais être
 * absent. C'est précisément ce qui rend l'absence du secret dangereuse : le
 * widget s'affiche quoi qu'il arrive.
 */
const TURNSTILE_SITE_KEY = "0x4AAAAAAEFhVlYr9OXOOWyC";

/**
 * Whether the contact forms on this site can actually receive anything.
 *
 * Written because the answer could not previously be obtained without harm.
 * Turnstile is checked before Zoho in every route here, so the only way to
 * find out whether the secret worked was to POST to the lead API without a
 * token — which, if the secret was missing, created a junk record in
 * production. An audit that has to dirty the CRM to run is an audit nobody
 * runs.
 *
 * The site key is hardcoded in the pages rather than read from an environment
 * variable, so it cannot be unset. That is what makes a missing secret the
 * serious case here and not merely untidy: visitors are challenged, and with
 * `if (!secret) return true` in the routes, nothing reads their answer. The
 * form looks protected and is not.
 *
 * Unauthenticated. It returns booleans and Cloudflare's own error codes, never
 * a secret or any part of one. The site key is already in the page HTML.
 */
export async function GET() {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  /**
   * A secret being present proves nothing: a wrong one, a rotated one and one
   * copied from another widget all look identical from outside until a real
   * visitor is refused.
   *
   * No real token is needed to tell them apart. Sent a token that cannot be
   * valid, Cloudflare answers `invalid-input-secret` when it does not
   * recognise the secret and `invalid-input-response` when it does and the
   * token is the problem. The second answer is the one that means the secret
   * is good.
   */
  let secretAccepted: boolean | null = null;
  let errorCodes: string[] = [];

  if (secret) {
    try {
      const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret, response: "healthcheck-not-a-real-token" }),
      });
      const data = (await res.json()) as { "error-codes"?: string[] };
      errorCodes = data["error-codes"] ?? [];
      secretAccepted = !errorCodes.includes("invalid-input-secret");
    } catch {
      secretAccepted = null;
    }
  }

  const zohoConfigured = Boolean(
    process.env.ZOHO_CLIENT_ID && process.env.ZOHO_CLIENT_SECRET && process.env.ZOHO_REFRESH_TOKEN,
  );

  return NextResponse.json(
    {
      // One line, so the answer does not depend on reading the rest correctly.
      contactForms:
        secretAccepted === true
          ? zohoConfigured
            ? "working"
            : "bot check working, but submissions are not reaching Zoho"
          : secret
            ? "the bot check is not working: Cloudflare rejects this secret"
            : "the widget is shown and nothing verifies it",

      turnstile: {
        siteKey: TURNSTILE_SITE_KEY,
        secretSet: Boolean(secret),
        secretAccepted,
        errorCodes,
        note: secret
          ? secretAccepted
            ? null
            : "Cloudflare does not recognise this secret. It does not belong to the widget this site key came from, or it has been rotated since."
          : "TURNSTILE_SECRET_KEY is not set. The site key is hardcoded in the pages, so visitors are challenged and the routes accept every submission unchecked.",
      },

      zoho: { configured: zohoConfigured },

      notChecked: [
        "Whether Zoho accepts the credentials, as opposed to them being present.",
        "Whether this hostname is on the widget's allowed list in Cloudflare. A correct secret still refuses visitors on a hostname the widget was not told about.",
      ],
    },
    { headers: { "X-Robots-Tag": "noindex" } },
  );
}
