// components/inbox/MessageArea.tsx
"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";
import { Conversation, Message } from "@/Types/inbox";

interface MessageAreaProps {
   conversation: Conversation;
   messages: Message[];
   onSendMessage: (text: string) => void;
}

export function MessageArea({ conversation, messages, onSendMessage }: MessageAreaProps) {
   const messagesEndRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
   }, [messages]);

   const containerVariants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
   };

   return (
      <div className="flex flex-col h-full bg-black/5">
         {/* Header — shows name, subject, email, phone */}
         <div className="px-6 py-4 border-b border-neutral-200 bg-white/10 backdrop-blur-sm sticky top-0 z-10">
            <div className="flex items-start justify-between">
               <div>
                  <h2 className="text-lg font-semibold text-neutral-100">{conversation.name}</h2>
                  <p className="text-xs text-neutral-400 font-medium mt-0.5">{conversation.subject}</p>
               </div>
               <div className="text-right text-xs text-neutral-200 space-y-0.5">
                  {conversation.email && <p>{conversation.email}</p>}
                  {conversation.phone && <p>{conversation.phone}</p>}
               </div>
            </div>
         </div>

         {/* Messages */}
         <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col space-y-3">
               <AnimatePresence>
                  {messages.map((message, index) => (
                     <MessageBubble key={message.id} message={message} index={index} />
                  ))}
               </AnimatePresence>
               <div ref={messagesEndRef} />
            </motion.div>
         </div>

         {/* Input */}
         <div className="p-4 border-t border-neutral-400 bg-black/5">
            <MessageInput onSendMessage={onSendMessage} />
         </div>
      </div>
   );
}
