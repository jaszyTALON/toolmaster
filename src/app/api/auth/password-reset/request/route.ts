import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    // Always return success to prevent email enumeration
    if (!user) {
      return NextResponse.json({
        message: 'If an account exists with this email, you will receive a password reset link.',
      });
    }

    // Invalidate any existing tokens for this email
    await prisma.passwordResetToken.updateMany({
      where: { email: email.toLowerCase(), used: false },
      data: { used: true, usedAt: new Date() },
    });

    // Generate secure token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Store token
    await prisma.passwordResetToken.create({
      data: {
        email: email.toLowerCase(),
        token,
        expiresAt,
        userId: user.id,
      },
    });

    // For development - log the reset URL
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || 'http://localhost:3000'}/reset-password?token=${token}`;
    console.log('Password reset link:', resetUrl);

    return NextResponse.json({
      message: 'If an account exists with this email, you will receive a password reset link.',
    });
  } catch (error) {
    console.error('Password reset request error:', error);
    return NextResponse.json(
      { error: 'Failed to process password reset request' },
      { status: 500 }
    );
  }
}
