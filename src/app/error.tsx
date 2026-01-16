'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen w-full bg-[#020617] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="mx-auto w-16 h-16 rounded-full bg-[#ef4444]/20 flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-[#ef4444]" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">Something went wrong</h1>
          <p className="text-slate-400">
            An unexpected error occurred. Our team has been notified and is working on a fix.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={reset}
            className="bg-gradient-to-r from-[#38bdf8] to-[#2563eb] hover:from-[#38bdf8]/90 hover:to-[#2563eb]/90 text-white"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline" className="border-white/10 text-slate-300 hover:bg-white/5 w-full">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
        </div>

        {error.digest && (
          <p className="text-xs text-slate-600">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
