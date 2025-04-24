// components/Breadcrumb.tsx
import Link from "next/link";

interface BreadcrumbProps {
  year: string;
  week: string;
}

export default function Breadcrumb({ year, week }: BreadcrumbProps) {
  return (
    <nav className="text-sm text-gray-600 mb-8">
      <ol className="flex space-x-2">
        <li>
          <Link href="/" className="hover:underline text-blue-600">
            I75 League
          </Link>
          <span className="mx-1">/</span>
        </li>
        <li>
          <Link href={`/recaps/${year}`} className="hover:underline text-blue-600">
            {year}
          </Link>
          <span className="mx-1">/</span>
        </li>
        <li className="text-gray-900 font-semibold">{week}</li>
      </ol>
    </nav>
  );
}
