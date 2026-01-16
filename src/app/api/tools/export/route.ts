import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET - Export tools configuration as JSON
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const tools = await prisma.tool.findMany({
      where: { userId: session.user.id },
      orderBy: { slotNumber: 'asc' },
      select: {
        slotNumber: true,
        toolNumber: true,
        name: true,
        type: true,
        description: true,
        status: true,
        lifePercent: true,
      },
    });

    const settings = await prisma.magazineSettings.findUnique({
      where: { userId: session.user.id },
    });

    const exportData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      magazineSettings: settings
        ? { currentInSlot: settings.currentInSlot, currentOutSlot: settings.currentOutSlot }
        : { currentInSlot: 1, currentOutSlot: 4 },
      tools,
    };

    return new NextResponse(JSON.stringify(exportData, null, 2), {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="toolmaster-config-${new Date().toISOString().split('T')[0]}.json"`,
      },
    });
  } catch (error) {
    console.error('Error exporting tools:', error);
    return NextResponse.json(
      { error: 'Failed to export tools' },
      { status: 500 }
    );
  }
}
