"use client";
import React, { useActionState, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Camera, Loader2, X, DollarSign, Tag, Package, FileText, StickyNote, Layers, Briefcase, Hash, ArrowUpLeftFromSquareIcon } from "lucide-react";

// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";
import HeroImage from "@/assets/Hero-image.jpg";
import Link from "next/link";
import { CreateProductFetching } from "@/components/services/product/ProductFetching";
import { toast } from "sonner";
// import { CreateProductFetching } from "@/services/admin/productFetching";

// Categories for select
const categories = ["Sticker", "Clothing", "Ribbon", "Printer", "Other"];

const ProductForm: React.FC = () => {
   const [state, formAction, isPending] = useActionState(CreateProductFetching, null);
   const [imagePreview, setImagePreview] = useState<string | null>(null);
   
       console.log(state, "state")
   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (file) {
         // Client-side size check (optional, for better UX)
         if (file.size > 5 * 1024 * 1024) {
            alert("Image must be less than 5MB");
            e.target.value = "";
            return;
         }

         const reader = new FileReader();
         reader.onloadend = () => {
            setImagePreview(reader.result as string);
         };
         reader.readAsDataURL(file);
      } else {
         setImagePreview(null);
      }
   };
   //  console.log(file);
   const clearImage = () => {
      setImagePreview(null);
      const fileInput = document.getElementById("file") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
   };

     useEffect(() => {
        if (state?.success === false && state?.message) {
           toast.error(state.message);
        } else if (state?.success === true) {
           toast.success("Product created!");
        }
     }, [state]);


   return (
      <div>
         {/* <Link href="/admin/dashboard" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 mb-4">
            <Button variant="outline" className="mr-4">
               <ArrowUpLeftFromSquareIcon className="w-4 h-4 mr-2" />
               Back
            </Button>
         </Link> */}
         <div className="p-6 flex items-center justify-center">
            <div className="fixed inset-0 -z-10">
               <Image src={HeroImage} alt="Background" fill className="object-cover" priority sizes="100vw" quality={100} style={{ opacity: 0.2 }} />
               <div className="absolute inset-0 bg-black/50"></div>
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-6xl">
               <Card className="border-0 shadow-xl dark:bg-gray-800/10 backdrop-blur-sm">
                  <CardHeader className="space-y-1">
                     <div className="flex items-center space-x-2">
                        <Package className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                        <CardTitle className="text-2xl font-bold">Add New Product</CardTitle>
                     </div>
                     <CardDescription>Fill in the product details below. All fields marked with * are required.</CardDescription>
                  </CardHeader>

                  <CardContent>
                     <form action={formAction} className="space-y-6">
                        {/* Image Upload */}
                        <div className="space-y-2">
                           <Label htmlFor="picture" className="text-sm font-medium">
                              Product Image
                           </Label>
                           <div className="flex items-start gap-4">
                              <div className="relative">
                                 {imagePreview ? (
                                    <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-indigo-200 dark:border-indigo-800">
                                       <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                       <button type="button" onClick={clearImage} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition">
                                          <X className="w-3 h-3" />
                                       </button>
                                    </div>
                                 ) : (
                                    <div className="w-32 h-32 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center bg-gray-50 dark:bg-gray-700">
                                       <Camera className="w-8 h-8 text-gray-400" />
                                    </div>
                                 )}
                              </div>
                              <div className="flex-1">
                                 <Input id="file" name="file" type="file" accept="image/*" onChange={handleImageChange} className="cursor-pointer" />
                                 <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Recommended: Square image, max 5MB. PNG or JPG.</p>
                                 {state?.errors?.file && <p className="text-sm text-red-600 mt-1">{state.errors.file[0]}</p>}
                              </div>
                           </div>
                        </div>

                        <Separator />

                        {/* Two-column grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           {/* Name */}
                           <div className="space-y-2">
                              <Label htmlFor="name" className="text-sm font-medium flex items-center gap-1">
                                 <Tag className="w-4 h-4" /> Title <span className="text-red-500">*</span>
                              </Label>

                              <Input id="name" name="name" placeholder="e.g. Wireless Headphones" className="focus-visible:ring-indigo-500" defaultValue={state?.formData?.name || ""} />
                              {state?.errors?.name && <p className="text-sm text-red-600">{state.errors.name[0]}</p>}
                           </div>

                           {/* Brand */}
                           <div className="space-y-2">
                              <Label htmlFor="brand" className="text-sm font-medium flex items-center gap-1">
                                 <Briefcase className="w-4 h-4" /> Brand <span className="text-red-500">*</span>
                              </Label>
                              {/* defaultValue={state?.formData?.brand || ""} */}
                              <Input id="brand" name="brand" placeholder="e.g. Sony" className="focus-visible:ring-indigo-500" defaultValue={state?.formData?.brand || ""} />
                              {state?.errors?.brand && <p className="text-sm text-red-600">{state.errors.brand[0]}</p>}
                           </div>

                           {/* Price */}
                           <div className="space-y-2">
                              <Label htmlFor="price" className="text-sm font-medium flex items-center gap-1">
                                 <DollarSign className="w-4 h-4" /> Price <span className="text-red-500">*</span>
                              </Label>
                              <div className="relative">
                                 <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                 <Input id="price" name="price" type="number" step="0.01" min="0" placeholder="0.00" className="pl-9 focus-visible:ring-indigo-500" defaultValue={state?.formData?.price || ""} />
                              </div>
                              {state?.errors?.price && <p className="text-sm text-red-600">{state.errors.price[0]}</p>}
                           </div>

                           {/* Stock */}
                           <div className="space-y-2">
                              <Label htmlFor="stock" className="text-sm font-medium flex items-center gap-1">
                                 <Hash className="w-4 h-4" /> Stock <span className="text-red-500">*</span>
                              </Label>
                              <Input id="stock" name="stock" type="number" min="0" step="1" placeholder="0" className="focus-visible:ring-indigo-500" defaultValue={state?.formData?.stock || ""} />
                              {state?.errors?.stock && <p className="text-sm text-red-600">{state.errors.stock[0]}</p>}
                           </div>

                           {/* Category */}
                           <div className="space-y-2">
                              <Label htmlFor="category" className="text-sm font-medium flex items-center gap-1">
                                 <Layers className="w-4 h-4" /> Category <span className="text-red-500">*</span>
                              </Label>
                              <Select name="category" defaultValue={state?.formData?.category || ""}>
                                 <SelectTrigger id="category" className="focus:ring-indigo-500">
                                    <SelectValue placeholder="Select a category" />
                                 </SelectTrigger>
                                 <SelectContent>
                                    {categories.map((cat) => (
                                       <SelectItem key={cat} value={cat}>
                                          {cat}
                                       </SelectItem>
                                    ))}
                                 </SelectContent>
                              </Select>
                              {state?.errors?.category && <p className="text-sm text-red-600">{state.errors.category[0]}</p>}
                           </div>

                           {/* Note (optional) */}
                           <div className="space-y-2">
                              <Label htmlFor="note" className="text-sm font-medium flex items-center gap-1">
                                 <StickyNote className="w-4 h-4" /> Note (optional)
                              </Label>
                              <Input id="note" name="note" placeholder="Any additional notes" className="focus-visible:ring-indigo-500" defaultValue={state?.formData?.note || ""} />
                           </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                           <Label htmlFor="description" className="text-sm font-medium flex items-center gap-1">
                              <FileText className="w-4 h-4" /> Description <span className="text-red-500">*</span>
                           </Label>
                           <Textarea id="description" name="description" placeholder="Detailed product description..." rows={4} className="focus-visible:ring-indigo-500 resize-none" defaultValue={state?.formData?.description || ""} />
                           {state?.errors?.description && <p className="text-sm text-red-600">{state.errors.description[0]}</p>}
                        </div>

                        {/* Success message */}
                        {state?.success && (
                           <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                              <AlertDescription className="text-green-800 dark:text-green-300">{state.message || "Product added successfully!"}</AlertDescription>
                           </Alert>
                        )}

                        {/* Error message */}
                        {state?.success === false && state.errors && !state.errors.picture && (
                           <Alert variant="destructive">
                              <AlertDescription>{state.message || "Please fix the errors above and try again."}</AlertDescription>
                           </Alert>
                        )}

                        <Separator />

                        <div className="flex justify-end space-x-4">
                           <Button type="button" variant="outline" onClick={() => window.history.back()}>
                              Cancel
                           </Button>
                           <Button type="submit" disabled={isPending} className="min-w-[120px]">
                              {isPending ? (
                                 <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                 </>
                              ) : (
                                 "Save Product"
                              )}
                           </Button>
                        </div>
                     </form>
                  </CardContent>
               </Card>
            </motion.div>
         </div>
      </div>
   );
};

export default ProductForm;
