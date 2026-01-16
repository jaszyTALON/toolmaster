import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET - Fetch magazine settings
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let settings = await prisma.magazineSettings.findUnique({
      where: { userId: session.user.id },
    });

    // Create default settings if they don't exist
    if (!settings) {
      settings = await prisma.magazineSettings.create({
        data: {
          userId: session.user.id,
          currentInSlot: 1,
          currentOutSlot: 4,
        },
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching magazine settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch magazine settings' },
      { status: 500 }
    );
  }
}

// PUT - Update magazine settings (rotate)
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { currentInSlot, currentOutSlot } = body;

    if (!currentInSlot || !currentOutSlot) {
      return NextResponse.json(
        { error: 'currentInSlot and currentOutSlot are required' },
        { status: 400 }
      );
    }

    const settings = await prisma.magazineSettings.upsert({
      where: { userId: session.user.id },
      update: {
        currentInSlot,
        currentOutSlot,
      },
      create: {
        userId: session.user.id,
        currentInSlot,
        currentOutSlot,
      },
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error updating magazine settings:', error);
    return NextResponse.json(
      { error: 'Failed to update magazine settings' },
      { status: 500 }
    );
  }
}
