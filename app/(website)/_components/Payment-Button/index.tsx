"use client";

import { Button } from "@/components/ui/button";
import { useSubscription } from "@/hooks/use-subscription";
import { Loader2, Sparkles } from "lucide-react";

const PaymentButton = () => {
  const { isProcessing, onSubscribe }: any = useSubscription();

  return (
    <Button
      onClick={onSubscribe}
      disabled={isProcessing}
      className="
        group
        relative
        w-full
        overflow-hidden
        rounded-xl
        border
        border-[#FF4C0F]
        bg-[#FF4C0F]
        text-[#0B0B0C]
        font-medium
        shadow-[0_0_0_1px_rgba(255,76,15,0.15)]
        transition-all
        duration-300
        ease-out

        hover:bg-[#FF5A1F]
        hover:shadow-[0_8px_30px_rgba(255,76,15,0.22)]

        active:translate-y-0
        active:scale-[0.99]

        disabled:cursor-not-allowed
        disabled:opacity-70
        disabled:hover:translate-y-0
        disabled:hover:shadow-none
      "
    >
      <span className="relative z-10 flex items-center justify-center">
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            Upgrade to Pro
          </>
        )}
      </span>
    </Button>
  );
};

export default PaymentButton;