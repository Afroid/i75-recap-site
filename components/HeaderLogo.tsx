import Link from "next/link";
import Image from "next/image";
import { useLogo } from "@/lib/LogoContext";

export default function HeaderLogo() {
  // Random src for logo
  const logoSrc = useLogo();

  return (
    <Link href="/" className="relative inline-flex items-center justify-center group h-12">
      {/* Background Layers */}

      {/* Darker background, slightly wider */}
      <span
        className="
          absolute top-0 bottom-0 left-[-10px] right-[-20px] bg-green-600
          skew-x-[-25deg] -z-20
          transition-transform duration-500 ease-in-out
          group-hover:scale-x-110 group-hover:bg-green-700
        "
      />

      {/* Lighter background, slightly smaller */}
      <span
        className="
          absolute top-0 bottom-0 left-0 right-[-10px] bg-green-500
          skew-x-[-25deg] -z-10
          transition-transform duration-500 ease-in-out
          group-hover:scale-x-105 group-hover:shadow-lg
        "
      />

      {/* Foreground flex container for text and logo */}
      <div className="lg:pr-0 lg:pl-4 relative z-10 flex items-center gap-2">
        <Image
          src="/I75League.png"
          alt="League Name"
          width={88}
          height={11}
          className="drop-shadow-medium"
        />
        <Image
          src={logoSrc}
          alt="League Logo"
          width={88}
          height={11}
          className="h-12 w-auto drop-shadow-medium"
          priority
        />
      </div>
    </Link>
  );
}
