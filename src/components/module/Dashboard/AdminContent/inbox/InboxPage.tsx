// app/inbox/page.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Conversation, MassageRecord, Message } from "@/Types/inbox";
import { MessageArea } from "./MessageArea";
import { ConversationList } from "./ConversationList";
import { transformMassagesToConversations } from "./Transforminbox";
// import { transformMassagesToConversations } from "@/lib/transformInbox";

// ─── Accept raw backend records, transform once on mount ─────────────────────
export default function InboxPage({ messages }: { messages: MassageRecord[] }) {
   const [conversations, setConversations] = useState<Conversation[]>(() => transformMassagesToConversations(messages));
   const [selectedConversationId, setSelectedConversationId] = useState<string>(conversations[0]?.id || "");

   const selectedConversation = conversations.find((c) => c.id === selectedConversationId);

   const handleSendMessage = (text: string) => {
      if (!text.trim() || !selectedConversationId) return;

      const newMessage: Message = {
         id: Date.now().toString(),
         text: text.trim(),
         sender: "me",
         timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
         }),
      };

      setConversations((prev) =>
         prev.map((conv) => {
            if (conv.id === selectedConversationId) {
               return {
                  ...conv,
                  messages: [...conv.messages, newMessage],
                  lastMessage: newMessage.text,
                  timestamp: newMessage.timestamp,
               };
            }
            return conv;
         }),
      );
   };

   return (
      <div className="flex h-screen w-full bg-mist-800 font-sans">
         <div className="flex h-full w-full mx-auto bg-black/5 shadow-xl overflow-hidden border">
            {/* Left Side - Message Area */}
            <div className="flex-1 flex flex-col bg-black/5">
               <AnimatePresence mode="wait">
                  {selectedConversation ? (
                     <motion.div key={selectedConversation.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.2 }} className="flex-1 flex flex-col">
                        <MessageArea conversation={selectedConversation} messages={selectedConversation.messages} onSendMessage={handleSendMessage} />
                     </motion.div>
                  ) : (
                     <div className="flex-1 flex items-center justify-center text-neutral-400">Select a conversation to start messaging</div>
                  )}
               </AnimatePresence>
            </div>

            {/* Right Side - Conversation List */}
            <div className="w-80 bg-black/5 border-l border-neutral-200 flex flex-col">
               <div className="p-4 border-b border-neutral-200">
                  <h2 className="text-lg font-semibold text-neutral-300">Inbox</h2>
                  <p className="text-xs text-neutral-400 mt-0.5">{conversations.length} conversations</p>
               </div>
               <ConversationList conversations={conversations} selectedConversationId={selectedConversationId} onSelectConversation={setSelectedConversationId} />
            </div>
         </div>
      </div>
   );
}
