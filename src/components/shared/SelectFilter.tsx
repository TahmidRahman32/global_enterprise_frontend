"use client"
import { useTransition } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

interface SelectFilterProps {
   paramName?: string;
   placeHolder?: string;
   options: { value: string; label: string }[]; // Define the options for the select filter
}

const SelectFilter = ({ paramName, placeHolder, options }: SelectFilterProps) => {
   const router = useRouter();
   const searchParams = useSearchParams();
   const [isPending, startTransition] = useTransition();
   const currentValue = searchParams.get(paramName || "") || "All";

   const handleValueChange = (value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value === "All") {
         params.delete(paramName || "");
      } else if (value) {
         params.set(paramName || "", value);
      } else {
         params.delete(paramName || "");
      }
      startTransition(() => {
         router.push(`?${params.toString()}`);
      });
   };

   return (
      <div>
         <Select value={currentValue} onValueChange={(value) => handleValueChange(value as string)} disabled={isPending}>
            <SelectTrigger className="w-full max-w-48">
               <SelectValue placeholder={placeHolder} />
            </SelectTrigger>
            <SelectContent>
               <SelectGroup>
                  <SelectLabel>Filters</SelectLabel>
                  {options.map((option) => (
                     <SelectItem key={option.value} value={option.value}>
                        {option.label}
                     </SelectItem>
                  ))}
               </SelectGroup>
            </SelectContent>
         </Select>
      </div>
   );
};

export default SelectFilter;
