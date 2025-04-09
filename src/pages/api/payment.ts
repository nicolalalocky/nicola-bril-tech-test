import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { getProduct } from "@/data/products";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-03-31.basil",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Ensure the Stripe secret key is set
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error("Stripe secret key is missing in environment variables.");
    return res.status(500).json({ error: "Internal server error" });
  }

  if (req.method === "POST") {
    try {
      const { productId } = req.body;

      // Validate the incoming productId
      if (!productId || typeof productId !== "string") {
        return res.status(400).json({ error: "Invalid or missing product ID" });
      }

      // Retrieve the product details
      const product = getProduct(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      // Create a Payment Intent with manual capture
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(product.max_credit * 100),
        currency: "gbp",
        capture_method: "manual",
        description: `Hold for ${product.title}`,
        metadata: {
          productId: product.id,
          productName: product.title,
        },
      });

      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error: unknown) {
      if (error instanceof Stripe.errors.StripeCardError) {
        console.error("Card error:", error.message);
        return res.status(400).json({ error: "Card error: " + error.message });
      } else if (error instanceof Stripe.errors.StripeInvalidRequestError) {
        console.error("Invalid request error:", error.message);
        return res
          .status(400)
          .json({ error: "Invalid request: " + error.message });
      } else if (error instanceof Stripe.errors.StripeAPIError) {
        console.error("Stripe API error:", error.message);
        return res
          .status(500)
          .json({ error: "Stripe API error: " + error.message });
      } else if (error instanceof Stripe.errors.StripeConnectionError) {
        console.error("Connection error:", error.message);
        return res
          .status(500)
          .json({ error: "Connection error: " + error.message });
      } else if (error instanceof Stripe.errors.StripeAuthenticationError) {
        console.error("Authentication error:", error.message);
        return res
          .status(401)
          .json({ error: "Authentication error: " + error.message });
      } else if (error instanceof Stripe.errors.StripeRateLimitError) {
        console.error("Rate limit error:", error.message);
        return res
          .status(429)
          .json({ error: "Rate limit error: " + error.message });
      } else {
        // Handle unknown errors
        console.error("Unknown error:", error);
        return res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  } else {
    // Handle unsupported HTTP methods
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
