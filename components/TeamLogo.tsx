import React from "react";
import Image from "next/image";
import { useLogo } from "@/lib/LogoContext";
import { TestIds } from "@/lib/testIds";

/**
 * TeamLogo component
 * Renders a team logo image, falling back to a random or default logo if loading fails.
 *
 * Props:
 * - src: Optional specific image URL for the team.
 * - alt: Alternative text for accessibility.
 * - className: Optional additional CSS classes.
 */
export default function TeamLogo({
  src,
  alt,
  className = "",
}: {
  src?: string;
  alt: string;
  className?: string;
}) {
  // Random src for logo in case a src isn't provided
  const randomLogoSrc = useLogo();

  return (
    <Image
      data-testid={TestIds.TEAM_LOGO_IMAGE}
      src={src || randomLogoSrc}
      alt={alt}
      width={88}
      height={11}
      className={className}
      onError={(e) => {
        // If it fails to load, switch to the default logo
        if (e.currentTarget.src.endsWith("default-logo.png") === false) {
          e.currentTarget.src = "/default-logo.png";
        }
      }}
    />
  );
}
