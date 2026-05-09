"use client";

import { RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface RefreshButtonProps {
   size?: "small" | "medium" | "large" | "default";
   variant?: "primary" | "secondary" | "tertiary";
   showLabel?: boolean;
}

export const RefreshButton: React.FC<RefreshButtonProps> = ({ size = "default", variant = "primary", showLabel = true }) => {
   const buttonSize = size === "small" ? "sm" : size === "medium" ? "default" : size === "large" ? "lg" : size;
   const buttonVariant = variant === "primary" ? "default" : variant === "tertiary" ? "outline" : variant;

   const router = useRouter();
   const [isPending, startTransition] = useTransition();
   const handleRefresh = () => {
      startTransition(() => {
         router.refresh();
      });
      // router.refresh();
   };
   return (
      <Button size={buttonSize} variant={buttonVariant} onClick={handleRefresh} className="flex items-center gap-2" disabled={isPending}>
         <RefreshCw className={`w-4 h-4 ${isPending ? "animate-spin" : ""}${showLabel ? "mr-2" : ""}`} />
         {showLabel && "Refresh"}
      </Button>
   );
};


