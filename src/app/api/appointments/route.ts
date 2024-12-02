import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        patient: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        timeSlot: {
          select: {
            startTime: true,
            endTime: true,
          },
        },
      },
      orderBy: {
        timeSlot: {
          startTime: 'asc',
        },
      },
    });

    return NextResponse.json(appointments);
  } catch (error) {
    console.error('Failed to fetch appointments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Create time slot first
    const timeSlot = await prisma.timeSlot.create({
      data: {
        startTime: new Date(`${data.date} ${data.startTime}`),
        endTime: new Date(`${data.date} ${data.endTime}`),
        doctorId: 'default', // We'll update this when we add doctors
        isBooked: true,
      },
    });

    // Create appointment with the time slot
    const appointment = await prisma.appointment.create({
      data: {
        patientId: data.patientId,
        timeSlotId: timeSlot.id,
        type: data.type,
        notes: data.notes,
      },
      include: {
        patient: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        timeSlot: true,
      },
    });

    return NextResponse.json(appointment);
  } catch (error) {
    console.error('Failed to create appointment:', error);
    return NextResponse.json(
      { error: 'Failed to create appointment' },
      { status: 500 }
    );
  }
} 