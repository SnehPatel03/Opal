"use client";

import { Button } from "@/components/ui/button";
import { useSubscription } from "@/hooks/use-subscription";
import { Loader2, Sparkles } from "lucide-react";

const PaymentButton = () => {
  const { isProcessing, onSubscribe }:any = useSubscription();

  return (
    <Button
      onClick={onSubscribe}
      disabled={isProcessing}
      className="w-full rounded-xl bg-white text-black font-medium transition-all duration-200 hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-80"
    >
      {isProcessing ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Upgrade to Pro
        </>
      )}
    </Button>
  );
};

export default PaymentButton;