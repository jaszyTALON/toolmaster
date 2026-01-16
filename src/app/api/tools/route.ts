import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET - Fetch all tools for the current user
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const tools = await prisma.tool.findMany({
      where: { userId: session.user.id },
      orderBy: { slotNumber: 'asc' },
    });

    return NextResponse.json(tools);
  } catch (error) {
    console.error('Error fetching tools:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tools' },
      { status: 500 }
    );
  }
}

// PUT - Update a tool
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, toolNumber, name, type, description, status, lifePercent } = body;

    if (!id) {
      return NextResponse.json({ error: 'Tool ID is required' }, { status: 400 });
    }

    // Verify ownership
    const existingTool = await prisma.tool.findFirst({
      where: { id, userId: session.user.id },
    });

    if (!existingTool) {
      return NextResponse.json({ error: 'Tool not found' }, { status: 404 });
    }

    const updatedTool = await prisma.tool.update({
      where: { id },
      data: {
        toolNumber: toolNumber ?? existingTool.toolNumber,
        name: name ?? existingTool.name,
        type: type ?? existingTool.type,
        description: description ?? existingTool.description,
        status: status ?? existingTool.status,
        lifePercent: lifePercent ?? existingTool.lifePercent,
      },
    });

    return NextResponse.json(updatedTool);
  } catch (error) {
    console.error('Error updating tool:', error);
    return NextResponse.json(
      { error: 'Failed to update tool' },
      { status: 500 }
    );
  }
}
