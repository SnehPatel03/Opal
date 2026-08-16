import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";
export async function GET() {
  const user = await currentUser();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  if (!user) {
    return NextResponse.json({ staus: 404 });
  }
  const priceid = process.env.STRIPE_SUBSCRIPTION_PRICE_ID;
 const session = await stripe.checkout.sessions.create({
  mode: "subscription",

  line_items: [
    {
      price: priceid,
      quantity: 1,
    },
  ],

  customer_email: user.emailAddresses[0].emailAddress,

  metadata: {
    clerkId: user.id,
  },

  success_url: `${process.env.NEXT_PUBLIC_HOST_URL}/payment?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${process.env.NEXT_PUBLIC_HOST_URL}/payment?cancel=true`,
});
  if (session) {
    return NextResponse.json({
      status: 200,
      session_url: session.url,
      customer_id: session.customer,
    });
  }
  return NextResponse.json({ status: 404 });
}
