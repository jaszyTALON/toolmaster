import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const toolSchema = z.object({
  slotNumber: z.number().min(1).max(12),
  toolNumber: z.number(),
  name: z.string(),
  type: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  status: z.enum(['READY', 'ACTIVE', 'WARNING', 'EMPTY', 'MAINTENANCE']),
  lifePercent: z.number().min(0).max(100),
});

const importSchema = z.object({
  version: z.string(),
  magazineSettings: z.object({
    currentInSlot: z.number().min(1).max(12),
    currentOutSlot: z.number().min(1).max(12),
  }).optional(),
  tools: z.array(toolSchema),
});

// POST - Import tools configuration
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const data = importSchema.parse(body);

    // Validate we have exactly 12 tools
    if (data.tools.length !== 12) {
      return NextResponse.json(
        { error: 'Import must contain exactly 12 tool slots' },
        { status: 400 }
      );
    }

    // Check for duplicate slot numbers
    const slotNumbers = data.tools.map((t) => t.slotNumber);
    const uniqueSlots = new Set(slotNumbers);
    if (uniqueSlots.size !== 12) {
      return NextResponse.json(
        { error: 'Import must contain unique slot numbers 1-12' },
        { status: 400 }
      );
    }

    // Update all tools in a transaction
    await prisma.$transaction(async (tx) => {
      for (const tool of data.tools) {
        await tx.tool.upsert({
          where: {
            userId_slotNumber: {
              userId: session.user.id,
              slotNumber: tool.slotNumber,
            },
          },
          update: {
            toolNumber: tool.toolNumber,
            name: tool.name,
            type: tool.type || null,
            description: tool.description || null,
            status: tool.status,
            lifePercent: tool.lifePercent,
          },
          create: {
            userId: session.user.id,
            slotNumber: tool.slotNumber,
            toolNumber: tool.toolNumber,
            name: tool.name,
            type: tool.type || null,
            description: tool.description || null,
            status: tool.status,
            lifePercent: tool.lifePercent,
          },
        });
      }

      // Update magazine settings if provided
      if (data.magazineSettings) {
        await tx.magazineSettings.upsert({
          where: { userId: session.user.id },
          update: {
            currentInSlot: data.magazineSettings.currentInSlot,
            currentOutSlot: data.magazineSettings.currentOutSlot,
          },
          create: {
            userId: session.user.id,
            currentInSlot: data.magazineSettings.currentInSlot,
            currentOutSlot: data.magazineSettings.currentOutSlot,
          },
        });
      }
    });

    return NextResponse.json({ message: 'Import successful' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid import format', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Error importing tools:', error);
    return NextResponse.json(
      { error: 'Failed to import tools' },
      { status: 500 }
    );
  }
}
