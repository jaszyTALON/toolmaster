import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { valid: false, message: 'Token is required' },
        { status: 400 }
      );
    }

    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    if (!resetToken) {
      return NextResponse.json({
        valid: false,
        message: 'Invalid or expired reset link. Please request a new one.',
      });
    }

    if (resetToken.used) {
      return NextResponse.json({
        valid: false,
        message: 'This reset link has already been used. Please request a new one.',
      });
    }

    if (new Date() > resetToken.expiresAt) {
      return NextResponse.json({
        valid: false,
        message: 'This reset link has expired. Please request a new one.',
      });
    }

    return NextResponse.json({
      valid: true,
      email: resetToken.email,
    });
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { valid: false, message: 'Failed to verify token' },
      { status: 500 }
    );
  }
}
