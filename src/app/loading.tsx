// import Spinner from "@/components/globalInventory/Spinner";

const loading = () => {
   return (
      // <div className="flex flex-col items-center justify-center h-screen gap-6">
      //    {/* Spinner with envelope icon */}
      //    <div className="relative w-16 h-16">
      //       {/* Pulse ring */}
      //       <div className="absolute inset-0 rounded-full border border-neutral-200 dark:border-neutral-700 animate-ping opacity-20" />

      //       {/* Background circle */}
      //       <div className="absolute inset-0 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700" />

      //       {/* Spinning arc */}
      //       <svg className="absolute inset-0 animate-spin" viewBox="0 0 64 64" fill="none">
      //          <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="44 132" className="text-neutral-800 dark:text-neutral-200" />
      //       </svg>

      //       {/* Envelope icon */}
      //       <div className="absolute inset-0 flex items-center justify-center">
      //          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-500 dark:text-neutral-400">
      //             <rect x="3" y="6" width="18" height="13" rx="2" />
      //             <path d="M3 9l9 6 9-6" />
      //          </svg>
      //       </div>
      //    </div>

      //    {/* Label with bouncing dots */}
      //    <div className="flex items-center gap-2">
      //       <span className="text-sm text-neutral-400 dark:text-neutral-500">Loading inbox</span>
      //       <div className="flex gap-1 items-center">
      //          {[0, 1, 2].map((i) => (
      //             <span key={i} className="w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-500 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
      //          ))}
      //       </div>
      //    </div>
      // </div>
      <div className="flex flex-col items-center justify-center h-screen gap-6">
         <div className="relative w-16 h-16">
            {/* Pulse ring */}
            <div className="absolute inset-0 rounded-full border border-neutral-200 dark:border-neutral-700 animate-ping opacity-20" />

            {/* Background circle */}
            <div className="absolute inset-0 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700" />

            {/* Spinning arc */}
            <svg className="absolute inset-0 animate-spin" viewBox="0 0 64 64" fill="none">
               <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="44 132" className="text-neutral-800 dark:text-neutral-200" />
            </svg>

            {/* Bar chart icon */}
            <div className="absolute inset-0 flex items-center justify-center">
               <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="text-neutral-500 dark:text-neutral-400">
                  <rect x="1" y="10" width="5" height="8" rx="1" fill="currentColor" />
                  <rect x="8" y="5" width="5" height="13" rx="1" fill="currentColor" />
                  <rect x="15" y="1" width="5" height="17" rx="1" fill="currentColor" />
                  <line x1="0" y1="19" x2="21" y2="19" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
               </svg>
            </div>
         </div>

         {/* Label with bouncing dots */}
         <div className="flex items-center gap-2">
            <span className="text-sm text-neutral-400 dark:text-neutral-500">Loading...</span>
            <div className="flex gap-1 items-center">
               {[0, 1, 2].map((i) => (
                  <span key={i} className="w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-500 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
               ))}
            </div>
         </div>
      </div>
   );
};

export default loading;
