import Link from "next/link";

interface BreadcrumbProps {
  year: string;
  week: string;
}

export default function Breadcrumb({ year, week }: BreadcrumbProps) {
  const crumbs = [
    { href: "/", label: "I75 League" },
    { href: `/recaps/${year}`, label: year },
    { href: "", label: week },
  ];

  return (
    <nav className="text-sm text-gray-600 mb-8">
      <ol className="flex flex-wrap">
        {crumbs.map((crumb, idx) => (
          <li key={idx} className="flex items-center">
            {crumb.href ? (
              <Link href={crumb.href} className="hover:underline text-blue-600">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-gray-900 font-semibold">{crumb.label}</span>
            )}
            {idx !== crumbs.length - 1 && (
              <span className="px-2 text-gray-400">/</span> // ← automatic slash
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
