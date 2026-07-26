import { getpaymentDetails } from "@/actions/workspace";
import React from "react";

type Props = {};

const BillingPage = async ({}: Props) => {
  type PaymentDetails = {
  status: number;
  data: {
    subscription: {
      plan: string;
    };
  };
};
  const payment = await getpaymentDetails();
  const isPro = payment?.data?.subscription?.plan === "PRO";
 
return (
    <div className="flex flex-col gap-8">
      <div className="rounded-2xl border bg-card p-6 shadow-sm max-w-2xl">
        <div className="flex flex-col gap-8">
          {/* Current Plan */}
          <div>
            <h2 className="text-xl font-semibold">Current Plan</h2>
            <p className="text-sm text-muted-foreground">
              Your active subscription.
            </p>
          </div>

          <div className="rounded-xl border bg-muted/30 p-5">
            <h3 className="text-3xl font-bold">
              ₹{isPro ? "99" : "0"}
              <span className="text-base font-normal text-muted-foreground">
                /month
              </span>
            </h3>

            <p className="mt-2 text-sm font-medium uppercase tracking-wide text-primary">
              {isPro ? "PRO" : "FREE"}
            </p>
          </div>

          {/* <div className="flex justify-end">
            {isPro ? (
              <button className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-accent transition">
                Manage Subscription
              </button>
            ) : (
              <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition">
                Upgrade to Pro
              </button>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
