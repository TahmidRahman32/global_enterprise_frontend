"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
// import Inbox, { Message } from "./Inbox";
// import ReplyDialog from "./ReplyDialog";
// import { markMessageAsRead, deleteMessage } from "./inboxActions";
import { Message } from "./message.interface";
import ReplyDialog from "./Replydialog";
import Inbox from "./MainInbox";

interface InboxClientProps {
   messages: Message[];
}

export default function InboxClient({ messages }: InboxClientProps) {
   const router = useRouter();
   const [, startTransition] = useTransition();
   const [replyTarget, setReplyTarget] = useState<Message | null>(null);

   const markMessageAsRead = (id:string)=>{
      console.log("add",id)
   }

   // ── Mark as read ────────────────────────────────────────────────────────────
   const handleMarkRead = async (id: string) => {
      const result = await markMessageAsRead(id);
      // if (result.success) {
      //    toast.success("Marked as read");
      //    startTransition(() => router.refresh());
      // } else {
      //    toast.error(result.message || "Failed to mark as read");
      // }
   };

   // ── Delete ──────────────────────────────────────────────────────────────────
   const handleDelete = async (id: string) => {
      const confirmed = window.confirm("Delete this message? This cannot be undone.");
      if (!confirmed) return;
 console.log(id,"delete")
      // const result = await deleteMessage(id);
      // if (result.success) {
      //    toast.success("Message deleted");
      //    startTransition(() => router.refresh());
      // } else {
      //    toast.error(result.message || "Failed to delete message");
      // }
   };

   // ── Refresh ─────────────────────────────────────────────────────────────────
   const handleRefresh = () => {
      startTransition(() => router.refresh());
      toast.info("Refreshing...");
   };

   return (
      <>
         <Inbox messages={messages} onMarkRead={handleMarkRead} onDelete={handleDelete} onReply={(message) => setReplyTarget(message)} onRefresh={handleRefresh} />

         {/* Reply dialog — mounts when a message is selected for reply */}
         {replyTarget && <ReplyDialog message={replyTarget} onClose={() => setReplyTarget(null)} />}
      </>
   );
}

// ============================================================================
// SERVER PAGE  — src/app/(dashboardLayout)/user/inbox/page.tsx
// ============================================================================
//
// import { getMyMessages } from "@/components/services/massage/inboxActions";
// import InboxClient from "@/components/module/Inbox/InboxClient";
//
// export default async function InboxPage() {
//   const result = await getMyMessages();
//   const messages = result?.data ?? [];
//
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-10 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-100">My Inbox</h1>
//           <p className="text-gray-400 mt-1 text-sm">Your messages and conversations</p>
//         </div>
//         <InboxClient messages={messages} />
//       </div>
//     </div>
//   );
// }
