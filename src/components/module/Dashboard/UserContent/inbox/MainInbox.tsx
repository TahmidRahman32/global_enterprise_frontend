"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Mail, Phone, User, Clock, CheckCheck, Circle, Trash2, Reply, Search, RefreshCw, ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { InboxProps, MassageStatus, Message } from "./message.interface";
import MessageRow from "./MessageRow";
import { MessageDetail } from "./MessageDetail";

export default function Inbox({ messages = [], onMarkRead, onDelete, onReply, onRefresh }: InboxProps) {
   const [selected, setSelected] = useState<Message | null>(null);
   const [search, setSearch] = useState("");
   const [statusFilter, setStatusFilter] = useState<MassageStatus | "ALL">("ALL");

   const filtered = messages.filter((m) => {
      const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.subject.toLowerCase().includes(search.toLowerCase()) || m.description.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "ALL" || m.massageStatus === statusFilter;
      return matchesSearch && matchesStatus;
   });

   const unreadCount = messages.filter((m) => m.massageStatus === "MASSAGE_SEND").length;

   const filterTabs: { label: string; value: MassageStatus | "ALL" }[] = [
      { label: "All", value: "ALL" },
      { label: "New", value: "MASSAGE_SEND" },
      { label: "Read", value: "MASSAGE_READ" },
      { label: "Replied", value: "MASSAGE_REPLIED" },
   ];

   return (
      <div className="flex h-[calc(100vh-10rem)] max-h-[800px] bg-gray-900  border border-gray-800 overflow-hidden shadow-2xl">
         {/* ── Left panel: message list ── */}
         <div className={cn("flex flex-col border-r border-gray-800 transition-all duration-200", selected ? "hidden md:flex md:w-[320px] lg:w-[360px]" : "flex w-full md:w-[320px] lg:w-[360px]")}>
            {/* List header */}
            <div className="px-4 pt-4 pb-3 border-b border-gray-800">
               <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                     <h1 className="text-base font-semibold text-gray-100">Inbox</h1>
                     {unreadCount > 0 && <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-indigo-500 text-[10px] font-bold text-white">{unreadCount}</span>}
                  </div>
                  {onRefresh && (
                     <button onClick={onRefresh} className="p-1.5 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-gray-800 transition-colors">
                        <RefreshCw className="w-3.5 h-3.5" />
                     </button>
                  )}
               </div>

               {/* Search */}
               <div className="relative mb-3">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                  <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search messages..." className="pl-8 h-8 text-xs bg-gray-800/60 border-gray-700 text-gray-200 placeholder:text-gray-500 focus:border-indigo-500/50" />
               </div>

               {/* Filter tabs */}
               <div className="flex gap-1">
                  {filterTabs.map((tab) => (
                     <button
                        key={tab.value}
                        onClick={() => setStatusFilter(tab.value)}
                        className={cn("px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors", statusFilter === tab.value ? "bg-indigo-500/20 text-indigo-300" : "text-gray-500 hover:text-gray-300 hover:bg-gray-800")}
                     >
                        {tab.label}
                     </button>
                  ))}
               </div>
            </div>

            {/* Message list */}
            <div className="flex-1 overflow-y-auto">
               {filtered.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-600">
                     <Mail className="w-10 h-10" />
                     <p className="text-sm">No messages found</p>
                  </div>
               ) : (
                  filtered.map((message) => <MessageRow key={message.id} message={message} isSelected={selected?.id === message.id} onClick={() => setSelected(message)} />)
               )}
            </div>

            {/* Footer count */}
            <div className="px-4 py-2.5 border-t border-gray-800 text-[11px] text-gray-600">
               {filtered.length} message{filtered.length !== 1 ? "s" : ""}
            </div>
         </div>

         {/* ── Right panel: message detail ── */}
         <div className={cn("flex-1 flex flex-col min-w-0", selected ? "flex" : "hidden md:flex")}>
            {selected ? (
               <MessageDetail
                  message={selected}
                  onClose={() => setSelected(null)}
                  onMarkRead={onMarkRead}
                  onDelete={(id) => {
                     onDelete?.(id);
                     setSelected(null);
                  }}
                  onReply={onReply}
               />
            ) : (
               <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-700">
                  <Mail className="w-12 h-12" />
                  <p className="text-sm">Select a message to read</p>
               </div>
            )}
         </div>
      </div>
   );
}
