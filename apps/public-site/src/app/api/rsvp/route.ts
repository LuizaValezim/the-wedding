import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@repo/database';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { name, email, rsvpStatus, plusOneCount, dietary, rsvpToken } = await request.json();

    if (!rsvpToken) {
      return NextResponse.json(
        { message: 'RSVP token is required' },
        { status: 400 }
      );
    }

    // Find guest by RSVP token
    const guest = await prisma.guest.findUnique({
      where: { rsvpToken },
    });

    if (!guest) {
      return NextResponse.json(
        { message: 'Invalid RSVP token' },
        { status: 404 }
      );
    }

    // Update guest RSVP
    const updatedGuest = await prisma.guest.update({
      where: { id: guest.id },
      data: {
        name,
        email: email || guest.email,
        rsvpStatus,
        plusOneCount: parseInt(plusOneCount || '0'),
        dietaryRestrictions: dietary,
      },
    });

    return NextResponse.json(
      {
        message: 'RSVP updated successfully',
        guest: updatedGuest,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('RSVP error:', error);
    return NextResponse.json(
      { message: 'Failed to process RSVP' },
      { status: 500 }
    );
  }
}
