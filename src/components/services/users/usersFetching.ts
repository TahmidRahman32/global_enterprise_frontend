"use server"
import { serverFetch } from "@/lib/server-fetch";

export async function getAllUsers(queryString?: string) {
   // console.log(queryString)
   try {
      const response = await serverFetch.get(`/user/all${queryString ? `?${queryString}` : ""}`, {});
      const result = await response.json();
      return result;
   } catch (error: any) {
      console.log(error);
      return {
         success: false,
         message: `${process.env.NODE_ENV === "development" ? error.message : "User fetching field!!"}`,
      };
   }
}

export async function UpdateStatusByUserId(id: string, payload: string) {
   console.log(payload, id);
   try {
      const response = await serverFetch.patch(`/user/update-status/${id}`, {
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ status: payload }),
      });
      const result = await response.json();
      console.log(response, "response");
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
