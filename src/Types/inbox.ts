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
