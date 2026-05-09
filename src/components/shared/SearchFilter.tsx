"use client"
import React, { use, useEffect, useState, useTransition } from "react";
import { Input } from "../ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";

interface SearchFilterProps {
   placeHolder?: string;
   paramName?: string; // Define any props you need for the search filter
}

const SearchFilter = ({ placeHolder = "Search...", paramName = "searchTerm" }: SearchFilterProps) => {
   const router = useRouter();
   const [isPending, startTransition] = useTransition();
   const searchParams = useSearchParams();
   const [value, setValue] = useState(searchParams.get(paramName) || "");
   const useDebounceValue = useDebounce(value, 500);

   useEffect(() => {
      const params = new URLSearchParams(searchParams.toString());

      const currentValue = searchParams.get(paramName) || "";
      if (currentValue === useDebounceValue) {
         return; // No need to update if the value hasn't changed
      }

      if (useDebounceValue) {
         params.set(paramName, useDebounceValue);
         params.set("page", "1");
      } else {
         params.delete(paramName);
         params.delete("page");
      }

      startTransition(() => {
         router.push(`?${params.toString()}`);
        
         console.log("checking");

         // router.replace(`?${params.toString()}`, { scroll: false });
      });
   }, [useDebounceValue, paramName, router, searchParams]);
   // router.refresh()
   return (
      <div className="relative">
         <search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
         <Input
            placeholder={placeHolder}
            value={value}
            onChange={(e) => setValue(e.target.value)} // Replace with your actual search logic
            disabled={isPending}
            className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
         />
      </div>
   );
};

export default SearchFilter;
