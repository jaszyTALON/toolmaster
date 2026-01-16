'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-white">Critical Error</h1>
            <p className="text-slate-400">
              A critical error occurred. Please try refreshing the page.
            </p>
          </div>

          <button
            onClick={reset}
            className="px-6 py-3 bg-gradient-to-r from-[#38bdf8] to-[#2563eb] text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Try Again
          </button>

          {error.digest && (
            <p className="text-xs text-slate-600">Error ID: {error.digest}</p>
          )}
        </div>
      </body>
    </html>
  );
}
