import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const patient = await prisma.patient.findUnique({
      where: { id: params.id },
      include: {
        address: true,
        medicalHistory: true,
        allergies: true,
        emergencyContacts: true,
      },
    });
    
    if (!patient) {
      return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
    }
    
    return NextResponse.json(patient);
  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch patient' }, 
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    
    // Update the patient
    const updatedPatient = await prisma.patient.update({
      where: { id: params.id },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: new Date(data.dateOfBirth),
        gender: data.gender,
        email: data.email,
        phone: data.phone,
        bloodGroup: data.bloodGroup,
        notes: data.notes,
        // Update address if provided
        address: data.address ? {
          update: data.address,
        } : undefined,
      },
      include: {
        address: true,
        medicalHistory: true,
        allergies: true,
        emergencyContacts: true,
      },
    });

    return NextResponse.json(updatedPatient);
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json(
      { error: 'Failed to update patient' }, 
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.patient.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete patient' }, 
      { status: 500 }
    );
  }
} 