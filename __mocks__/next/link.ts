import * as React from "react";
import type { ReactNode } from "react";
import type { UrlObject } from "url";
import type { AnchorHTMLAttributes } from "react";

interface LinkMockProps
  // drop the built-in href so we can replace its type
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">
{
  href: string | UrlObject;
  children: ReactNode;
}

export default function LinkMock({
  href,
  children,
  ...rest
}: LinkMockProps) {
  let url = "";

  if (typeof href === "string") {
    url = href;
  } else {
    // coalesce out both `undefined` and `null`:
    const pathname = href.pathname ?? "";
    url = pathname;

    const { query } = href;
    if (query && typeof query === "object") {
      const params = new URLSearchParams(
        query as Record<string, string>
      ).toString();
      if (params) {
        url += "?" + params;
      }
    }
  }

  return React.createElement(
    "a",
    { href: url, ...rest },
    children
  );
}
