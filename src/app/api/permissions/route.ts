import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const permissions = await prisma.permission.findMany();
    return NextResponse.json(permissions);
  } catch (error) {
    console.error('Failed to fetch permissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch permissions' },
      { status: 500 }
    );
  }
} 