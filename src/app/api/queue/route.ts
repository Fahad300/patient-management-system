import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const queue = await prisma.queue.findMany({
      include: {
        patient: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        appointment: {
          select: {
            type: true,
            timeSlot: {
              select: {
                startTime: true,
              },
            },
          },
        },
      },
      orderBy: [
        { priority: 'desc' },
        { checkInTime: 'asc' },
      ],
    });

    return NextResponse.json(queue);
  } catch (error) {
    console.error('Failed to fetch queue:', error);
    return NextResponse.json(
      { error: 'Failed to fetch queue' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const queue = await prisma.queue.create({
      data: {
        patientId: data.patientId,
        appointmentId: data.appointmentId,
        priority: data.priority || 0,
        notes: data.notes,
      },
      include: {
        patient: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        appointment: {
          select: {
            type: true,
            timeSlot: true,
          },
        },
      },
    });

    return NextResponse.json(queue);
  } catch (error) {
    console.error('Failed to create queue entry:', error);
    return NextResponse.json(
      { error: 'Failed to create queue entry' },
      { status: 500 }
    );
  }
} 