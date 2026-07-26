import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

type Props = {
  triggers: string[];
  children: React.ReactNode;
  defaultValue: string;
};

const TabsComponent = ({
  triggers,
  children,
  defaultValue,
}: Props) => {
  return (
    <Tabs defaultValue={defaultValue} className="w-full">
      <TabsList
        className="
          h-11 w-full justify-start
          rounded-xl
          border border-zinc-800
          bg-[#1a1a1a]
          p-1
        "
      >
        {triggers.map((trigger) => (
          <TabsTrigger
            key={trigger}
            value={trigger}
            className="
              rounded-lg
              px-4
              py-2
              text-sm
              font-medium
              text-zinc-400
              transition-all
              duration-200

              hover:text-white

              data-[state=active]:bg-zinc-800
              data-[state=active]:text-white
              data-[state=active]:shadow-sm
              data-[state=active]:border
              data-[state=active]:border-zinc-700
            "
          >
            {trigger}
          </TabsTrigger>
        ))}
      </TabsList>

      <div className="mt-5">{children}</div>
    </Tabs>
  );
};

export default TabsComponent;