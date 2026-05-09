"use client";

import { useState } from "react";
import { X, Send, Reply } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
// import { sendReply } from "./inboxActions";
// import { Message } from "./Inbox";
import { cn } from "@/lib/utils";
import { Message } from "./message.interface";

interface ReplyDialogProps {
   message: Message | null;
   onClose: () => void;
}

export default function ReplyDialog({ message, onClose }: ReplyDialogProps) {
   const [subject, setSubject] = useState(`Re: ${message?.subject ?? ""}`);
   const [description, setDescription] = useState("");
   const [isLoading, setIsLoading] = useState(false);

   if (!message) return null;

   const handleSend = async () => {
      if (!description.trim()) {
         toast.error("Please write a message before sending.");
         return;
      }

      setIsLoading(true);
      try {
         // const result = await sendReply({
         //    originalMessageId: message.id,
         //    subject,
         //    description,
         //    name: message.name,
         //    email: message.email,
         //    phone: message.phone,
         // });

         // if (result.success) {
         //    toast.success("Reply sent successfully!");
         //    onClose();
         // } else {
         //    toast.error(result.message || "Failed to send reply.");
         // }
      } catch {
         toast.error("Something went wrong. Please try again.");
      } finally {
         setIsLoading(false);
      }
   };

   return (
      // Faux modal overlay — normal flow so iframe height works correctly
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={(e) => e.target === e.currentTarget && onClose()}>
         <div className="w-full max-w-lg bg-gray-900 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
               <div className="flex items-center gap-2">
                  <Reply className="w-4 h-4 text-indigo-400" />
                  <h2 className="text-sm font-semibold text-gray-100">Reply to {message.name}</h2>
               </div>
               <button onClick={onClose} className="p-1.5 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-gray-800 transition-colors">
                  <X className="w-4 h-4" />
               </button>
            </div>

            {/* Original message preview */}
            <div className="mx-5 my-3 px-3 py-2.5 rounded-lg bg-gray-800/50 border-l-2 border-indigo-500/50">
               <p className="text-[11px] text-gray-500 mb-1">Original message</p>
               <p className="text-xs text-gray-400 line-clamp-2">{message.description}</p>
            </div>

            {/* Form */}
            <div className="px-5 pb-5 space-y-3">
               {/* To field (read-only) */}
               <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 w-10 flex-shrink-0">To</span>
                  <div className="flex-1 px-3 py-2 rounded-lg bg-gray-800/40 border border-gray-700 text-xs text-gray-300">{message.email ?? message.name}</div>
               </div>

               {/* Subject */}
               <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 w-10 flex-shrink-0">Subject</span>
                  <Input value={subject} onChange={(e) => setSubject(e.target.value)} className="flex-1 h-8 text-xs bg-gray-800/40 border-gray-700 text-gray-200 focus:border-indigo-500/50" />
               </div>

               {/* Message body */}
               <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write your reply..."
                  rows={5}
                  className={cn("w-full text-sm bg-gray-800/40 border-gray-700 text-gray-200", "placeholder:text-gray-600 focus:border-indigo-500/50 resize-none")}
               />

               {/* Actions */}
               <div className="flex items-center justify-end gap-2 pt-1">
                  <Button variant="ghost" size="sm" onClick={onClose} disabled={isLoading} className="h-8 px-4 text-xs text-gray-400 hover:text-gray-200 hover:bg-gray-800">
                     Cancel
                  </Button>
                  <Button size="sm" onClick={handleSend} disabled={isLoading || !description.trim()} className="h-8 px-4 text-xs bg-indigo-600 hover:bg-indigo-700 text-white border-0">
                     {isLoading ? (
                        "Sending..."
                     ) : (
                        <>
                           <Send className="w-3 h-3 mr-1.5" />
                           Send reply
                        </>
                     )}
                  </Button>
               </div>
            </div>
         </div>
      </div>
   );
}
