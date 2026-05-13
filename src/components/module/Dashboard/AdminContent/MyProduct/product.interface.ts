export interface Product {
   id: string;
   name: string;
   brand: string;
   category: string;
   description: string;
   dynamicFields: null | Record<string, string>;
   isActive: boolean;
   note: string | null;
   orderId: string;
   picture: string;
   price: number;
   sku: string;
   stock: number;
   createdAt: string;
   updatedAt: string;
}
export const CATEGORY_COLORS: Record<string, string> = {
   Sticker: "bg-amber-100 text-amber-700 border border-amber-200",
   Clothing: "bg-blue-100 text-blue-700 border border-blue-200",
   Ribbon: "bg-pink-100 text-pink-700 border border-pink-200",
   Printer: "bg-violet-100 text-violet-700 border border-violet-200",
   Other: "bg-slate-100 text-slate-600 border border-slate-200",
};
export type Category = "Sticker" | "Clothing" | "Ribbon" | "Printer" | "Other" | "All";

export const CATEGORIES: Category[] = ["All", "Sticker", "Clothing", "Ribbon", "Printer", "Other"];
