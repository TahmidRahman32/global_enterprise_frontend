"use client" ;
import { useRouter, useSearchParams } from 'next/navigation';
import  { useTransition } from 'react';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
   // You can add props here if needed, such as current page, total pages, etc.
   currentPage?: number;
   totalPages?: number;

}

const Pagination = ({ currentPage = 1, totalPages = 1}: PaginationProps) => {
    const router = useRouter();
      const [isPending, startTransition] = useTransition();
      const searchParams = useSearchParams();
      const navigationToPage = (newPage: number) => {
         const params = new URLSearchParams(searchParams.toString());
         params.set("page", newPage.toString());
         startTransition(() => {
            router.push(`?${params.toString()}`);
         });  
      
      }

      if (totalPages <= 1) {
         return null; // Don't render pagination if there's only one page
      }
   return (
      <div className="flex items-center justify-center space-x-2 my-4 ">
         <Button size={"sm"} variant="outline" onClick={() => navigationToPage(currentPage - 1)} disabled={currentPage <= 1 || isPending} className="flex items-center gap-2">
            <ChevronLeft className="w-4 h-4 mr-2" /> Previous
         </Button>
         <div className="flex items-center gap1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
               let pageNumber;
               if (totalPages <= 5) {
                  pageNumber = index + 1;
               } else if (currentPage <= 3) {
                  pageNumber = index + 1;
               } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + index;
               } else {
                  pageNumber = currentPage - 2 + index;
               }
               return (
                  <Button key={pageNumber} size={"sm"} variant={pageNumber === currentPage ? "default" : "outline"} onClick={() => navigationToPage(pageNumber)} disabled={pageNumber === currentPage || isPending}>
                     {pageNumber}
                  </Button>
               );
            })}
         </div>
         <Button size={"sm"} variant="outline" onClick={() => navigationToPage(currentPage + 1)} disabled={currentPage >= totalPages || isPending} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 mr-2" /> Next
         </Button>
         
      </div>
   );
};

export default Pagination;