import { Skeleton } from "@/components/ui/skeleton";

const SKELETON_CARDS = 6;

const OrderCardSkeleton = () => (
   <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
      <div className="p-5">
         {/* Header: image + order id */}
         <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-14 w-14 rounded-xl" />
            <Skeleton className="h-5 w-24 rounded-full" />
         </div>

         {/* Product name + customer */}
         <div className="mb-3 space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
         </div>

         {/* Info rows: email, phone, address, company */}
         <div className="space-y-2">
            <div className="flex items-center gap-2">
               <Skeleton className="h-4 w-4 rounded-sm flex-shrink-0" />
               <Skeleton className="h-4 w-40" />
            </div>
            <div className="flex items-center gap-2">
               <Skeleton className="h-4 w-4 rounded-sm flex-shrink-0" />
               <Skeleton className="h-4 w-28" />
            </div>
            <div className="flex items-center gap-2">
               <Skeleton className="h-4 w-4 rounded-sm flex-shrink-0" />
               <Skeleton className="h-4 w-36" />
            </div>
            <div className="flex items-center gap-2">
               <Skeleton className="h-4 w-4 rounded-sm flex-shrink-0" />
               <Skeleton className="h-4 w-24" />
            </div>
         </div>

         {/* Footer: status badge + action buttons */}
         <div className="mt-5 flex items-center justify-between">
            <Skeleton className="h-6 w-20 rounded-full" />
            <div className="flex gap-1">
               <Skeleton className="h-8 w-8 rounded-lg" />
               <Skeleton className="h-8 w-8 rounded-lg" />
               <Skeleton className="h-8 w-8 rounded-lg" />
            </div>
         </div>
      </div>
   </div>
);

const OrderListSkeleton = () => {
   return (
      <div>
         {/* Filter bar skeleton */}
         <div className="max-w-7xl mx-auto grid gap-3 grid-cols-1 sm:grid-cols-3 md:w-[550px] px-4 py-5">
            {/* Search input */}
            <Skeleton className="h-10 w-full rounded-md" />
            {/* Select filter */}
            <Skeleton className="h-10 w-full rounded-md" />
            {/* Refresh button */}
            <Skeleton className="h-10 w-full rounded-md" />
         </div>

         {/* Card grid skeleton */}
         <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {Array.from({ length: SKELETON_CARDS }).map((_, i) => (
                  <OrderCardSkeleton key={i} />
               ))}
            </div>
         </div>
      </div>
   );
};

export default OrderListSkeleton;
