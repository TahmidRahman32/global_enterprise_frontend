// components/inbox/MessageBubble.tsx
"use client";

import { Message } from "@/Types/inbox";
import { motion, type Variants } from "framer-motion";


interface MessageBubbleProps {
   message: Message;
   index: number;
}

const bubbleVariants: Variants = {
   hidden: (direction: "left" | "right") => ({
      opacity: 0,
      x: direction === "left" ? -20 : 20,
      scale: 0.95,
   }),
   visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
         type: "spring" as const,
         stiffness: 500,
         damping: 30,
      },
   },
};

export function MessageBubble({ message }: MessageBubbleProps) {
   const isMe = message.sender === "me";
   const direction = isMe ? "right" : "left";

   return (
      <motion.div custom={direction} variants={bubbleVariants} initial="hidden" animate="visible" whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 400, damping: 20 }} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
         <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl shadow-sm ${isMe ? "bg-neutral-800 text-white rounded-br-sm" : "bg-neutral-100 text-neutral-800 rounded-bl-sm border border-neutral-200"}`}>
            <p className="text-sm leading-relaxed break-words">{message.text}</p>
            <span className={`text-[10px] mt-1 block ${isMe ? "text-neutral-300" : "text-neutral-400"}`}>{message.timestamp}</span>
         </div>
      </motion.div>
   );
}
