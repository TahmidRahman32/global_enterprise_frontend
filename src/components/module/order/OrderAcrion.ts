"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { orderSchema } from "@/zod/order.validation";

export async function submitOrder(prevState: any, formData: FormData) {
   const raw = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      company: formData.get("company") || "",
      address: formData.get("address"),
      productId: formData.get("productId"),
   };

   const validationResult = zodValidator(raw, orderSchema);
   if (!validationResult.success) {
      return {
         success: false,
         message: "Please fix the highlighted fields and try again.",
         errors: validationResult.errors,
      };
   }

   // TypeScript now knows validationResult.success is true, but data might still be optional.
   // Use non-null assertion because we know it's valid.
   const orderData = validationResult.data!;

   try {
      const response = await serverFetch.post("/order/create", {
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(orderData),
      });
      const responseData = await response.json();
      console.log(responseData);

      if (!response.ok || responseData?.success === false) {
         return {
            success: false,
            message: responseData?.message ?? "Failed to place order. Please try again later.",
            errors: responseData?.errors?.length > 0 ? responseData.errors : [{ field: "network", message: responseData?.message ?? "Failed to place order." }],
         };
      }

      return {
         success: true,
         data: responseData?.data ?? responseData,
      };
   } catch (error) {
      console.error(error);
      return {
         success: false,
         message: "Failed to place order. Please try again later.",
         errors: [{ field: "network", message: "Failed to place order" }],
      };
   }
}

export async function getAllOrders(queryString: string) {
   try {
      const response = await serverFetch.get(`/order/all${queryString ? `?${queryString}` : ""}`, {
      });
      const result = await response.json();
      return result;
   } catch (error: any) {
      console.log(error);
      return {
         success: false,
         message: `${process.env.NODE_ENV === "development" ? error.message : "order fetching field!!"}`,
      };
   }
}
export async function getMyOrders() {
   try {
      const response = await serverFetch.get("/order/my-order", {
         next: {
            tags: ["order-me"],
            revalidate: 600, // 10 minutes - products rarely change
         },
      });
      const result = await response.json();
      return result;
   } catch (error: any) {
      console.log(error);
      return {
         success: false,
         message: `${process.env.NODE_ENV === "development" ? error.message : "order fetching field!!"}`,
      };
   }
}



export async function UpdateStatusByOrder(id: string, payload: string) {
   console.log(id,payload)
   try {
      const response = await serverFetch.patch(`/order/${id}`, {
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ status: payload }),
      });
      const result = await response.json();
      console.log(result, "result");
      return result;
   } catch (error: any) {
      console.log(error);
      return {
         success: false,
         message: `${process.env.NODE_ENV === "development" ? error.message : "Something went wrong"}`,
      };
   }
}
