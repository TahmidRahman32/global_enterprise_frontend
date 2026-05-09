// components/inbox/ConversationList.tsx
"use client";

import { Conversation } from "@/Types/inbox";
import { motion } from "framer-motion";
// import { Conversation } from "@/types/inbox";

interface ConversationListProps {
   conversations: Conversation[];
   selectedConversationId: string;
   onSelectConversation: (id: string) => void;
}

const containerVariants = {
   hidden: { opacity: 0 },
   visible: {
      opacity: 1,
      transition: {
         staggerChildren: 0.05,
      },
   },
};

const itemVariants = {
   hidden: { opacity: 0, x: 20 },
   visible: { opacity: 1, x: 0 },
};

export function ConversationList({ conversations, selectedConversationId, onSelectConversation }: ConversationListProps) {
   return (
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex-1 overflow-y-auto py-2">
         {conversations.map((conversation) => (
            <motion.button
               key={conversation.id}
               variants={itemVariants}
               whileHover={{ scale: 1.02, backgroundColor: "#f5f5f5" }}
               whileTap={{ scale: 0.98 }}
               transition={{ type: "spring", stiffness: 400, damping: 17 }}
               onClick={() => onSelectConversation(conversation.id)}
               className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-all duration-200 ${
                  selectedConversationId === conversation.id ? "bg-blue-500 border-l-4 border-neutral-800" : "border-l-4 border-transparent hover:bg-blue-500"
               }`}
            >
               {/* Avatar */}
               <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white font-medium text-sm shrink-0 shadow-sm">{conversation.avatarInitials}</div>

               {/* Conversation Info */}
               <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                     <h3 className="font-medium text-neutral-800 truncate">{conversation.name}</h3>
                     <span className="text-xs text-neutral-400 ml-2 shrink-0">{conversation.timestamp}</span>
                  </div>
                  <p className="text-sm text-neutral-500 truncate">{conversation.lastMessage}</p>
               </div>
            </motion.button>
         ))}
      </motion.div>
   );
}
