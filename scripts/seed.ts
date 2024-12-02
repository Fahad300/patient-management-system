import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seed() {
  try {
    // Clear existing data
    await prisma.appointment.deleteMany();
    await prisma.timeSlot.deleteMany();
    await prisma.emergencyContact.deleteMany();
    await prisma.allergy.deleteMany();
    await prisma.medicalHistory.deleteMany();
    await prisma.address.deleteMany();
    await prisma.patient.deleteMany();

    // Create patients with all related data
    const patient1 = await prisma.patient.create({
      data: {
        // ... patient1 data
      }
    });

    const patient2 = await prisma.patient.create({
      data: {
        // ... patient2 data
      }
    });

    // Create appointments
    const appointments = [
      // ... appointment data
    ];

    for (const appointment of appointments) {
      await prisma.appointment.create({ data: appointment });
    }

    console.log('✅ Database has been seeded');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed(); 