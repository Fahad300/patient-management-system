import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const appointment = await prisma.appointment.findUnique({
      where: { id: params.id },
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

    if (!appointment) {
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(appointment);
  } catch (error) {
    console.error('Failed to fetch appointment:', error);
    return NextResponse.json(
      { error: 'Failed to fetch appointment' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    
    const appointment = await prisma.appointment.update({
      where: { id: params.id },
      data: {
        status: data.status,
        notes: data.notes,
        type: data.type,
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
    console.error('Failed to update appointment:', error);
    return NextResponse.json(
      { error: 'Failed to update appointment' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // First, get the appointment to find the timeSlot
    const appointment = await prisma.appointment.findUnique({
      where: { id: params.id },
      select: { timeSlotId: true },
    });

    if (!appointment) {
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 }
      );
    }

    // Delete the appointment
    await prisma.appointment.delete({
      where: { id: params.id },
    });

    // Delete the associated time slot
    await prisma.timeSlot.delete({
      where: { id: appointment.timeSlotId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete appointment:', error);
    return NextResponse.json(
      { error: 'Failed to delete appointment' },
      { status: 500 }
    );
  }
} 