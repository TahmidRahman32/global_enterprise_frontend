// lib/transformInbox.ts
import { MassageRecord, Conversation } from "@/Types/inbox";

function getInitials(name: string): string {
   return name
      .trim()
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0].toUpperCase())
      .join("");
}

function formatTimestamp(iso: string): string {
   const date = new Date(iso);
   const now = new Date();
   const isToday = date.toDateString() === now.toDateString();

   if (isToday) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
   }

   return date.toLocaleDateString([], { month: "short", day: "numeric" });
}

export function transformMassagesToConversations(records: MassageRecord[]): Conversation[] {
   return records.map((record) => ({
      id: record.id,
      name: record.name,
      email: record.email ?? "",
      phone: record.phone ?? "",
      subject: record.subject,
      avatarInitials: getInitials(record.name),
      avatarUrl: record.user?.profilePhoto ?? undefined,
      lastMessage: record.description,
      timestamp: formatTimestamp(record.createdAt),
      messages: [
         {
            // The original message from the sender
            id: record.id,
            text: record.description,
            sender: "them",
            timestamp: formatTimestamp(record.createdAt),
         },
      ],
   }));
}
