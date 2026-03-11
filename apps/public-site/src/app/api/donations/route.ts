import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@repo/database';
import { createStripeCheckoutSession, createMercadoPagoPreference } from '@repo/payments';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { fundItemId, amount, guestEmail, isAnonymous, message, paymentMethod } = await request.json();

    if (!fundItemId || !amount || !guestEmail) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get fund item
    const fundItem = await prisma.fundItem.findUnique({
      where: { id: fundItemId },
    });

    if (!fundItem) {
      return NextResponse.json(
        { message: 'Fund item not found' },
        { status: 404 }
      );
    }

    // Create donation record
    const donation = await prisma.donation.create({
      data: {
        fundItemId,
        guestEmail: isAnonymous ? `anonymous-${Date.now()}@wedding.gift` : guestEmail,
        amount: parseFloat(amount),
        isAnonymous,
        message,
        paymentProvider: paymentMethod,
        paymentStatus: 'pending',
      },
    });

    // Handle payment based on provider
    let checkoutUrl = null;

    if (paymentMethod === 'stripe') {
      const session = await createStripeCheckoutSession({
        amount: Math.round(parseFloat(amount) * 100),
        currency: 'usd',
        guestEmail,
        itemName: fundItem.name,
        donationId: donation.id,
      });
      checkoutUrl = session.url;
    } else if (paymentMethod === 'mercado-pago') {
      const preference = await createMercadoPagoPreference({
        amount: parseFloat(amount),
        currency: 'BRL',
        guestEmail,
        itemName: fundItem.name,
        donationId: donation.id,
      });
      checkoutUrl = preference.init_point;
    }

    return NextResponse.json(
      {
        message: 'Donation created successfully',
        donation,
        checkoutUrl,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Donation error:', error);
    return NextResponse.json(
      { message: 'Failed to process donation' },
      { status: 500 }
    );
  }
}
