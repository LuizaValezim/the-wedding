import mercadopago from "mercadopago";

// Configure Mercado Pago
mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN || "",
});

/**
 * Create a Mercado Pago preference (checkout)
 */
export async function createMercadoPagoPreference(params: {
  fundItemId: string;
  itemName: string;
  amount: number;
  guestEmail?: string;
  guestName?: string;
}) {
  try {
    const preference = await mercadopago.preferences.create({
      items: [
        {
          title: params.itemName || "Honeymoon Contribution",
          quantity: 1,
          unit_price: params.amount,
          currency_id: "BRL", // Brazilian Real - change as needed
        },
      ],
      payer: {
        email: params.guestEmail,
        name: params.guestName,
      },
      metadata: {
        fundItemId: params.fundItemId,
      },
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_APP_URL}/donation/success`,
        failure: `${process.env.NEXT_PUBLIC_APP_URL}/honeymoon`,
        pending: `${process.env.NEXT_PUBLIC_APP_URL}/donation/pending`,
      },
      auto_return: "approved",
      notification_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/mercado-pago`,
      external_reference: params.fundItemId,
    });

    return preference;
  } catch (error) {
    console.error("Mercado Pago preference error:", error);
    throw error;
  }
}

/**
 * Get payment details from Mercado Pago
 */
export async function getMercadoPagoPayment(paymentId: string) {
  try {
    const payment = await mercadopago.payment.findById(paymentId);
    return payment;
  } catch (error) {
    console.error("Mercado Pago payment error:", error);
    throw error;
  }
}

/**
 * Verify Mercado Pago webhook
 * Mercado Pago sends webhooks with topic and resource_id
 */
export async function verifyMercadoPagoWebhook(
  topic: string,
  resourceId: string
) {
  try {
    if (topic === "payment") {
      const payment = await getMercadoPagoPayment(resourceId);
      return payment;
    }
    return null;
  } catch (error) {
    console.error("Mercado Pago webhook verification error:", error);
    throw error;
  }
}
