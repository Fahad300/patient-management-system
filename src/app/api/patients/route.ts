import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const patients = await prisma.patient.findMany({
      include: {
        address: true,
        medicalHistory: true,
        allergies: true,
        emergencyContacts: true,
      },
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
        ...data,
        address: {
          create: data.address,
        },
        medicalHistory: {
          create: data.medicalHistory,
        },
        allergies: {
          create: data.allergies,
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
    console.error('Failed to create patient:', error);
    return NextResponse.json(
      { error: 'Failed to create patient' },
      { status: 500 }
    );
  }
} 