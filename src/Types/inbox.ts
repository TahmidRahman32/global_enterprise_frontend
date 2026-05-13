// types/inbox.ts
export interface Message {
   id: string;
   text: string;
   sender: "me" | "them";
   timestamp: string;
}

export interface Conversation {
   id: string;
   name: string;
   avatarInitials: string;
   lastMessage: string;
   timestamp: string;
   messages: Message[];
}

// Types/inbox.ts

// ─── Raw API shape (from your backend) ───────────────────────────────────────
export interface MassageUser {
  id: string;
  name: string;
  email: string;
  profilePhoto: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  needPasswordChange: boolean;
  password: string; // won't be used in UI
}

export interface MassageRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  user?: MassageUser;
}

// ─── Inbox UI shape ───────────────────────────────────────────────────────────
export interface Message {
  id: string;
  text: string;
  sender: "me" | "them";
  timestamp: string;
}

export interface Conversation {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  avatarInitials: string;
  lastMessage: string;
  timestamp: string;
  avatarUrl?: string;
  messages: Message[];
}
