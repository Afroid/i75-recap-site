// pages/404.tsx
import Link from "next/link";

export default function Custom404() {
  return (
    <main
      className="
        min-h-[calc(100vh-3rem)]
        min-h-screen
        flex flex-col items-center justify-center
        text-center
        px-4
      "
    >
      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
      <p className="text-lg mb-6 text-center max-w-md">
        The page you're looking for doesn’t exist.
        You might’ve clicked a dead link or mistyped something.
      </p>
      <Link href="/" className="text-blue-600 hover:underline text-lg">
        Return Home
      </Link>
    </main>
  );
}
