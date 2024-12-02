const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
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
        id: 'pat_001',
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: new Date('1985-03-15'),
        gender: 'male',
        email: 'john.doe@example.com',
        phone: '555-0101',
        bloodGroup: 'O+',
        notes: 'Regular check-up patient',
        address: {
          create: {
            street: '123 Main St',
            city: 'Springfield',
            state: 'IL',
            zipCode: '62701',
          },
        },
        medicalHistory: {
          create: [
            {
              condition: 'Hypertension',
              diagnosis: 'Stage 1',
              year: '2020',
            },
            {
              condition: 'Diabetes',
              diagnosis: 'Type 2',
              year: '2019',
            },
          ],
        },
        allergies: {
          create: [
            { name: 'Penicillin' },
            { name: 'Peanuts' },
          ],
        },
        emergencyContacts: {
          create: [
            {
              name: 'Jane Doe',
              relationship: 'Spouse',
              phone: '555-0201',
            },
          ],
        },
      },
    });

    const patient2 = await prisma.patient.create({
      data: {
        id: 'pat_002',
        firstName: 'Sarah',
        lastName: 'Johnson',
        dateOfBirth: new Date('1990-07-22'),
        gender: 'female',
        email: 'sarah.j@example.com',
        phone: '555-0102',
        bloodGroup: 'A+',
        notes: 'Pregnancy follow-up',
        address: {
          create: {
            street: '456 Oak Ave',
            city: 'Springfield',
            state: 'IL',
            zipCode: '62702',
          },
        },
        medicalHistory: {
          create: [
            {
              condition: 'Asthma',
              diagnosis: 'Mild persistent',
              year: '2018',
            },
          ],
        },
        allergies: {
          create: [
            { name: 'Dust' },
            { name: 'Pollen' },
          ],
        },
        emergencyContacts: {
          create: [
            {
              name: 'Mike Johnson',
              relationship: 'Brother',
              phone: '555-0202',
            },
          ],
        },
      },
    });

    // Create appointments for today and upcoming days
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    const appointments = [
      {
        patient: { connect: { id: patient1.id } },
        timeSlot: {
          create: {
            startTime: new Date(today.setHours(9, 0, 0, 0)),
            endTime: new Date(today.setHours(10, 0, 0, 0)),
            doctorId: 'default',
            isBooked: true,
          }
        },
        type: 'CONSULTATION',
        status: 'PENDING',
        notes: 'Initial consultation',
      },
      {
        patient: { connect: { id: patient2.id } },
        timeSlot: {
          create: {
            startTime: new Date(tomorrow.setHours(10, 0, 0, 0)),
            endTime: new Date(tomorrow.setHours(11, 0, 0, 0)),
            doctorId: 'default',
            isBooked: true,
          }
        },
        type: 'FOLLOW_UP',
        status: 'CONFIRMED',
        notes: 'Follow-up appointment',
      },
      {
        patient: { connect: { id: patient1.id } },
        timeSlot: {
          create: {
            startTime: new Date(nextWeek.setHours(14, 0, 0, 0)),
            endTime: new Date(nextWeek.setHours(15, 0, 0, 0)),
            doctorId: 'default',
            isBooked: true,
          }
        },
        type: 'CHECKUP',
        status: 'PENDING',
        notes: 'Regular check-up',
      },
    ];

    for (const appointment of appointments) {
      await prisma.appointment.create({
        data: appointment,
      });
    }

    console.log('✅ Seed data created successfully');
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

module.exports = main;
