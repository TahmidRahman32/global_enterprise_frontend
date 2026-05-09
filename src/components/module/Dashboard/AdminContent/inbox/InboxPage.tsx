// app/inbox/page.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Conversation, Message } from "@/Types/inbox";
import { MessageArea } from "./MessageArea";
import { ConversationList } from "./ConversationList";


// Sample conversation data with messages
const initialConversations: Conversation[] = [
   {
      id: "1",
      name: "Alice Johnson",
      avatarInitials: "AJ",
      lastMessage: "Hey, how are you?",
      timestamp: "10:42 AM",
      messages: [
         {
            id: "m1",
            text: "Hi! How's your project going?",
            sender: "them",
            timestamp: "10:30 AM",
         },
         {
            id: "m2",
            text: "It's going well, just finishing up the UI components.",
            sender: "me",
            timestamp: "10:33 AM",
         },
         {
            id: "m3",
            text: "That sounds great! I'd love to see it sometime.",
            sender: "them",
            timestamp: "10:35 AM",
         },
         {
            id: "m4",
            text: "Absolutely, I'll share a preview later today.",
            sender: "me",
            timestamp: "10:42 AM",
         },
      ],
   },
   {
      id: "2",
      name: "Bob Smith",
      avatarInitials: "BS",
      lastMessage: "See you tomorrow at the meeting",
      timestamp: "Yesterday",
      messages: [
         {
            id: "m1",
            text: "Hey Bob, are we still on for tomorrow?",
            sender: "me",
            timestamp: "Yesterday 2:15 PM",
         },
         {
            id: "m2",
            text: "Yes, see you tomorrow at the meeting. 10 AM sharp.",
            sender: "them",
            timestamp: "Yesterday 3:20 PM",
         },
         {
            id: "m3",
            text: "Perfect, I'll be there.",
            sender: "me",
            timestamp: "Yesterday 4:00 PM",
         },
      ],
   },
   {
      id: "3",
      name: "Carol Davis",
      avatarInitials: "CD",
      lastMessage: "Can you review the docs?",
      timestamp: "Yesterday",
      messages: [
         {
            id: "m1",
            text: "Hi Carol, what's up?",
            sender: "me",
            timestamp: "Yesterday 9:00 AM",
         },
         {
            id: "m2",
            text: "Can you review the documentation PR? Need your feedback.",
            sender: "them",
            timestamp: "Yesterday 9:15 AM",
         },
         {
            id: "m3",
            text: "Sure, I'll take a look right now.",
            sender: "me",
            timestamp: "Yesterday 9:20 AM",
         },
      ],
   },
   {
      id: "4",
      name: "David Miller",
      avatarInitials: "DM",
      lastMessage: "Thanks for your help!",
      timestamp: "Monday",
      messages: [
         {
            id: "m1",
            text: "Hey David, did you manage to fix the bug?",
            sender: "me",
            timestamp: "Monday 11:00 AM",
         },
         {
            id: "m2",
            text: "Yes! Thanks for your help debugging.",
            sender: "them",
            timestamp: "Monday 12:30 PM",
         },
      ],
   },
   {
      id: "5",
      name: "Emma Watson",
      avatarInitials: "EW",
      lastMessage: "Let's catch up soon",
      timestamp: "Monday",
      messages: [
         {
            id: "m1",
            text: "Long time no see! How have you been?",
            sender: "them",
            timestamp: "Monday 5:00 PM",
         },
         {
            id: "m2",
            text: "I've been great! Let's catch up soon.",
            sender: "me",
            timestamp: "Monday 5:30 PM",
         },
      ],
   },
];

export default function InboxPage() {
   const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
   const [selectedConversationId, setSelectedConversationId] = useState<string>(conversations[0]?.id || "");

   const selectedConversation = conversations.find((c) => c.id === selectedConversationId);

   const handleSendMessage = (text: string) => {
      if (!text.trim() || !selectedConversationId) return;

      const newMessage: Message = {
         id: Date.now().toString(),
         text: text.trim(),
         sender: "me",
         timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setConversations((prev) =>
         prev.map((conv) => {
            if (conv.id === selectedConversationId) {
               const updatedMessages = [...conv.messages, newMessage];
               return {
                  ...conv,
                  messages: updatedMessages,
                  lastMessage: newMessage.text,
                  timestamp: newMessage.timestamp,
               };
            }
            return conv;
         }),
      );
   };

   const handleSelectConversation = (id: string) => {
      setSelectedConversationId(id);
   };

   return (
      <div className="flex h-screen w-full bg-mist-800 font-sans">
         <div className="flex h-full w-full  mx-auto bg-black/5  shadow-xl overflow-hidden border ">
            {/* Left Side - Message Area */}
            <div className="flex-1 flex flex-col bg-black/5">
               <AnimatePresence mode="wait">
                  {selectedConversation ? (
                     <motion.div key={selectedConversation.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.2 }} className="flex-1 flex flex-col">
                        <MessageArea conversationName={selectedConversation.name} messages={selectedConversation.messages} onSendMessage={handleSendMessage} />
                     </motion.div>
                  ) : (
                     <div className="flex-1 flex items-center justify-center text-neutral-400">Select a conversation to start messaging</div>
                  )}
               </AnimatePresence>
            </div>

            {/* Right Side - Conversation List */}
            <div className="w-80 bg-black/5 border-l border-neutral-200 flex flex-col">
               <div className="p-4 border-b border-neutral-200">
                  <h2 className="text-lg font-semibold text-neutral-800">Chats</h2>
                  <p className="text-xs text-neutral-400 mt-0.5">{conversations.length} conversations</p>
               </div>
               <ConversationList conversations={conversations} selectedConversationId={selectedConversationId} onSelectConversation={handleSelectConversation} />
            </div>
         </div>
      </div>
   );
}
