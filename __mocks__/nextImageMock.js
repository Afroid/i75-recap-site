import React from "react";

export default function Image({ src, alt, ...props }) {
  // Render a plain <img> so Jest can handle it
  return <img src={src} alt={alt} {...props} />;
}
