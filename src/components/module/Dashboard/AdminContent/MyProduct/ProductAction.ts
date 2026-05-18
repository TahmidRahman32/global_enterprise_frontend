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
   console.log(id)
   const res = await serverFetch.delete(`/product/${id}`, {});

   const result = await res.json();
   console.log(result,"testing delete product")
  

   if (!res.ok) {
      throw new Error(result.message ?? `Delete failed (${res.status})`);
   }

   return result;
}

// src/components/module/Dashboard/AdminContent/MyProduct/ProductAction.ts
// export async function deleteProduct(id: string) {
//   try {
//     const response = await serverFetch.delete(`/product/${id}`, {

//     });
//     console.log(response, "res")

//     if (!response.ok) {
//       // Handle 404, 500, etc.
//       const errorData = await response.json().catch(() => ({}));
//       console.log(errorData)
//       return { 
//         success: false, 
//         status: response.status,
//         message: errorData.message || `HTTP ${response.status}` 
//       };
//     }

//     const data = await response.json();
//     return { success: true, data };
//   } catch (error) {
//     // Network errors (Failed to fetch, ERR_CONNECTION_CLOSED)
//     console.error('Network error in deleteProduct:', error);
//     return { 
//       success: false, 
//       isNetworkError: true,
//       message: 'Cannot reach server. Please check your internet connection and try again.' 
//     };
//   }
// }
