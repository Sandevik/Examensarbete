import { NextApiRequest, NextApiResponse } from "next";
import { ServerErrorMessage } from "../../types";
import Stripe from "stripe";
import { changeSubscriptionType } from "../../controllers/changeSubscriptionType";
const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY ? process.env.STRIPE_SECRET_KEY : "",
  { apiVersion: "2022-11-15" }
);

export default async function handler(req: NextApiRequest, res: NextApiResponse<any | ServerErrorMessage>) {
  try {
    if (req.method !== "POST") return res.status(400);
    const { name, email, paymentMethod } = req.body;
    const customer = await stripe.customers.create({
      email,
      name,
      payment_method: paymentMethod,
      invoice_settings: { default_payment_method: paymentMethod },
    });

    const product = await stripe.products.create({
      name: "Prenumeration",
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price_data: {
            currency: "SEK",
            product: product.id,
            unit_amount: 2000,
            recurring: {
              interval: "month",
            },
          },
        },
      ],
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent"],
    });
    res
      .status(200)
      .json({
        message: "Subscription successfully created",
        subscriptionId: subscription.id,
      });
  } catch (err) {
    res.status(500).json({ error: "Payment Failed | Internal server error" });
  }
}
