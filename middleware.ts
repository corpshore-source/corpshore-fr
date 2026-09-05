import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  /**
   * `api` has to be excluded here, and was not.
   *
   * Without it this middleware locale-redirects every API route: a form POSTs
   * to /api/contact, receives a 307 to /fr/api/contact, and that path does not
   * exist, so the request ends in a 404. Every form on the site failed that
   * way — contact, devis, careers and the newsletter — from the day this file
   * was added on 2026-08-01 until it was found on 2026-09-05. Nothing reached
   * Zoho, and nothing reported it, because a failed fetch the page does not
   * check looks exactly like a quiet month.
   *
   * The visible pages are unaffected by the exclusion. A locale prefix is
   * meaningless to a route handler, which returns one response whatever
   * language the reader is in.
   */
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
