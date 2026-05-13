// // components/inbox/InboxSkeleton.tsx

// const shimmer = "animate-pulse bg-neutral-200 dark:bg-neutral-700 rounded";

// // ─── Reusable pulse block ─────────────────────────────────────────────────────
// function Block({ className }: { className: string }) {
//    return <div className={`${shimmer} ${className}`} />;
// }

// // ─── One row in the conversation list ────────────────────────────────────────
// function ConversationRowSkeleton({ delay }: { delay: string }) {
//    return (
//       <div className="flex items-center gap-3 px-4 py-3 border-l-4 border-transparent" style={{ animationDelay: delay }}>
//          {/* Avatar circle */}
//          <div className={`${shimmer} w-12 h-12 rounded-full shrink-0`} style={{ animationDelay: delay }} />

//          <div className="flex-1 min-w-0 space-y-2">
//             <div className="flex justify-between items-center">
//                <Block className="h-3.5 w-28" />
//                <Block className="h-2.5 w-10" />
//             </div>
//             {/* Subject */}
//             <Block className="h-2.5 w-20" />
//             {/* Last message */}
//             <Block className="h-2.5 w-36" />
//          </div>
//       </div>
//    );
// }

// // ─── One message bubble ───────────────────────────────────────────────────────
// function MessageBubbleSkeleton({ align, width, delay }: { align: "left" | "right"; width: string; delay: string }) {
//    return (
//       <div className={`flex ${align === "right" ? "justify-end" : "justify-start"}`} style={{ animationDelay: delay }}>
//          <div className={`${shimmer} h-10 rounded-2xl ${width}`} style={{ animationDelay: delay }} />
//       </div>
//    );
// }

// // ─── Main skeleton ────────────────────────────────────────────────────────────
// export function InboxSkeleton() {
//    return (
//       <div className="flex h-screen w-full font-sans">
//          <div className="flex h-full w-full bg-black/5 shadow-xl overflow-hidden border">
//             {/* ── Left: Message Area ─────────────────────────────────────────── */}
//             <div className="flex-1 flex flex-col bg-black/5">
//                {/* Header */}
//                <div className="px-6 py-4 border-b border-neutral-200 bg-white/20 backdrop-blur-sm">
//                   <div className="flex items-start justify-between">
//                      <div className="space-y-2">
//                         <Block className="h-5 w-40" />
//                         <Block className="h-3 w-24" />
//                      </div>
//                      <div className="space-y-1.5 text-right">
//                         <Block className="h-3 w-36 ml-auto" />
//                         <Block className="h-3 w-24 ml-auto" />
//                      </div>
//                   </div>
//                </div>

//                {/* Messages */}
//                <div className="flex-1 overflow-hidden px-4 py-6 space-y-4">
//                   <MessageBubbleSkeleton align="left" width="w-56" delay="0ms" />
//                   <MessageBubbleSkeleton align="right" width="w-44" delay="60ms" />
//                   <MessageBubbleSkeleton align="left" width="w-72" delay="120ms" />
//                   <MessageBubbleSkeleton align="right" width="w-36" delay="180ms" />
//                   <MessageBubbleSkeleton align="left" width="w-64" delay="240ms" />
//                   <MessageBubbleSkeleton align="right" width="w-52" delay="300ms" />
//                   <MessageBubbleSkeleton align="left" width="w-48" delay="360ms" />
//                </div>

//                {/* Input bar */}
//                <div className="p-4 border-t border-neutral-400 bg-black/5">
//                   <div className="flex items-center gap-2">
//                      <Block className="flex-1 h-10 rounded-xl" />
//                      <Block className="w-16 h-10 rounded-xl" />
//                   </div>
//                </div>
//             </div>

//             {/* ── Right: Conversation List ───────────────────────────────────── */}
//             <div className="w-80 bg-black/5 border-l border-neutral-200 flex flex-col">
//                {/* List header */}
//                <div className="p-4 border-b border-neutral-200 space-y-2">
//                   <Block className="h-5 w-16" />
//                   <Block className="h-3 w-28" />
//                </div>

//                {/* Conversation rows */}
//                <div className="flex-1 overflow-hidden py-2">
//                   {["0ms", "60ms", "120ms", "180ms", "240ms", "300ms"].map((delay, i) => (
//                      <ConversationRowSkeleton key={i} delay={delay} />
//                   ))}
//                </div>
//             </div>
//          </div>
//       </div>
//    );
// }

export function InboxLoader() {
   return (
      <div className="flex flex-col items-center justify-center h-screen gap-6">
         {/* Spinner with envelope icon */}
         <div className="relative w-16 h-16">
            {/* Pulse ring */}
            <div className="absolute inset-0 rounded-full border border-neutral-200 dark:border-neutral-700 animate-ping opacity-20" />

            {/* Background circle */}
            <div className="absolute inset-0 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700" />

            {/* Spinning arc */}
            <svg className="absolute inset-0 animate-spin" viewBox="0 0 64 64" fill="none">
               <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="44 132" className="text-neutral-800 dark:text-neutral-200" />
            </svg>

            {/* Envelope icon */}
            <div className="absolute inset-0 flex items-center justify-center">
               <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-500 dark:text-neutral-400">
                  <rect x="3" y="6" width="18" height="13" rx="2" />
                  <path d="M3 9l9 6 9-6" />
               </svg>
            </div>
         </div>

         {/* Label with bouncing dots */}
         <div className="flex items-center gap-2">
            <span className="text-sm text-neutral-400 dark:text-neutral-500">Loading inbox</span>
            <div className="flex gap-1 items-center">
               {[0, 1, 2].map((i) => (
                  <span key={i} className="w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-500 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
               ))}
            </div>
         </div>
      </div>
   );
}
