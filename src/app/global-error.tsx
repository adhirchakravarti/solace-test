"use client"; // Error boundaries must be Client Components

import { Lexend_Deca } from "next/font/google";

import { AppProviders } from "@/components/AppProviders/AppProviders";

const lexendDeca = Lexend_Deca({
  subsets: ["latin"],
});

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    // global-error must include html and body tags
    <html lang="en" suppressHydrationWarning>
      <body className={`${lexendDeca.className} h-dvh w-full p-6`}>
        <AppProviders>
          <h2 className="text-4xl font-light">Something went wrong!</h2>
          <p className="text-lg font-light">
            {error.message || "An unexpected error occurred."}
          </p>
          {error.digest && (
            <p className="text-sm text-gray-500">
              Error Digest: {error.digest}
            </p>
          )}
          <button onClick={() => reset()}>Try again</button>
        </AppProviders>
      </body>
    </html>
  );
}
