
"use server";

import { serverFetch } from "@/lib/server-fetch";
// import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

export interface IOrderProduct {
   name: string;
   picture: string;
}

export interface IOrder {
   id: string;
   name: string;
   email: string;
   phone: string;
   company?: string;
   address: string;
   userId: string;
   status: "PENDING" | "COMPLETED" | "CANCELLED";
   product: IOrderProduct[];
   createdAt: string;
   updatedAt: string;
}

export interface IOrderMeta {
   total: number;
   limit: number;
   page: number;
}

export interface IOrdersResponse {
   success: boolean;

   meta: IOrderMeta;
   data: IOrder[];

   message?: string;
}

// async function getAuthHeader() {
//    const cookieStore = await cookies();
//    const token = cookieStore.get("accessToken")?.value; // ✅ change to match your cookie name
//    return token ? { Authorization: `Bearer ${token}` } : {};
// }

export async function getMyOrders(params?: { status?: string; searchTerm?: string; page?: number; limit?: number; sortBy?: string; sortOrder?: string }): Promise<IOrdersResponse> {
   try {
      // const authHeader = await getAuthHeader();

      // Build query string with all params
      const searchParams = new URLSearchParams();

      if (params?.status && params.status !== "ALL") {
         searchParams.set("status", params.status);
      }
      if (params?.searchTerm) {
         searchParams.set("searchTerm", params.searchTerm);
      }
      if (params?.page) {
         searchParams.set("page", String(params.page));
      }
      if (params?.limit) {
         searchParams.set("limit", String(params.limit));
      }
      if (params?.sortBy) {
         searchParams.set("sortBy", params.sortBy);
      }
      if (params?.sortOrder) {
         searchParams.set("sortOrder", params.sortOrder);
      }

      const query = searchParams.toString();

      const res = await serverFetch.get(`/order/my-orders${query ? `?${query}` : ""}`, {
         next: { tags: ["my-orders"], revalidate: 0 },
      });

      const result = await res.json();

      console.log("Orders response:", result); // ✅ debug log

      if (!res.ok) {
         return {
            success: false,
            meta: { total: 0, limit: 10, page: 1 },
            data: [],
            message: result.message || "Failed to fetch orders",
         };
      }

      return result;
   } catch (error: any) {
      console.error("Order fetch error:", error);
      return {
         success: false,
         meta: { total: 0, limit: 10, page: 1 },
         data: [],
         message: process.env.NODE_ENV === "development" ? error.message : "Failed to fetch orders",
      };
   }
}

export interface IOrderUpdatePayload {
   name: string;
   phone: string;
   address: string;
}

export async function updateMyOrder(id: string, payload: IOrderUpdatePayload) {
   try {
      const res = await serverFetch.patch(`/order/from/${id}`, {
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (result.success) {
         revalidateTag("my-orders","max");
      }

      return result;
   } catch (error: any) {
      return {
         success: false,
         message: process.env.NODE_ENV === "development" ? error.message : "Failed to update order",
      };
   }
}
