'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { Disc, Home, Settings, LogOut, HelpCircle, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen w-full bg-[#020617] flex items-center justify-center">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 bg-[#38bdf8] rounded-full opacity-20 animate-ping" />
          <div className="absolute inset-2 bg-[#38bdf8] rounded-full opacity-40 animate-pulse" />
          <div className="absolute inset-0 border-4 border-t-[#38bdf8] border-r-transparent border-b-[#f59e0b] border-l-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen w-full bg-[#020617] text-slate-50 overflow-hidden relative selection:bg-[#38bdf8]/30">
      {/* Atmospheric Backgrounds */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-br from-[#38bdf8]/20 via-transparent to-transparent blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-gradient-to-tl from-[#f59e0b]/15 via-transparent to-transparent blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full bg-[#94a3b8]/5 blur-[150px]" />
      </div>

      <div className="relative z-10 flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 h-full flex-shrink-0 border-r border-white/10 bg-[#0f172a]/80 backdrop-blur-xl flex flex-col">
          <div className="h-16 flex items-center px-6 border-b border-white/10">
            <div className="h-8 w-8 rounded bg-gradient-to-br from-[#38bdf8] to-[#2563eb] flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.5)] mr-3">
              <Disc className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-wide">ToolMaster</span>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            <Link href="/dashboard">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 px-4 py-3 h-auto bg-[#38bdf8]/10 text-[#38bdf8] hover:bg-[#38bdf8]/20 hover:text-[#38bdf8] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] border border-[#38bdf8]/20"
              >
                <Home className="w-5 h-5 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
                <span className="font-medium">Magazine View</span>
              </Button>
            </Link>

            <Button
              variant="ghost"
              className="w-full justify-start gap-3 px-4 py-3 h-auto text-slate-400 hover:text-slate-100 hover:bg-white/5"
              data-tour="tour-button"
              onClick={() => {
                // Trigger tour - will be handled by tour component
                window.dispatchEvent(new CustomEvent('start-tour'));
              }}
            >
              <HelpCircle className="w-5 h-5" />
              <span className="font-medium">Start Tour</span>
            </Button>
          </nav>

          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 px-4 py-3 mb-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-slate-700 to-slate-600 border border-white/20 flex items-center justify-center">
                <User className="w-4 h-4 text-slate-300" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white truncate">
                  {session.user.name || 'User'}
                </div>
                <div className="text-xs text-slate-500 truncate">
                  {session.user.email}
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 px-4 py-3 h-auto text-slate-400 hover:text-red-400 hover:bg-red-400/5"
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Header */}
          <header className="h-16 flex items-center justify-between px-8 border-b border-white/10 bg-[#0f172a]/50 backdrop-blur-md sticky top-0 z-20">
            <div className="flex items-center text-slate-400 text-sm">
              <span className="hover:text-white cursor-pointer transition-colors">Machine 01</span>
              <span className="mx-2">/</span>
              <span className="text-white font-medium">Magazine Control</span>
            </div>

            <div className="text-xs text-slate-500">
              12-Position Rotary Tool Changer
            </div>
          </header>

          {/* Main */}
          <main className="flex-1 overflow-y-auto p-8 scrollbar-thin scrollbar-track-slate-900 scrollbar-thumb-slate-700">
            <div className="max-w-7xl mx-auto w-full">
              {children}
            </div>
          </main>

          {/* Footer */}
          <footer className="px-8 py-4 border-t border-white/5 flex justify-between text-xs text-slate-500">
            <div>System Version 2.4.0 • Connected to PLC-X9</div>
            <div>Latency: 12ms • Status: Operational</div>
          </footer>
        </div>
      </div>
    </div>
  );
}
