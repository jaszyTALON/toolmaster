'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Mail, ArrowLeft, CheckCircle, Disc } from 'lucide-react';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/password-reset/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to send reset email');
      }

      setEmailSent(true);
    } catch (error) {
      toast.error('Failed to send password reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md bg-[#0f172a]/80 border-white/10 backdrop-blur-xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 rounded-full bg-[#10b981]/20 w-fit">
              <CheckCircle className="h-8 w-8 text-[#10b981]" />
            </div>
            <CardTitle className="text-2xl text-white">Check your email</CardTitle>
            <CardDescription className="text-slate-400">
              We sent a password reset link to <strong className="text-white">{email}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center text-sm text-slate-400">
            <p>If an account exists with this email, you&apos;ll receive a link to reset your password.</p>
            <p className="mt-2">The link will expire in 1 hour.</p>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button
              variant="outline"
              className="w-full border-white/10 text-slate-300 hover:bg-white/5"
              onClick={() => {
                setEmail('');
                setEmailSent(false);
              }}
            >
              <Mail className="mr-2 h-4 w-4" />
              Try a different email
            </Button>
            <Link href="/login" className="w-full">
              <Button variant="ghost" className="w-full text-slate-400 hover:text-white hover:bg-white/5">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Sign In
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#0f172a]/80 border-white/10 backdrop-blur-xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto h-12 w-12 rounded-lg bg-gradient-to-br from-[#38bdf8] to-[#2563eb] flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.4)]">
            <Disc className="w-7 h-7 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl text-white">Forgot your password?</CardTitle>
            <CardDescription className="text-slate-400">
              Enter your email address and we&apos;ll send you a link to reset your password.
            </CardDescription>
          </div>
        </CardHeader>

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
                autoFocus
                className="bg-[#1e293b] border-white/10 text-white placeholder:text-slate-500 focus:border-[#38bdf8] focus:ring-[#38bdf8]/20"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#38bdf8] to-[#2563eb] hover:from-[#38bdf8]/90 hover:to-[#2563eb]/90 text-white font-medium shadow-[0_4px_14px_rgba(56,189,248,0.4)]"
              disabled={isLoading || !email}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending reset link...
                </>
              ) : (
                'Send reset link'
              )}
            </Button>
            <Link href="/login" className="w-full">
              <Button type="button" variant="ghost" className="w-full text-slate-400 hover:text-white hover:bg-white/5">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Sign In
              </Button>
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
