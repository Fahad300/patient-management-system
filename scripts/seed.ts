const { PrismaClient, Prisma } = require('@prisma/client');
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
    await prisma.permission.deleteMany();
    await prisma.role.deleteMany();

    // Create patients with all related data
    const patient1 = await prisma.patient.create({
      data: {
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

    // Create appointments
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    /** @type {Prisma.AppointmentCreateInput[]} */
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
    ];

    for (const appointment of appointments) {
      await prisma.appointment.create({ data: appointment });
    }

    // Create permissions
    const defaultPermissions = [
      { name: 'view_dashboard', description: 'Can view dashboard' },
      { name: 'view_patients', description: 'Can view patient records' },
      { name: 'edit_patients', description: 'Can edit patient records' },
      { name: 'delete_patients', description: 'Can delete patient records' },
      { name: 'view_appointments', description: 'Can view appointments' },
      { name: 'manage_appointments', description: 'Can manage appointments' },
      { name: 'view_billing', description: 'Can view billing information' },
      { name: 'manage_billing', description: 'Can manage billing' },
      { name: 'view_analytics', description: 'Can view analytics' },
      { name: 'manage_roles', description: 'Can manage roles and permissions' },
      { name: 'manage_settings', description: 'Can manage system settings' },
    ];

    // Create permissions first
    const createdPermissions = await Promise.all(
      defaultPermissions.map(permission =>
        prisma.permission.upsert({
          where: { name: permission.name },
          update: {},
          create: permission,
        })
      )
    );

    // Then create the admin role with all permissions
    await prisma.role.upsert({
      where: { name: 'Admin' },
      update: {
        permissions: {
          connect: createdPermissions.map(p => ({ id: p.id })),
        },
      },
      create: {
        name: 'Admin',
        description: 'Full system access',
        permissions: {
          connect: createdPermissions.map(p => ({ id: p.id })),
        },
      },
    });

    console.log('✅ Database has been seeded');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed(); 