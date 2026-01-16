'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle, XCircle, ArrowLeft, Eye, EyeOff, Disc } from 'lucide-react';
import { toast } from 'sonner';

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [pageState, setPageState] = useState<'loading' | 'valid' | 'invalid' | 'success'>('loading');
  const [email, setEmail] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Verify token on mount
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setPageState('invalid');
        setErrorMessage('No reset token provided. Please request a new password reset link.');
        return;
      }

      try {
        const response = await fetch(`/api/auth/password-reset/verify?token=${token}`);
        const data = await response.json();

        if (data.valid) {
          setPageState('valid');
          setEmail(data.email || null);
        } else {
          setPageState('invalid');
          setErrorMessage(data.message || 'Invalid reset link.');
        }
      } catch (error) {
        setPageState('invalid');
        setErrorMessage('Failed to verify reset link.');
      }
    };

    verifyToken();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/password-reset/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to reset password');
      }

      setPageState('success');
      toast.success('Password reset successfully!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state
  if (pageState === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md bg-[#0f172a]/80 border-white/10 backdrop-blur-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">Verifying reset link...</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-[#38bdf8]" />
          </CardContent>
        </Card>
      </div>
    );
  }

  // Invalid token state
  if (pageState === 'invalid') {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md bg-[#0f172a]/80 border-white/10 backdrop-blur-xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 rounded-full bg-[#ef4444]/20 w-fit">
              <XCircle className="h-8 w-8 text-[#ef4444]" />
            </div>
            <CardTitle className="text-2xl text-white">Invalid Reset Link</CardTitle>
            <CardDescription className="text-slate-400">{errorMessage}</CardDescription>
          </CardHeader>
          <CardFooter className="flex flex-col gap-4">
            <Link href="/forgot-password" className="w-full">
              <Button className="w-full bg-gradient-to-r from-[#38bdf8] to-[#2563eb] hover:from-[#38bdf8]/90 hover:to-[#2563eb]/90 text-white font-medium">
                Request a new reset link
              </Button>
            </Link>
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

  // Success state
  if (pageState === 'success') {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md bg-[#0f172a]/80 border-white/10 backdrop-blur-xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 rounded-full bg-[#10b981]/20 w-fit">
              <CheckCircle className="h-8 w-8 text-[#10b981]" />
            </div>
            <CardTitle className="text-2xl text-white">Password Reset Complete</CardTitle>
            <CardDescription className="text-slate-400">
              Your password has been reset successfully. You can now sign in with your new password.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href="/login" className="w-full">
              <Button className="w-full bg-gradient-to-r from-[#38bdf8] to-[#2563eb] hover:from-[#38bdf8]/90 hover:to-[#2563eb]/90 text-white font-medium">
                Sign in to your account
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Valid token - show reset form
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#0f172a]/80 border-white/10 backdrop-blur-xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto h-12 w-12 rounded-lg bg-gradient-to-br from-[#38bdf8] to-[#2563eb] flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.4)]">
            <Disc className="w-7 h-7 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl text-white">Reset your password</CardTitle>
            <CardDescription className="text-slate-400">
              {email ? (
                <>Enter a new password for <strong className="text-white">{email}</strong></>
              ) : (
                'Enter your new password below'
              )}
            </CardDescription>
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-slate-300">New Password</Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  minLength={8}
                  autoFocus
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
              <p className="text-xs text-slate-500">Must be at least 8 characters</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-slate-300">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  minLength={8}
                  className="bg-[#1e293b] border-white/10 text-white placeholder:text-slate-500 focus:border-[#38bdf8] focus:ring-[#38bdf8]/20 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-slate-400 hover:text-white"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#38bdf8] to-[#2563eb] hover:from-[#38bdf8]/90 hover:to-[#2563eb]/90 text-white font-medium shadow-[0_4px_14px_rgba(56,189,248,0.4)]"
              disabled={isLoading || !newPassword || !confirmPassword || newPassword !== confirmPassword}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resetting password...
                </>
              ) : (
                'Reset password'
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

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center p-4 bg-[#020617]">
          <Loader2 className="h-8 w-8 animate-spin text-[#38bdf8]" />
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
