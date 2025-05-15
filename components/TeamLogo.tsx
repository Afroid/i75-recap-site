import React from "react";

export default function TeamLogo({
  src,
  alt,
  className = "",
}: {
  src?: string;
  alt: string;
  className?: string;
}) {
  // Start with either the provided src or the default
  const [logo, setLogo] = React.useState(src || "/default-logo.png");

  return (
    <img
      src={logo}
      alt={alt}
      className={className}
      onError={() => {
        // If it fails to load, switch to the default logo
        if (logo !== "/default-logo.png") {
          setLogo("/default-logo.png");
        }
      }}
    />
  );
}
