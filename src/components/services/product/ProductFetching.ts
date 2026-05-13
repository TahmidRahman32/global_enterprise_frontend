import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
// import { revalidateTag } from "next/cache";
import z from "zod";

const createProductZodSchema = z.object({
   name: z.string().min(1, "Name is required"),
   category: z.string().min(1, "Category is required"),
   price: z.number().min(1, "Price is required"),
   stock: z.number().min(1, "Stock is required"),
   brand: z.string().min(1, "Brand is required"),
   description: z.string().min(1, "Description is required"),
   note: z.string().optional(),
});

// export async function CreateProductFetching(prevState: any, fromData: FormData) {
//    try {
//       const getFormValue = (key: string): string => {
//          const value = fromData.get(key);
//          return value === null ? "" : value.toString();
//       };
//       const payload = {
//          name: getFormValue("name"),
//          category: getFormValue("category"),
//          price: parseFloat(getFormValue("price")), // Convert to number
//          stock: parseInt(getFormValue("stock"), 10), // Convert to number
//          brand: getFormValue("brand"),
//          description: getFormValue("description"),
//          note: getFormValue("note") || "", // Default to empty string if note is not provided
//       };

//       // const ValidateData = createProductZodSchema.safeParse(payload);

//       // if (!ValidateData.success) {
//       //    const errors: Record<string, string> = {};
//       //    ValidateData.error.issues.forEach((err) => {
//       //       if (err.path[0]) {
//       //          errors[String(err.path[0])] = err.message;
//       //       }
//       //    });
//       //    return { errors, success: false };
//       // }

//       if (zodValidator(payload, createProductZodSchema).success === false) {
//          return zodValidator(payload, createProductZodSchema);
//       }
//       const ValidateData = zodValidator(payload, createProductZodSchema);
//   console.log(ValidateData, "ValidateData")

//       const newFormData = new FormData();
//       newFormData.append("data", JSON.stringify(ValidateData.success ? ValidateData.data : payload)); // Append the validated data or original payload as JSON string
//       if (newFormData.get("file")) {
//          newFormData.append("file", newFormData.get("file") as Blob);
//       }

//       console.log(newFormData, "newFormData")

//       const response = await serverFetch.post("/product/create", {
//          body: newFormData,

//       });

//       const result = await response.json();
//       console.log(result);

//       // if (!response.ok) {
//       //    throw new Error(result.message || "Failed to create product");
//       // }

//       return result;
//    } catch (error) {
//       console.error("Error creating product:", error);
//       return {
//          success: false,
//          message: error instanceof Error ? error.message : "An unknown error occurred",
//       };
//    } // Rethrow the error to be handled by the caller
// }

// export async function CreateProductFetching(prevState: any, fromData: FormData) {
//    try {
//       const payload = {
//          name: fromData.get("name")?.toString() || "",
//          category: fromData.get("category")?.toString() || "",
//          price: parseFloat(fromData.get("price")?.toString() || "0"),
//          stock: parseInt(fromData.get("stock")?.toString() || "0", 10),
//          brand: fromData.get("brand")?.toString() || "",
//          description: fromData.get("description")?.toString() || "",
//          note: fromData.get("note")?.toString() || "",
//       };
//       {
//       }

//       const validation = zodValidator(payload, createProductZodSchema);
//       if (!validation.success) {
//          return validation; // { success: false, errors: {...} }
//       }

//       const formDataToSend = new FormData();
//       formDataToSend.append("data", JSON.stringify(validation.data));

//       const file = fromData.get("file");
//       if (file instanceof File && file.size > 100 * 1024) {
//          return {
//             success: false,
//             message: `Image size (${(file.size / 1024).toFixed(1)} KB) exceeds 100 KB limit. Please upload a smaller image.`,
//          };
//       } else if (file instanceof File && file.size > 0) {
//          formDataToSend.append("file", file);
//       }

//       const response = await serverFetch.post("/product/create", {
//          body: formDataToSend,
//       });

//       // Safely parse JSON response
//       const text = await response.text();
//       let result;
//       try {
//          result = JSON.parse(text);
//          console.log(result, " up Result");
//       } catch {
//          console.error("Non-JSON response:", text.slice(0, 500));
//          return { success: false, message: "Server returned invalid response format" };
//       }
//       console.log(response, "response");

//       if (!response.ok) {
//          return { success: false, message: result.message || "Request failed" };
//       }

//       console.log(result, "result");

//       return result; // assuming { success: true, ... }
//    } catch (error) {
//       console.error("Error creating product:", error);
//       return {
//          success: false,
//          message: error instanceof Error ? error.message : "Unknown error",
//       };
//    }
// }

// Helper: compress image and return Base64 string
// async function fileToCompressedBase64(file: File, maxSizeKB = 90): Promise<string> {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = (e) => {
//       const img = new Image();
//       img.src = e.target?.result as string;
//       img.onload = () => {
//         const canvas = document.createElement('canvas');
//         let width = img.width;
//         let height = img.height;
//         const maxDim = 800;
//         if (width > height && width > maxDim) {
//           height = (height * maxDim) / width;
//           width = maxDim;
//         } else if (height > maxDim) {
//           width = (width * maxDim) / height;
//           height = maxDim;
//         }
//         canvas.width = width;
//         canvas.height = height;
//         const ctx = canvas.getContext('2d');
//         ctx?.drawImage(img, 0, 0, width, height);

//         canvas.toBlob(
//           (blob) => {
//             if (!blob) return reject(new Error('Compression failed'));
//             const base64Reader = new FileReader();
//             base64Reader.readAsDataURL(blob);
//             base64Reader.onload = () => {
//               // Remove the "data:image/jpeg;base64," prefix
//               const base64 = (base64Reader.result as string).split(',')[1];
//               resolve(base64);
//             };
//             base64Reader.onerror = reject;
//           },
//           'image/jpeg',
//           0.7 // quality 70%
//         );
//       };
//       img.onerror = reject;
//     };
//     reader.onerror = reject;
//   });
// }

// export async function CreateProductFetching(prevState: any, fromData: FormData) {
//   try {
//     // 1. Extract form data
//     const payload = {
//       name: fromData.get("name")?.toString() || "",
//       category: fromData.get("category")?.toString() || "",
//       price: parseFloat(fromData.get("price")?.toString() || "0"),
//       stock: parseInt(fromData.get("stock")?.toString() || "0", 10),
//       brand: fromData.get("brand")?.toString() || "",
//       description: fromData.get("description")?.toString() || "",
//       note: fromData.get("note")?.toString() || "",
//     };
//     console.log(payload,"payload")

//     // 2. Validate with Zod
//     const validation = zodValidator(payload, createProductZodSchema);
//     if (!validation.success) {
//       return validation;
//     }

//     console.log(validation, "validation payload")

//     // 3. Handle the file – compress and convert to Base64
//     const file = fromData.get("file");
//     if (file instanceof File && file.size > 0) {
//       try {
//         // Check original size
//         if (file.size > 100 * 1024) {
//           console.warn(`File size ${(file.size / 1024).toFixed(1)} KB, compressing...`);
//         }
//         const base64Image = await fileToCompressedBase64(file, 90);
//         const imageSizeKB = (base64Image.length * 0.75) / 1024; // approximate
//         if (imageSizeKB > 95) {
//           return {
//             success: false,
//             message: `Image too large after compression (${imageSizeKB.toFixed(1)} KB). Please choose a smaller image.`,
//           };
//         }
//         (payload as any).picture = base64Image;
//       } catch (err) {
//         console.error("Error processing image:", err);
//         return {
//           success: false,
//           message: "Failed to process image. Please try a different image.",
//         };
//       }
//     } else {
//       return { success: false, message: "No file uploaded" };
//     }

//     // 4. Send as JSON (not FormData)
//     const response = await serverFetch.post("/product/create", {
//       body: JSON.stringify(payload),
//     });

//     // 5. Parse response safely
//     const text = await response.text();
//     let result;
//     try {
//       result = JSON.parse(text);
//     } catch {
//       console.error("Non-JSON response:", text.slice(0, 500));
//       return { success: false, message: "Server returned invalid response format" };
//     }

//     // 6. Handle HTTP errors
//     if (!response.ok) {
//       // Special handling for payload too large (if backend returns that)
//       if (response.status === 413 || result.error?.type === 'entity.too.large') {
//         return {
//           success: false,
//           message: "Product image is too large even after compression. Please use a smaller image (under 100 KB).",
//         };
//       }
//       // Handle the JSON parse error if backend misbehaves
//       if (result.message?.includes('Unexpected token')) {
//         return {
//           success: false,
//           message: "Server configuration error. Please contact support.",
//         };
//       }
//       return { success: false, message: result.message || "Request failed" };
//     }

//     return result;
//   } catch (error) {
//     console.error("Error creating product:", error);
//     return {
//       success: false,
//       message: error instanceof Error ? error.message : "Unknown error",
//     };
//   }
// }

// async function fileToCompressedBase64(file: File, targetSizeKB = 80): Promise<string> {
//    return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = (e) => {
//          const img = new Image();
//          img.src = e.target?.result as string;
//          img.onload = () => {
//             const canvas = document.createElement("canvas");
//             let { width, height } = img;
//             const maxDim = 600; // smaller than 800 to reduce size
//             if (width > height && width > maxDim) {
//                height = (height * maxDim) / width;
//                width = maxDim;
//             } else if (height > maxDim) {
//                width = (width * maxDim) / height;
//                height = maxDim;
//             }
//             canvas.width = width;
//             canvas.height = height;
//             const ctx = canvas.getContext("2d");
//             ctx?.drawImage(img, 0, 0, width, height);

//             let quality = 0.6; // start lower
//             const tryCompress = (q: number) => {
//                canvas.toBlob(
//                   (blob) => {
//                      if (!blob) return reject(new Error("Compression failed"));
//                      const base64Reader = new FileReader();
//                      base64Reader.readAsDataURL(blob);
//                      base64Reader.onload = () => {
//                         const base64 = (base64Reader.result as string).split(",")[1];
//                         const sizeKB = (base64.length * 0.75) / 1024; // approximate decoded size
//                         if (sizeKB > targetSizeKB && q > 0.2) {
//                            // Retry with lower quality
//                            tryCompress(q - 0.1);
//                         } else {
//                            resolve(base64);
//                         }
//                      };
//                      base64Reader.onerror = reject;
//                   },
//                   "image/jpeg",
//                   q,
//                );
//             };
//             tryCompress(quality);
//          };
//          img.onerror = reject;
//       };
//       reader.onerror = reject;
//    });
// }

// export async function CreateProductFetching(prevState: any, fromData: FormData) {
//    try {
//       // ... (extract and validate payload as before)

//       // const payload = {
//       //    name: fromData.get("name") as string,
//       //    category: fromData.get("category") as string,
//       //    price: parseFloat(fromData.get("price") as string), // Convert to number
//       //    stock: parseInt(fromData.get("stock") as string, 10), // Convert to number
//       //    brand: fromData.get("brand") as string,
//       //    description: fromData.get("description") as string,
//       //    note: fromData.get("note") || "", // Default to empty string if note is not provided
//       // };
//          const payload = {
//             name: fromData.get("name")?.toString() || "",
//             category: fromData.get("category")?.toString() || "",
//             price: parseFloat(fromData.get("price")?.toString() || "0"),
//             stock: parseInt(fromData.get("stock")?.toString() || "0", 10),
//             brand: fromData.get("brand")?.toString() || "",
//             description: fromData.get("description")?.toString() || "",
//             note: fromData.get("note")?.toString() || "",
//          };
//       const file = fromData.get("file");
//       if (!(file instanceof File) || file.size === 0) {
//          toast.error("Please select an image file");
//          return { success: false, message: "No file uploaded" };
//       }

//       // Show a loading toast while compressing (optional)
//       const compressToastId = toast.loading("Compressing image...");

//       let base64Image: string;
//       try {
//          base64Image = await fileToCompressedBase64(file, 85); // aim for 85 KB
//          const approxSizeKB = (base64Image.length * 0.75) / 1024;
//          if (approxSizeKB > 95) {
//             toast.dismiss(compressToastId);
//             toast.error(`Image still too large (${approxSizeKB.toFixed(1)} KB). Please choose a smaller image.`);
//             return { success: false, message: "Image too large after compression" };
//          }
//          toast.dismiss(compressToastId);
//          toast.success("Image compressed successfully");
//       } catch (err) {
//          toast.dismiss(compressToastId);
//          toast.error("Failed to process image. Try a different image.");
//          return { success: false, message: "Image processing failed" };
//       }

//       (payload as any).picture = base64Image;

//       // Send as JSON
//       const response = await serverFetch.post("/product/create", {
//          headers: { "Content-Type": "application/json" },
//          body: JSON.stringify(payload),
//       });

//       const text = await response.text();
//       let result;
//       try {
//          result = JSON.parse(text);
//       } catch (e) {
//          console.error("Non-JSON response:", text.slice(0, 200));
//          toast.error("Server returned an invalid response. Please try again.");
//          return { success: false, message: "Invalid server response" };
//       }

//       if (!response.ok) {
//          if (response.status === 413 || result.error?.type === "entity.too.large") {
//             toast.error("Image too large even after compression. Please use a smaller image (<100 KB).");
//          } else {
//             toast.error(result.message || "Request failed");
//          }
//          return { success: false, message: result.message || "Request failed" };
//       }

//       toast.success("Product created successfully!");
//       return result;
//    } catch (error) {
//       console.error("Error creating product:", error);
//       toast.error(error instanceof Error ? error.message : "Unknown error");
//       return { success: false, message: error instanceof Error ? error.message : "Unknown error" };
//    }
// }

/* eslint-disable @typescript-eslint/no-explicit-any */

export async function CreateProductFetching(_prevState: any, formData: FormData) {
   const validationPayload = {
      name: formData.get("name"),
      category: formData.get("category"),
      price: parseFloat(formData.get("price") as string), // Convert to number
      stock: parseInt(formData.get("stock") as string, 10), // Convert to number
      brand: formData.get("brand"),
      description: formData.get("description"),
      note: formData.get("note") || "",
      file: formData.get("file") as File,
   };

   const validatedPayload = zodValidator(validationPayload, createProductZodSchema);
   // console.log(validatedPayload)

   if (!validatedPayload.success && validatedPayload.errors) {
      return {
         success: false,
         message: "Validation failed",
         formData: validationPayload,
         errors: validatedPayload.errors,
      };
   }
   console.log(validatedPayload, "validatedPayload-success");

   if (!validatedPayload.data) {
      return {
         success: false,
         message: "Validation failed",
         formData: validationPayload,
      };
   }
   console.log(validatedPayload, "validatedPayload-data-error");

   const newFormData = new FormData();
   newFormData.append("data", JSON.stringify(validatedPayload.data));
   newFormData.append("file", formData.get("file") as Blob);

   // console.log(newFormData.get("data"), "Prepared FormData to send");

   try {
      const response = await serverFetch.post("/product/create", {
         body: newFormData,
      });

      const result = await response.json();

      if (result.success) {
      // revalidateTag("products-list", "max");
      }

      return result;
   } catch (error: any) {
      console.log(error);
      return {
         success: false,
         message: `${process.env.NODE_ENV === "development" ? error.message : "Something went wrong"}`,
         formData: validationPayload,
      };
   }
}

export async function getProducts() {
   try {
      const response = await serverFetch.get("/product/all", {
         cache: "force-cache",
         next: {
            tags: ["products-list"],
         },
      });
      const result = await response.json();
      return result;
   } catch (error: any) {
      console.log(error);
      return {
         success: false,
         message: `${process.env.NODE_ENV === "development" ? error.message : "Something went wrong"}`,
      };
   }
}

export async function getProductById(id: string) {
   try {
      const response = await serverFetch.get(`/product/${id}`, {
         next: {
            tags: [`product-list`]// 10 minutes - product details rarely change
         },
      });
      const result = await response.json();
      return result;
   } catch (error: any) {
      console.log(error);
      return {
         success: false,
         message: `${process.env.NODE_ENV === "development" ? error.message : "Something went wrong"}`,
      };
   }
}
