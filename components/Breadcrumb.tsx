import Link from "next/link";
import { TestIds } from "@/lib/testIds";

interface BreadcrumbProps {
  year: string;
  week: string;
}

/**
 * A simple breadcrumb navigation component:
 * - Root link to home
 * - Year link to recap list
 * - Current week label (non-clickable)
 */
export default function Breadcrumb({ year, week }: BreadcrumbProps) {
  const crumbs = [
    { href: "/", label: "I75 League" },      // Home
    { href: `/recaps/${year}`, label: year },   // Year list
    { href: "", label: week },                // Current page
  ];

  return (
    <nav
      data-testid={TestIds.BREADCRUMB_NAV}
      aria-label="Breadcrumb"
      className="text-sm text-gray-600 mb-6"
    >
      <ol data-testid={TestIds.BREADCRUMB_LIST} className="flex flex-wrap">
        {crumbs.map((crumb, idx) => (
          <li
            key={idx}
            data-testid={`${TestIds.BREADCRUMB_ITEM}-${idx}`}
            className="flex items-center"
          >
            {crumb.href ? (
              // Clickable link for all but last crumb
              <Link
                data-testid={`${TestIds.BREADRCRUMB_LINK}-${idx}`}
                href={crumb.href}
                className="hover:underline text-blue-600"
              >
                {crumb.label}
              </Link>
            ) : (
              // Current page label
              <span
                data-testid={TestIds.BREADCRUMB_CURRENT}
                className="text-gray-900 font-semibold"
              >
                {crumb.label}
              </span>
            )}
            {idx !== crumbs.length - 1 && (
              // Separator line after I75 League and before Week X (Last element in breadcrumb)
              <span
                data-testid={`${TestIds.BREADCRUMB_SEPARATOR}-${idx}`}
                className="px-2 text-gray-400"
              >
                /
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
