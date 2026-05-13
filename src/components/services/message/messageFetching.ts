"use server";

import { serverFetch } from "@/lib/server-fetch";
// import { revalidateTag } from "next/cache";

interface IMassageFormData {
   name: string;
   email?: string;
   phone?: string;
   subject: string;
   message: string;
   description?: string;
}

export async function createMassageAction(data: IMassageFormData) {
   try {
      // Validate that data exists and has required fields
      if (!data || !data.name || !data.subject || !data.message) {
         console.error("Validation failed:", data);
         return {
            success: false,
            message: "Missing required fields: name, subject, and message are required",
         };
      }

      // Map message to description for backend API
      const backendData = {
         name: data.name,
         email: data.email,
         phone: data.phone,
         subject: data.subject,
         description: data.message, // Map message to description
      };

      console.log("Sending massage data:", backendData);

      const response = await serverFetch.post("/massage/create", {
         headers: {
            "Content-Type": "application/json", // ← add this
         },
         body: JSON.stringify(backendData),
      });

      const result = await response.json();
      console.log("Response from /massage/create:", result);

      return result;
   } catch (error: any) {
      console.error("Error creating massage:", error);
      return {
         success: false,
         message: process.env.NODE_ENV === "production" ? "Failed to create message" : error.message,
      };
   }
}

export async function getMassages(queryString?: string) {
   try {
      const response = await serverFetch.get(`/massage/all${queryString ? `?${queryString}` : "?sortBy=createdAt&sortOrder=desc"}`, {
         next: {
            tags: ["my-massages"],
            
         },
      });
      const result = await response.json();
      console.log(result, "result check")
      return result;
   } catch (error: any) {
      console.error("Error fetching massages:", error);
      return {
         success: false,
         data: [],
         message: process.env.NODE_ENV === "development" ? error.message : "Failed to fetch massages",
      };
   }
}

export async function getMyMessages() {
   try {
      // const authHeader = await getAuthHeader();
      const res = await serverFetch.get(`/massage/my-messages`, {
           
         next: { tags: ["my-messages"], revalidate: 0 },
      });
      const result = await res.json();
      return result;
   } catch (error: any) {
      return {
         success: false,
         message: process.env.NODE_ENV === "development" ? error.message : "Failed to fetch messages",
      };
   }
}
