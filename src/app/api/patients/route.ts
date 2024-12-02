import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const patients = await prisma.patient.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        gender: true,
        email: true,
        phone: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    return NextResponse.json(patients);
  } catch (error) {
    console.error('Failed to fetch patients:', error);
    return NextResponse.json(
      { error: 'Failed to fetch patients' }, 
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const patient = await prisma.patient.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: new Date(data.dateOfBirth),
        gender: data.gender,
        email: data.email,
        phone: data.phone,
        bloodGroup: data.bloodGroup,
        notes: data.notes,
        address: {
          create: data.address,
        },
        medicalHistory: {
          create: data.medicalHistory,
        },
        allergies: {
          create: data.allergies.map((name: string) => ({ name })),
        },
        emergencyContacts: {
          create: data.emergencyContacts,
        },
      },
      include: {
        address: true,
        medicalHistory: true,
        allergies: true,
        emergencyContacts: true,
      },
    });
    return NextResponse.json(patient);
  } catch (error) {
    console.error('Create patient error:', error);
    return NextResponse.json({ error: 'Failed to create patient' }, { status: 500 });
  }
} 