import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const roles = await prisma.role.findMany({
      include: {
        permissions: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
    });
    return NextResponse.json(roles);
  } catch (error) {
    console.error('Failed to fetch roles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch roles' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const role = await prisma.role.create({
      data: {
        name: data.name,
        description: data.description,
        permissions: {
          connect: data.permissions.map((id: string) => ({ id })),
        },
      },
      include: {
        permissions: true,
      },
    });
    return NextResponse.json(role);
  } catch (error) {
    console.error('Failed to create role:', error);
    return NextResponse.json(
      { error: 'Failed to create role' },
      { status: 500 }
    );
  }
} 