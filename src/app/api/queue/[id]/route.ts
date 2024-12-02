import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const queue = await prisma.queue.findUnique({
      where: { id: params.id },
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

    if (!queue) {
      return NextResponse.json(
        { error: 'Queue entry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(queue);
  } catch (error) {
    console.error('Failed to fetch queue entry:', error);
    return NextResponse.json(
      { error: 'Failed to fetch queue entry' },
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
    const now = new Date();
    
    // Add timestamps based on status change
    const additionalData: any = {};
    if (data.status === 'IN_CONSULTATION') {
      additionalData.startTime = now;
    } else if (data.status === 'COMPLETED') {
      additionalData.endTime = now;
    }

    const queue = await prisma.queue.update({
      where: { id: params.id },
      data: {
        ...data,
        ...additionalData,
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
    console.error('Failed to update queue entry:', error);
    return NextResponse.json(
      { error: 'Failed to update queue entry' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.queue.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete queue entry:', error);
    return NextResponse.json(
      { error: 'Failed to delete queue entry' },
      { status: 500 }
    );
  }
} 