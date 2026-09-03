import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const Modal = ({
  trigger,
  children,
  title,
  description,
  className,
  open,
  onOpenChange,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger  className={className}>
        {trigger}
      </DialogTrigger>
      <DialogContent className="border border-white/[.14] bg-[#151518]/82 p-6 text-white shadow-[0_24px_90px_rgba(0,0,0,.6)] backdrop-blur-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-black tracking-[-.04em]">{title}</DialogTitle>
          <DialogDescription className="text-white/45">{description}</DialogDescription>
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
};
