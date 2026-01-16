'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Disc, Eye, EyeOff, Info } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email: email.toLowerCase(),
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success('Welcome back!');
        router.push('/dashboard');
        router.refresh();
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    try {
      const result = await signIn('credentials', {
        email: 'demo@example.com',
        password: 'demo1234',
        redirect: false,
      });

      if (result?.error) {
        toast.error('Demo account not available. Please register a new account.');
      } else {
        toast.success('Welcome to the demo!');
        router.push('/dashboard');
        router.refresh();
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#0f172a]/80 border-white/10 backdrop-blur-xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto h-12 w-12 rounded-lg bg-gradient-to-br from-[#38bdf8] to-[#2563eb] flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.4)]">
            <Disc className="w-7 h-7 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl text-white">Welcome Back</CardTitle>
            <CardDescription className="text-slate-400">
              Sign in to your ToolMaster account
            </CardDescription>
          </div>
        </CardHeader>

        {/* Demo Account Banner */}
        <div className="mx-6 mb-4 p-3 rounded-lg bg-[#38bdf8]/10 border border-[#38bdf8]/30 flex items-start gap-3">
          <Info className="w-5 h-5 text-[#38bdf8] mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="text-[#38bdf8] font-medium">Demo Account Available</p>
            <p className="text-slate-400 mt-1">
              Email: <span className="text-white font-mono">demo@example.com</span>
            </p>
            <p className="text-slate-400">
              Password: <span className="text-white font-mono">demo1234</span>
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="bg-[#1e293b] border-white/10 text-white placeholder:text-slate-500 focus:border-[#38bdf8] focus:ring-[#38bdf8]/20"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-slate-300">Password</Label>
                <Link href="/forgot-password" className="text-sm text-[#38bdf8] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="bg-[#1e293b] border-white/10 text-white placeholder:text-slate-500 focus:border-[#38bdf8] focus:ring-[#38bdf8]/20 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-slate-400 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#38bdf8] to-[#2563eb] hover:from-[#38bdf8]/90 hover:to-[#2563eb]/90 text-white font-medium shadow-[0_4px_14px_rgba(56,189,248,0.4)]"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full border-[#f59e0b]/30 text-[#f59e0b] hover:bg-[#f59e0b]/10 hover:text-[#f59e0b]"
              onClick={handleDemoLogin}
              disabled={isLoading}
            >
              Try Demo Account
            </Button>
            <p className="text-center text-sm text-slate-400">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-[#38bdf8] hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
