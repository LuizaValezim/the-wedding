import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
});

/**
 * Create a Stripe checkout session for donation
 */
export async function createStripeCheckoutSession(params: {
  fundItemId: string;
  amount: number;
  guestEmail?: string;
  metadata?: Record<string, string>;
}) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Honeymoon Contribution",
              description: params.metadata?.itemName || "Support our honeymoon",
            },
            unit_amount: Math.round(params.amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/donation/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/honeymoon`,
      customer_email: params.guestEmail,
      metadata: {
        fundItemId: params.fundItemId,
        ...params.metadata,
      },
    });

    return { sessionId: session.id, sessionUrl: session.url };
  } catch (error) {
    console.error("Stripe checkout error:", error);
    throw error;
  }
}

/**
 * Retrieve a Stripe checkout session
 */
export async function getStripeCheckoutSession(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent"],
    });
    return session;
  } catch (error) {
    console.error("Stripe retrieve session error:", error);
    throw error;
  }
}

/**
 * Verify Stripe webhook signature
 */
export function verifyStripeWebhookSignature(
  body: string,
  signature: string,
  secret: string
) {
  try {
    return stripe.webhooks.constructEvent(body, signature, secret);
  } catch (error) {
    console.error("Stripe webhook verification error:", error);
    throw error;
  }
}

/**
 * Get payment intent details
 */
export async function getPaymentIntent(paymentIntentId: string) {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    return paymentIntent;
  } catch (error) {
    console.error("Stripe payment intent error:", error);
    throw error;
  }
}
