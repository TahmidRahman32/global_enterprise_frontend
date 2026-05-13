// lib/api/products.ts
// import { Product } from "@/product.interface"; // adjust path as needed

import { serverFetch } from "@/lib/server-fetch";
import { Product } from "./product.interface";

// ─── Shared response shape ────────────────────────────────────────────────────
export interface ApiResponse<T = void> {
   success: boolean;
   data?: T;
   message?: string;
}

// ─── Update a product (PUT /api/products/:id) ─────────────────────────────────
export async function updateProduct(id: string, payload: Partial<Product>): Promise<ApiResponse<Product>> {
   const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
   });

   const json: ApiResponse<Product> = await res.json();

   if (!res.ok) {
      throw new Error(json.message ?? `Update failed (${res.status})`);
   }

   return json;
}

// ─── Delete a product (DELETE /api/products/:id) ──────────────────────────────
export async function deleteProduct(id: string) {
   const res = await serverFetch.delete(`/product/${id}`, {});

   const result = await res.json();
  

   if (!res.ok) {
      throw new Error(result.message ?? `Delete failed (${res.status})`);
   }

   return result;
}
