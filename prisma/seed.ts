import { PrismaClient, ToolStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create demo user
  const hashedPassword = await bcrypt.hash('demo1234', 10);

  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      password: hashedPassword,
      name: 'Demo User',
    },
  });

  console.log('Created demo user:', demoUser.email);

  // Create magazine settings for demo user
  await prisma.magazineSettings.upsert({
    where: { userId: demoUser.id },
    update: {},
    create: {
      userId: demoUser.id,
      currentInSlot: 12,  // Tool 12 at IN (12 o'clock)
      currentOutSlot: 4,  // Tool 4 at OUT position
    },
  });

  console.log('Created magazine settings');

  // Define sample tools for the 12-position magazine
  const sampleTools = [
    {
      slotNumber: 1,
      toolNumber: 1,
      name: 'Carbide Drill 5mm',
      type: 'Drill',
      status: 'READY' as ToolStatus,
      lifePercent: 85,
    },
    {
      slotNumber: 2,
      toolNumber: 2,
      name: 'Face Mill 50mm',
      type: 'Mill',
      status: 'READY' as ToolStatus,
      lifePercent: 92,
    },
    {
      slotNumber: 3,
      toolNumber: 3,
      name: 'Tap M6',
      type: 'Tap',
      status: 'WARNING' as ToolStatus,
      lifePercent: 12,
    },
    {
      slotNumber: 4,
      toolNumber: 4,
      name: 'Reamer 10mm',
      type: 'Reamer',
      status: 'ACTIVE' as ToolStatus,
      lifePercent: 100,
    },
    {
      slotNumber: 5,
      toolNumber: 5,
      name: '-- EMPTY --',
      type: '--',
      status: 'EMPTY' as ToolStatus,
      lifePercent: 0,
    },
    {
      slotNumber: 6,
      toolNumber: 6,
      name: 'End Mill 8mm',
      type: 'Mill',
      status: 'READY' as ToolStatus,
      lifePercent: 78,
    },
    {
      slotNumber: 7,
      toolNumber: 7,
      name: 'Center Drill',
      type: 'Drill',
      status: 'READY' as ToolStatus,
      lifePercent: 95,
    },
    {
      slotNumber: 8,
      toolNumber: 8,
      name: 'Ball End Mill 6mm',
      type: 'Mill',
      status: 'READY' as ToolStatus,
      lifePercent: 68,
    },
    {
      slotNumber: 9,
      toolNumber: 9,
      name: 'Boring Bar 20mm',
      type: 'Bore',
      status: 'MAINTENANCE' as ToolStatus,
      lifePercent: 5,
    },
    {
      slotNumber: 10,
      toolNumber: 10,
      name: 'Chamfer Mill 45°',
      type: 'Mill',
      status: 'READY' as ToolStatus,
      lifePercent: 88,
    },
    {
      slotNumber: 11,
      toolNumber: 11,
      name: 'Spot Drill 90°',
      type: 'Drill',
      status: 'READY' as ToolStatus,
      lifePercent: 72,
    },
    {
      slotNumber: 12,
      toolNumber: 12,
      name: 'Carbide Drill 8mm',
      type: 'Drill',
      status: 'ACTIVE' as ToolStatus,
      lifePercent: 60,
    },
  ];

  // Delete existing tools for demo user and recreate
  await prisma.tool.deleteMany({
    where: { userId: demoUser.id },
  });

  // Create tools
  for (const tool of sampleTools) {
    await prisma.tool.create({
      data: {
        ...tool,
        userId: demoUser.id,
      },
    });
  }

  console.log('Created 12 sample tools');

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
