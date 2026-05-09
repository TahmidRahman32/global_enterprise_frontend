// "use server";

// import { revalidateTag } from "next/cache";
// import { cookies } from "next/headers";

// const API_BASE = process.env.NEXT_PUBLIC_API_URL;

// // ── helper: get auth token from cookies ──────────────────────────────────────
// async function getAuthHeader() {
//    const cookieStore = await cookies();
//    const token = cookieStore.get("token")?.value; // adjust key to match your auth setup
//    return token ? { Authorization: `Bearer ${token}` } : {};
// }

// // ============================================================================
// // Get current user's messages
// // ============================================================================
// export async function getMyMessages() {
//    try {
//       const authHeader = await getAuthHeader();
//       const res = await fetch(`${API_BASE}/massage/my-messages`, {
//          headers: { ...authHeader },
//          next: { tags: ["my-messages"], revalidate: 0 },
//       });
//       const result = await res.json();
//       return result;
//    } catch (error: any) {
//       return {
//          success: false,
//          message: process.env.NODE_ENV === "development" ? error.message : "Failed to fetch messages",
//       };
//    }
// }

// // ============================================================================
// // Mark a message as read  (MASSAGE_SEND → MASSAGE_READ)
// // ============================================================================
// export async function markMessageAsRead(id: string) {
//    try {
//       const authHeader = await getAuthHeader();
//       const res = await fetch(`${API_BASE}/massage/status/${id}`, {
//          method: "PATCH",
//          headers: {
//             "Content-Type": "application/json",
//             ...authHeader,
//          },
//          body: JSON.stringify({ massageStatus: "MASSAGE_READ" }),
//       });
//       const result = await res.json();

//       revalidateTag("my-messages"); // ✅ refresh inbox after update
//       return result;
//    } catch (error: any) {
//       return {
//          success: false,
//          message: process.env.NODE_ENV === "development" ? error.message : "Failed to update status",
//       };
//    }
// }

// // ============================================================================
// // Delete a message
// // ============================================================================
// export async function deleteMessage(id: string) {
//    try {
//       const authHeader = await getAuthHeader();
//       const res = await fetch(`${API_BASE}/massage/${id}`, {
//          method: "DELETE",
//          headers: { ...authHeader },
//       });
//       const result = await res.json();

//       revalidateTag("my-messages"); // ✅ refresh inbox after delete
//       return result;
//    } catch (error: any) {
//       return {
//          success: false,
//          message: process.env.NODE_ENV === "development" ? error.message : "Failed to delete message",
//       };
//    }
// }

// // ============================================================================
// // Send a reply  (creates a new message + marks original as MASSAGE_REPLIED)
// // ============================================================================
// export async function sendReply(payload: { originalMessageId: string; subject: string; description: string; name: string; email?: string; phone?: string }) {
//    try {
//       const authHeader = await getAuthHeader();

//       // 1. Send the reply message
//       const replyRes = await fetch(`${API_BASE}/massage/reply`, {
//          method: "POST",
//          headers: {
//             "Content-Type": "application/json",
//             ...authHeader,
//          },
//          body: JSON.stringify({
//             subject: payload.subject,
//             description: payload.description,
//             name: payload.name,
//             email: payload.email,
//             phone: payload.phone,
//          }),
//       });
//       const replyResult = await replyRes.json();

//       if (!replyResult.success) {
//          return replyResult; // surface the error
//       }

//       // 2. Mark the original message as replied
//       await fetch(`${API_BASE}/massage/status/${payload.originalMessageId}`, {
//          method: "PATCH",
//          headers: {
//             "Content-Type": "application/json",
//             ...authHeader,
//          },
//          body: JSON.stringify({ massageStatus: "MASSAGE_REPLIED" }),
//       });

//       revalidateTag("my-messages"); // ✅ refresh inbox
//       return { success: true, message: "Reply sent successfully" };
//    } catch (error: any) {
//       return {
//          success: false,
//          message: process.env.NODE_ENV === "development" ? error.message : "Failed to send reply",
//       };
//    }
// }
