import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(1, 'Name is required'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name } = registerSchema.parse(body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        name,
      },
    });

    // Create default magazine settings
    await prisma.magazineSettings.create({
      data: {
        userId: user.id,
        currentInSlot: 1,
        currentOutSlot: 4,
      },
    });

    // Create 12 empty tool slots
    const toolSlots = Array.from({ length: 12 }, (_, i) => ({
      slotNumber: i + 1,
      toolNumber: i + 1,
      name: '-- EMPTY --',
      type: '--',
      status: 'EMPTY' as const,
      lifePercent: 0,
      userId: user.id,
    }));

    await prisma.tool.createMany({
      data: toolSlots,
    });

    return NextResponse.json(
      { message: 'User registered successfully', userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues;
      return NextResponse.json(
        { error: issues[0]?.message || 'Validation error' },
        { status: 400 }
      );
    }

    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Failed to register user' },
      { status: 500 }
    );
  }
}
