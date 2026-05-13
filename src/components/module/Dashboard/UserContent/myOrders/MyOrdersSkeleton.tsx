
export function MyOrdersSkeleton() {
   return (
      <div className="min-h-screen bg-[#0a0b0f] p-8">
         <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8 animate-pulse">
               <div className="w-10 h-10 rounded-xl bg-gray-800" />
               <div>
                  <div className="h-5 w-28 bg-gray-800 rounded mb-1" />
                  <div className="h-3 w-16 bg-gray-800 rounded" />
               </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
               {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-16 bg-gray-900 border border-gray-800 rounded-xl animate-pulse" />
               ))}
            </div>
            <div className="flex gap-3 mb-6">
               <div className="flex-1 h-10 bg-gray-900 border border-gray-800 rounded-xl animate-pulse" />
               <div className="h-10 w-48 bg-gray-900 border border-gray-800 rounded-xl animate-pulse" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
               {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-52 bg-gray-900/70 border border-gray-800 rounded-2xl animate-pulse" />
               ))}
            </div>
         </div>
      </div>
   );
}
