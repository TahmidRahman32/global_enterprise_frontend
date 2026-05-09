// components/inbox/MessageInput.tsx
"use client";

import { useState, KeyboardEvent } from "react";
import { motion } from "framer-motion";

interface MessageInputProps {
   onSendMessage: (text: string) => void;
}

export function MessageInput({ onSendMessage }: MessageInputProps) {
   const [message, setMessage] = useState("");

   const handleSend = () => {
      if (message.trim()) {
         onSendMessage(message);
         setMessage("");
      }
   };

   const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
         e.preventDefault();
         handleSend();
      }
   };

   return (
      <div className="flex items-center gap-2">
         <motion.input
            whileFocus={{ scale: 1.01 }}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2.5 bg-neutral-50 border border-neutral-500 rounded-xl focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 transition-all text-neutral-800 placeholder:text-neutral-400 text-sm"
         />
         <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            disabled={!message.trim()}
            className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${message.trim() ? "bg-blue-500 text-white hover:bg-blue-600 shadow-sm" : "bg-neutral-200 text-neutral-400 cursor-not-allowed"}`}
         >
            Send
         </motion.button>
      </div>
   );
}
