import { verifyMercadoPagoWebhook } from "@repo/payments";

/**
 * Mercado Pago webhook handler
 * Verifies payment completion and updates donation status
 */
export async function POST(req: Request) {
  try {
    const { topic, id: resourceId } = await req.json();

    if (topic === "payment") {
      // Verify payment with Mercado Pago
      const payment = await verifyMercadoPagoWebhook(topic, resourceId);

      if (payment && payment.body?.status === "approved") {
        // Update donation status in database
        console.log("Payment approved:", resourceId);

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
    console.error("Mercado Pago webhook error:", error);
    return new Response("Webhook error", { status: 400 });
  }
}
