"use server";
import { serverFetch } from "@/lib/server-fetch";
import { ActionResult, IUpdateServicePayload } from "@/Types/service";
import { serviceSchema } from "@/zod/service.validation";
import { revalidatePath } from "next/cache";

export const saveService = async (prevState: any, formData: FormData) => {
   const rawData = {
      icon: formData.get("icon"),
      status: formData.get("status"),
      title: formData.get("title"),
      description: formData.get("description"),
   };

   const parsed = serviceSchema.safeParse(rawData);
   // console.log(parsed, "validation data");

   if (!parsed.success) {
      return {
         success: false,
         errors: parsed.error.flatten().fieldErrors,
      };
   }

   try {
      const response = await serverFetch.post("/service/create", {
         body: JSON.stringify(parsed.data),
         headers: {
            "Content-Type": "application/json",
         },
      });

      const result = await response.json();
      // console.log(result);

      return result;
   } catch (error) {
      console.error(error);

      return {
         success: false,
         errors: {
            global: "Something went wrong",
         },
      };
   }
};

export const getServices = async () => {
   try {
      const response = await serverFetch.get("/service/all");
      return await response.json();
   } catch (error) {
      console.error("Failed to fetch services:", error);
      throw error;
   }
};

// export const updateServiceStatus = async (id: string, status: "ACTIVE" | "INACTIVE") => {
//    try {
//       const response = await serverFetch.patch(`/service/status/${id}`, {
//          body: JSON.stringify({ status }),
//          headers: {
//             "Content-Type": "application/json",
//          },
//       });

//       return await response.json();
//    } catch (error) {
//       console.error("Failed to update status:", error);
//       throw error;
//    }
// };

export async function updateServiceStatus(payload: IUpdateServicePayload): Promise<ActionResult> {
   try {
      const { id, ...body } = payload;

      if (!id) return { success: false, message: "Service ID is required." };
      if (body.title !== undefined && body.title.trim().length < 2) {
         return { success: false, errors: { title: "Title must be at least 2 characters." } };
      }

      const res = await serverFetch.patch(`/service/${id}`, {
         body: JSON.stringify(body),
      });

      const result = await res.json().catch(() => ({}));
      // console.log(result, "update")

      if (!res.ok) {
         return {
            success: false,
            message: result?.message ?? `Update failed (${res.status})`,
         };
      }

      revalidatePath("/admin/services");
      return { success: true, message: "Service updated successfully.", data: result };
   } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      const isNetwork = msg.includes("fetch") || msg.includes("abort") || msg.includes("network");
      return {
         success: false,
         message: isNetwork ? "Cannot connect to server. Please check your connection and try again." : `Update failed: ${msg}`,
      };
   }
}

export async function deleteService(id: string): Promise<ActionResult> {
   // console.log(id, "Id")
   try {
      if (!id) return { success: false, message: "Service ID is required." };

      const res = await serverFetch.delete(`/service/delete/${id}`);

      if (res.status === 204) {
         revalidatePath("/admin/services");
         return { success: true, message: "Service deleted successfully." };
      }

      const result = await res.json().catch(() => ({}));
      console.log(result,"result")

      if (!res.ok) {
         return {
            success: false,
            message: result?.message ?? `Delete failed (${res.status})`,
         };
      }

      revalidatePath("/admin/services");
      return { success: true, message: "Service deleted successfully.", data: result };
   } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      const isNetwork = msg.includes("fetch") || msg.includes("abort") || msg.includes("network");
      return {
         success: false,
         message: isNetwork ? "Server is waking up — please try again in a moment." : `Delete failed: ${msg}`,
      };
   }
}