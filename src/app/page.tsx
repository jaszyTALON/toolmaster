'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Disc, ArrowRight, Cog, RotateCw, Gauge, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session, router]);

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

  return (
    <div className="min-h-screen w-full bg-[#020617] text-slate-50 overflow-hidden relative">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-br from-[#38bdf8]/15 via-transparent to-transparent blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-gradient-to-tl from-[#f59e0b]/12 via-transparent to-transparent blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full bg-[#94a3b8]/3 blur-[150px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#38bdf8] to-[#2563eb] flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.4)]">
                <Disc className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight">ToolMaster</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" className="text-slate-400 hover:text-white hover:bg-white/5">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-[#38bdf8] to-[#2563eb] hover:from-[#38bdf8]/90 hover:to-[#2563eb]/90 text-white shadow-[0_4px_14px_rgba(56,189,248,0.4)]">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/30 text-[#38bdf8] text-sm font-medium">
              <Cog className="w-4 h-4" />
              12-Position Rotary Tool Changer
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Precision Tool Magazine{' '}
              <span className="bg-gradient-to-r from-[#38bdf8] to-[#22d3ee] bg-clip-text text-transparent">
                Management
              </span>
            </h1>

            <p className="text-xl text-slate-400 leading-relaxed max-w-xl">
              Visualize, configure, and control your CNC tool magazine with smooth animations and industrial-grade interface. Know exactly which tool is where at any moment.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/register">
                <Button size="lg" className="bg-gradient-to-r from-[#38bdf8] to-[#2563eb] hover:from-[#38bdf8]/90 hover:to-[#2563eb]/90 text-white font-medium shadow-[0_4px_20px_rgba(56,189,248,0.4)] px-8">
                  Start Managing Tools
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="border-white/10 text-slate-300 hover:bg-white/5 hover:text-white">
                  Try Demo
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Animated Wheel Preview */}
          <div className="relative flex items-center justify-center">
            <motion.div
              className="relative w-80 h-80 lg:w-96 lg:h-96"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            >
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-2 border-[#334155] bg-[#0f172a]/50" />

              {/* Tool slots */}
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i * 30 - 90) * (Math.PI / 180);
                const radius = 140;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                const isIn = i === 0;
                const isOut = i === 4;

                return (
                  <motion.div
                    key={i}
                    className={`absolute w-12 h-12 rounded-full flex items-center justify-center font-mono font-bold text-sm border-2 transition-all
                      ${isIn ? 'bg-[#f59e0b]/20 border-[#f59e0b] text-[#f59e0b] shadow-[0_0_15px_rgba(245,158,11,0.5)]' :
                        isOut ? 'bg-[#22d3ee]/20 border-[#22d3ee] text-[#22d3ee] shadow-[0_0_15px_rgba(34,211,238,0.5)]' :
                        'bg-[#1e293b]/80 border-[#334155] text-slate-400'}`}
                    style={{
                      left: `calc(50% + ${x}px - 24px)`,
                      top: `calc(50% + ${y}px - 24px)`,
                    }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                  >
                    {i + 1}
                  </motion.div>
                );
              })}

              {/* Center hub */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-[#1e293b] to-[#020617] border border-[#334155] shadow-[0_0_30px_rgba(0,0,0,0.5)] flex items-center justify-center">
                <div className="text-center">
                  <div className="text-[#38bdf8] font-bold">MAG</div>
                  <div className="text-xs text-slate-500">12-POS</div>
                </div>
              </div>
            </motion.div>

            {/* IN indicator */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 flex flex-col items-center gap-1">
              <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-[#f59e0b] drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
              <span className="text-[#f59e0b] text-xs font-bold">IN</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 border-t border-white/5 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Industrial-Grade Features</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Everything you need to manage your tool magazine with precision and efficiency.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: RotateCw,
                title: 'Smooth Rotation',
                description: 'Visualize tool magazine rotation with fluid animations. Rotate clockwise or counter-clockwise with a single click.',
                color: '#38bdf8',
              },
              {
                icon: Gauge,
                title: 'Position Tracking',
                description: 'Always know which tool is at IN (12 o\'clock) and OUT positions. Calculate any clock position instantly.',
                color: '#f59e0b',
              },
              {
                icon: Cog,
                title: 'Tool Configuration',
                description: 'Assign tools to slots, track tool life, set statuses. Export and import your configuration.',
                color: '#22d3ee',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#0f172a]/60 border border-white/5 hover:border-white/10 transition-all group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 border-t border-white/5 py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Master Your Tool Magazine?</h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            Get started for free and experience precision tool management with an interface designed for industrial applications.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="bg-gradient-to-r from-[#38bdf8] to-[#2563eb] hover:from-[#38bdf8]/90 hover:to-[#2563eb]/90 text-white font-medium shadow-[0_4px_20px_rgba(56,189,248,0.4)] px-8">
                Create Free Account
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="border-[#f59e0b]/30 text-[#f59e0b] hover:bg-[#f59e0b]/10">
                Try Demo Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-gradient-to-br from-[#38bdf8] to-[#2563eb] flex items-center justify-center">
                <Disc className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold">ToolMaster</span>
            </div>
            <p className="text-sm text-slate-500">
              &copy; {new Date().getFullYear()} ToolMaster. Built for precision manufacturing.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
