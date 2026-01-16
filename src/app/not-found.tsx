import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Disc } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-[#020617] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="mx-auto w-16 h-16 rounded-lg bg-gradient-to-br from-[#38bdf8] to-[#2563eb] flex items-center justify-center shadow-[0_0_30px_rgba(56,189,248,0.4)]">
          <Disc className="w-8 h-8 text-white" />
        </div>

        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-white">404</h1>
          <h2 className="text-xl font-semibold text-slate-300">Page Not Found</h2>
          <p className="text-slate-400">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <Link href="/">
          <Button className="bg-gradient-to-r from-[#38bdf8] to-[#2563eb] hover:from-[#38bdf8]/90 hover:to-[#2563eb]/90 text-white">
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
