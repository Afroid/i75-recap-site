import Link from "next/link";
import { TestIds } from "@/lib/testIds";

// Custom404: Overrides Next.js's default 404 page.
// Rendered when a user navigates to a non-existent route.
// Provides a friendly message and a link back to the home page.
export default function Custom404() {
  return (
    <main
      data-testid={TestIds.NOT_FOUND_MAIN}
      className={[
        "min-h-[calc(100vh-3rem)]",
        "min-h-screen",
        "flex flex-col items-center justify-center",
        "text-center",
        "px-4"
      ].join(" ")}
    >
      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
      <p className="text-lg mb-6 text-center max-w-md">
        The page you're looking for doesn’t exist.
        You might’ve clicked a dead link or mistyped something.
      </p>
      {/* Navigational link back to homepage */}
      <Link
        data-testid={TestIds.RETURN_HOME_LINK}
        href="/"
        className="text-blue-600 hover:underline text-lg"
      >
        Return Home
      </Link>
    </main>
  );
}
