// ============================================================================
// Types
// ============================================================================

export type MassageStatus = "MASSAGE_SEND" | "MASSAGE_READ" | "MASSAGE_REPLIED";

export interface Message {
   id: string;
   name: string;
   email?: string;
   phone?: string;
   description: string;
   subject: string;
   userId?: string;
   adminId?: string;
   massageStatus: MassageStatus;
   createdAt: string;
   updatedAt: string;
}

export interface InboxProps {
   messages?: Message[];
   onMarkRead?: (id: string) => void;
   onDelete?: (id: string) => void;
   onReply?: (message: Message) => void;
   onRefresh?: () => void;
}
