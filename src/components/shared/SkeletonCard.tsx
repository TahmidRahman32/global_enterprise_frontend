import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonCardProps {
   // You can add props here if needed, such as dimensions or animation settings
   columns?: number;
   raws?: number;
   showHeader?: boolean;
}

export function SkeletonCard({columns=6,raws=2, showHeader=true }: SkeletonCardProps) {
   return (
   <div>
      {[...Array(raws)].map((_, index) => {
         return (
            <div className="p-6">
               {/* User Avatar Placeholder */}
               <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-yellow-700 to-purple-600 flex items-center justify-center shadow-md">
                     <Skeleton className="h-6 w-6 rounded-full bg-gray-300" />
                  </div>
                  <div className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                     <Skeleton className="h-4 w-16 bg-gray-300" />
                  </div>
               </div>

               {/* User Details */}
               <div className="space-y-3">
                  <div>
                     <h3 className="text-xl font-bold text-gray-300 group-hover:text-blue-500 transition-colors duration-200">
                        <Skeleton className="h-6 w-32 bg-gray-300" />
                     </h3>
                  </div>
                  <div className="space-y-2">
                     <div className="flex items-center text-sm text-gray-400">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="truncate">
                           <Skeleton className="h-4 w-24 bg-gray-300" />
                        </span>
                     </div>
                     <div className="flex items-center text-sm text-gray-400">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                           />
                        </svg>
                        <span>
                           <Skeleton className="h-4 w-24 bg-gray-300" />
                        </span>
                     </div>
                  </div>
               </div>

               {/* Action Button */}
               <button className="mt-6 w-full py-2.5 px-4 bg-yellow-800 hover:bg-yellow-600 text-white font-medium rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm">

                  <span className="text-sm">
                     <Skeleton className="h-4 w-16 bg-gray-300" />
                  </span>  
               </button>
            </div>
         );
      })}{
         showHeader && (
            <div className="px-6 py-4 border-b">
               <h2 className="text-lg font-semibold text-gray-300">
                  <Skeleton className="h-6 w-48 bg-gray-300" />
               </h2>
            </div>
         )
      }
            
                  


   </div>
   );
}
