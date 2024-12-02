import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { patients } = await request.json();

    const results = await Promise.all(
      patients.map(async (patient: any) => {
        try {
          return await prisma.patient.create({
            data: {
              firstName: patient.firstName,
              lastName: patient.lastName,
              dateOfBirth: new Date(patient.dateOfBirth),
              gender: patient.gender,
              email: patient.email,
              phone: patient.phone,
              bloodGroup: patient.bloodGroup || null,
              notes: patient.notes || null,
              address: patient.address ? {
                create: patient.address
              } : undefined,
              medicalHistory: patient.medicalHistory ? {
                create: patient.medicalHistory
              } : undefined,
              allergies: patient.allergies ? {
                create: patient.allergies.map((name: string) => ({ name }))
              } : undefined,
              emergencyContacts: patient.emergencyContacts ? {
                create: patient.emergencyContacts
              } : undefined,
            },
          });
        } catch (error) {
          console.error(`Failed to import patient: ${patient.email}`, error);
          return null;
        }
      })
    );

    const successful = results.filter(r => r !== null).length;
    const failed = results.length - successful;

    return NextResponse.json({
      message: `Successfully imported ${successful} patients${failed > 0 ? `, ${failed} failed` : ''}`,
      successful,
      failed
    });
  } catch (error) {
    console.error('Import error:', error);
    return NextResponse.json(
      { error: 'Failed to import patients' },
      { status: 500 }
    );
  }
} 