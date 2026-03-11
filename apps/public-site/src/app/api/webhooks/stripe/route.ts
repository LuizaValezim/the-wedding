import { createAdminClient } from "@repo/auth/server";
import { verifyStripeWebhookSignature } from "@repo/payments";
import { Donation } from "@repo/types";

const prisma = require("@repo/database").PrismaClient;

/**
 * Stripe webhook handler
 * Verifies payment completion and updates donation status
 * Sends confirmation emails
 */
export async function POST(req: Request) {
  try {
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      return new Response("Missing signature", { status: 400 });
    }

    const body = await req.text();
    const secret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!secret) {
      console.error("Missing STRIPE_WEBHOOK_SECRET");
      return new Response("Configuration error", { status: 500 });
    }

    // Verify webhook signature
    const event = verifyStripeWebhookSignature(body, signature, secret);

    // Handle checkout session completed
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Update donation status in database
      if (session.metadata?.fundItemId) {
        // This is a placeholder - you'll need to implement database updates
        console.log(
          "Payment completed for fund item:",
          session.metadata.fundItemId
        );

        // TODO: Update donation status in Prisma
        // TODO: Send confirmation email via Resend
        // TODO: Update fund item progress
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.error("Stripe webhook error:", error);
    return new Response("Webhook error", { status: 400 });
  }
}
