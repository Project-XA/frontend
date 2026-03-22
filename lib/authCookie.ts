import type { CookieAttributes } from "js-cookie";

/**
 * Auth token cookie options. `secure: true` breaks cookie storage on http://
 * (common in local dev); only enable when the page is served over HTTPS.
 */
export function getAuthCookieOptions(): CookieAttributes {
  if (typeof window === "undefined") {
    return { expires: 7, sameSite: "lax", path: "/" };
  }
  const isHttps = window.location.protocol === "https:";
  return {
    expires: 7,
    sameSite: "lax",
    path: "/",
    secure: isHttps,
  };
}
