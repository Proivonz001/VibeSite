import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, enabledLocales } from "@/i18n/config";

/**
 * URL strategy:
 *  - default locale (en) has no prefix:  /projects  -> internally /en/projects
 *  - other enabled locales keep it:      /it/projects
 * Requests that already carry an enabled locale pass through untouched.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Static assets (anything with a file extension) are never localized.
  const lastSegment = pathname.slice(pathname.lastIndexOf("/") + 1);
  if (lastSegment.includes(".")) return NextResponse.next();

  const hasPrefix = enabledLocales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasPrefix) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Next 16 rejects regex dots inside the matcher, so extension filtering lives above.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
