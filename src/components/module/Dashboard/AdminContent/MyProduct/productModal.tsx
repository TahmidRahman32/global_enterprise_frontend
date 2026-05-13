"use client";

import { useState } from "react";
import { CATEGORY_COLORS, Product } from "./product.interface";
import { TrashIcon } from "lucide-react";
import { deleteProduct } from "./ProductAction";
// import { updateProduct, deleteProduct } from "@/lib/api/products";

const CloseIcon = () => (
   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
   </svg>
);

// ─── Modal ────────────────────────────────────────────────────────────────────

interface ModalProps {
   product: Product;
   mode: "view" | "edit" | "delete";
   onClose: () => void;
   onSave?: (updated: Product) => void;
   onDelete?: (id: string) => void;
}

export function Modal({ product, mode, onClose, onSave, onDelete }: ModalProps) {
   const [form, setForm] = useState<Product>({ ...product });
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const handleChange = (field: keyof Product, value: string | number | boolean) => {
      setForm((prev) => ({ ...prev, [field]: value }));
   };

   // ── Save (edit mode) ────────────────────────────────────────────────────────
   const handleSave = async () => {
      setLoading(true);
      setError(null);
      try {
         // const { data } = await updateProduct(product.id, form);
         // if (data) {
         //    onSave?.(data); // propagate updated product to parent
         //    onClose();
         // }
      } catch (err) {
         setError(err instanceof Error ? err.message : "Failed to save.");
      } finally {
         setLoading(false);
      }
   };

   // ── Delete (delete mode) ────────────────────────────────────────────────────
   const handleDelete = async () => {
      setLoading(true);
      setError(null);
      try {
         await deleteProduct(product.id);
         onDelete?.(product.id); // propagate deletion to parent
         onClose();
      } catch (err) {
         setError(err instanceof Error ? err.message : "Failed to delete.");
      } finally {
         setLoading(false);
      }
   };

   const inputCls = "w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition";

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
         {/* Backdrop */}
         <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />

         {/* Panel */}
         <div className="relative bg-black rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            {/* Header */}
            <div className={`px-6 py-4 flex items-center justify-between border-b border-slate-100 ${mode === "delete" ? "bg-red-50" : "bg-blue-600"}`}>
               <h2 className="font-semibold text-slate-800 text-base">
                  {mode === "view" && "Product Details"}
                  {mode === "edit" && "Edit Product"}
                  {mode === "delete" && "Delete Product"}
               </h2>
               <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition p-1 rounded-lg hover:bg-slate-100">
                  <CloseIcon />
               </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5 max-h-[70vh] overflow-y-auto">
               {/* ── Error banner ───────────────────────────────────────────────── */}
               {error && <div className="mb-4 px-4 py-2 rounded-lg bg-red-100 text-red-700 text-sm">{error}</div>}

               {mode === "delete" ? (
                  <div className="text-center py-4">
                     <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                        <TrashIcon />
                     </div>
                     <p className="text-slate-200 font-medium mb-1">Delete &quot;{product.name}&quot;?</p>
                     <p className="text-slate-500 text-sm">This action cannot be undone. The product will be permanently removed.</p>
                  </div>
               ) : mode === "view" ? (
                  <div className="space-y-4">
                     <div className="flex items-start gap-4">
                        <img
                           src={product.picture}
                           alt={product.name}
                           onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://placehold.co/80x80/e2e8f0/94a3b8?text=IMG";
                           }}
                           className="w-20 h-20 rounded-xl object-cover border border-slate-200 shrink-0"
                        />
                        <div>
                           <p className="font-semibold text-slate-800 text-lg leading-tight">{product.name}</p>
                           <p className="text-slate-500 text-sm mt-0.5">{product.brand}</p>
                           <span className={`inline-block mt-2 text-xs font-medium px-2.5 py-0.5 rounded-full ${CATEGORY_COLORS[product.category] ?? "bg-slate-100 text-slate-600"}`}>{product.category}</span>
                        </div>
                     </div>
                     <div className="grid grid-cols-2 gap-3">
                        {[
                           ["SKU", product.sku],
                           ["Price", `৳ ${product.price.toLocaleString()}`],
                           ["Stock", product.stock],
                           ["Status", product.isActive ? "Active" : "Inactive"],
                           ["Order ID", product.orderId.slice(0, 16) + "…"],
                           ["Created", new Date(product.createdAt).toLocaleDateString()],
                        ].map(([label, val]) => (
                           <div key={String(label)} className="bg-slate-50 rounded-lg p-3">
                              <p className="text-xs text-slate-400 mb-0.5">{String(label)}</p>
                              <p className="text-sm font-medium text-slate-700">{String(val)}</p>
                           </div>
                        ))}
                     </div>
                     {product.description && (
                        <div className="bg-slate-50 rounded-lg p-3">
                           <p className="text-xs text-slate-400 mb-1">Description</p>
                           <p className="text-sm text-slate-600">{product.description}</p>
                        </div>
                     )}
                  </div>
               ) : (
                  /* EDIT FORM */
                  <div className="space-y-4">
                     <div className="grid grid-cols-2 gap-3">
                        <div>
                           <label className="text-xs font-medium text-slate-500 mb-1 block">Name</label>
                           <input className={inputCls} value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
                        </div>
                        <div>
                           <label className="text-xs font-medium text-slate-500 mb-1 block">Brand</label>
                           <input className={inputCls} value={form.brand} onChange={(e) => handleChange("brand", e.target.value)} />
                        </div>
                     </div>
                     <div className="grid grid-cols-2 gap-3">
                        <div>
                           <label className="text-xs font-medium text-slate-500 mb-1 block">Price (৳)</label>
                           <input type="number" className={inputCls} value={form.price} onChange={(e) => handleChange("price", Number(e.target.value))} />
                        </div>
                        <div>
                           <label className="text-xs font-medium text-slate-500 mb-1 block">Stock</label>
                           <input type="number" className={inputCls} value={form.stock} onChange={(e) => handleChange("stock", Number(e.target.value))} />
                        </div>
                     </div>
                     <div>
                        <label className="text-xs font-medium text-slate-500 mb-1 block">Category</label>
                        <select className={inputCls} value={form.category} onChange={(e) => handleChange("category", e.target.value)}>
                           {["Sticker", "Clothing", "Ribbon", "Printer", "Other"].map((c) => (
                              <option key={c} value={c}>
                                 {c}
                              </option>
                           ))}
                        </select>
                     </div>
                     <div>
                        <label className="text-xs font-medium text-slate-500 mb-1 block">SKU</label>
                        <input className={inputCls} value={form.sku} onChange={(e) => handleChange("sku", e.target.value)} />
                     </div>
                     <div>
                        <label className="text-xs font-medium text-slate-500 mb-1 block">Description</label>
                        <textarea rows={3} className={inputCls + " resize-none"} value={form.description} onChange={(e) => handleChange("description", e.target.value)} />
                     </div>
                     <div className="flex items-center gap-2">
                        <label className="text-xs font-medium text-slate-500">Active</label>
                        <button type="button" onClick={() => handleChange("isActive", !form.isActive)} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${form.isActive ? "bg-indigo-500" : "bg-slate-300"}`}>
                           <span
                              className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${form.isActive ? "translate-x-4.5" : "translate-x-1"}`}
                              style={{
                                 transform: form.isActive ? "translateX(1px)" : "translateX(3px)",
                              }}
                           />
                        </button>
                     </div>
                  </div>
               )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-blue-800 border-t border-slate-100 flex justify-end gap-2">
               <button onClick={onClose} disabled={loading} className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition disabled:opacity-50">
                  {mode === "view" ? "Close" : "Cancel"}
               </button>

               {mode === "edit" && (
                  <button onClick={handleSave} disabled={loading} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 flex items-center gap-2">
                     {loading ? (
                        <>
                           <span className="h-3.5 w-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                           Saving…
                        </>
                     ) : (
                        "Save Changes"
                     )}
                  </button>
               )}

               {mode === "delete" && (
                  <button onClick={handleDelete} disabled={loading} className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition disabled:opacity-50 flex items-center gap-2">
                     {loading ? (
                        <>
                           <span className="h-3.5 w-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                           Deleting…
                        </>
                     ) : (
                        "Delete"
                     )}
                  </button>
               )}
            </div>
         </div>
      </div>
   );
}
