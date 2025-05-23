import Link from "next/link";
import Image from "next/image";
import { useLogo } from "@/lib/LogoContext";
import { TestIds } from "@/lib/testIds";

/**
 * HeaderLogo component displays the site logo and dynamic league logo
 * wrapped in a styled Link to the homepage.
 */
export default function HeaderLogo() {
  // Random logo URL from context
  const logoSrc = useLogo();

  return (
    <Link
      href="/"
      className="relative inline-flex items-center justify-center group h-12"
      data-testid={TestIds.HEADER_LOGO_LINK}
    >
      {/* Background Layers */}

      {/* Darker background, slightly wider */}
      <span
        data-testid={TestIds.HEADER_LOGO_BG_DARK}
        className={[
          "absolute top-0 bottom-0 left-[-10px] right-[-20px] bg-green-600",
          "skew-x-[-25deg] -z-20",
          "transition-transform duration-500 ease-in-out",
          "group-hover:scale-x-110 group-hover:bg-green-700"
        ].join(" ")}
      />

      {/* Lighter background, slightly smaller */}
      <span
        data-testid={TestIds.HEADER_LOGO_BG_LIGHT}
        className={[
          "absolute top-0 bottom-0 left-0 right-[-10px] bg-green-500",
          "skew-x-[-25deg] -z-10",
          "transition-transform duration-500 ease-in-out",
          "group-hover:scale-x-105 group-hover:shadow-lg"
        ].join(" ")}
      />

      {/* Foreground flex container holds the static and dynamic logos */}
      <div
        className="lg:pr-0 lg:pl-4 relative z-10 flex items-center gap-2"
        data-testid={TestIds.HEADER_LOGO_CONTAINER}
      >
        {/* Static site name image */}
        <Image
          src="/I75League.png"
          alt="League Name"
          width={88}
          height={11}
          className="drop-shadow-medium"
          data-testid={TestIds.HEADER_LOGO_NAME}
        />
        {/* Dynamic league logo */}
        <Image
          src={logoSrc}
          alt="League Logo"
          width={88}
          height={11}
          className="h-12 w-auto drop-shadow-medium"
          priority
          data-testid={TestIds.HEADER_LOGO_DYNAMIC}
        />
      </div>
    </Link>
  );
}
