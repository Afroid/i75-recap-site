import Link from "next/link";

export default function Logo() {
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

      {/* Lighter background, slightly maller */}
      <span
        className="
          absolute top-0 bottom-0 left-0 right-[-10px] bg-green-500
          skew-x-[-25deg] -z-10
          transition-transform duration-500 ease-in-out
          group-hover:scale-x-105 group-hover:shadow-lg
        "
      />

      {/* Text (no scaling) */}
      <span className="
        relative flex items-center justify-center
        text-2xl font-extrabold text-white
        tracking-wide px-4
      ">
        I75 League
      </span>
    </Link>
  );
}
