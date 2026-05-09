// components/inbox/MessageArea.tsx
"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";
import { Message } from "@/Types/inbox";
// import { Message } from "@/types/inbox";

interface MessageAreaProps {
   conversationName: string;
   messages: Message[];
   onSendMessage: (text: string) => void;
}

export function MessageArea({ conversationName, messages, onSendMessage }: MessageAreaProps) {
   const messagesEndRef = useRef<HTMLDivElement>(null);
   const scrollContainerRef = useRef<HTMLDivElement>(null);

   const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
   };

   useEffect(() => {
      scrollToBottom();
   }, [messages]);

   const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
         opacity: 1,
         transition: {
            staggerChildren: 0.08,
         },
      },
   };

   return (
      <div className="flex flex-col h-full bg-black/5">
         {/* Header */}
         <div className="px-6 py-4 border-b border-neutral-200 bg-white/20 backdrop-blur-sm sticky top-0 z-10">
            <h2 className="text-lg font-semibold text-neutral-800">{conversationName}</h2>
            <p className="text-xs text-neutral-400">Active now</p>
         </div>

         {/* Messages Container */}
         <div ref={scrollContainerRef} className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col space-y-3">
               <AnimatePresence>
                  {messages.map((message, index) => (
                     <MessageBubble key={message.id} message={message} index={index} />
                  ))}
               </AnimatePresence>
               <div ref={messagesEndRef} />
            </motion.div>
         </div>

         {/* Input Area */}
         <div className="p-4 border-t border-neutral-400 bg-black/5">
            <MessageInput onSendMessage={onSendMessage} />
         </div>
      </div>
   );
}
