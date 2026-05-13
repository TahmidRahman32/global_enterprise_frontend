"use client";

import { useState } from "react";
import { CATEGORIES, Category, CATEGORY_COLORS, Product } from "./product.interface";
import { Modal } from "./productModal";
import Link from "next/link";

// ─── Types ───────────────────────────────────────────────────────────────────





// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_PRODUCTS: Product[] = [
   {
      id: "3e7b9161-b65e-4058-89cb-b3104c58ce1c",
      name: "Tahmid Rahman",
      brand: "Global Enterprise",
      category: "Clothing",
      description: "dfgsdfgsdg dfgd erds",
      dynamicFields: null,
      isActive: true,
      note: null,
      orderId: "b16192cd-5e0b-4765-bcf2-587dba901877",
      picture: "https://res.cloudinary.com/dzyoln3u2/image/upload/v1777884165/348959958_767340848455629_1221980056712011193_n.jpg-1777884165154.jpg",
      price: 455,
      sku: "SKU-1777884165928",
      stock: 4,
      createdAt: "2026-05-04T08:42:46.814Z",
      updatedAt: "2026-05-07T12:33:55.000Z",
   },
   {
      id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      name: "Logo Sticker Pack",
      brand: "StickerPro",
      category: "Sticker",
      description: "High-quality vinyl stickers for branding",
      dynamicFields: null,
      isActive: true,
      note: "Best seller",
      orderId: "c27283de-6f1c-5876-cdg3-698ecb012988",
      picture: "https://res.cloudinary.com/dzyoln3u2/image/upload/v1777884165/348959958_767340848455629_1221980056712011193_n.jpg-1777884165154.jpg",
      price: 120,
      sku: "SKU-1234567890",
      stock: 50,
      createdAt: "2026-04-10T10:00:00.000Z",
      updatedAt: "2026-05-01T09:00:00.000Z",
   },
   {
      id: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
      name: "Satin Ribbon Roll",
      brand: "RibbonCo",
      category: "Ribbon",
      description: "Premium satin ribbon for gifting",
      dynamicFields: null,
      isActive: false,
      note: null,
      orderId: "d38394ef-7g2d-6987-deh4-709fdc123099",
      picture: "https://res.cloudinary.com/dzyoln3u2/image/upload/v1777884165/348959958_767340848455629_1221980056712011193_n.jpg-1777884165154.jpg",
      price: 80,
      sku: "SKU-0987654321",
      stock: 0,
      createdAt: "2026-03-22T14:30:00.000Z",
      updatedAt: "2026-04-15T11:45:00.000Z",
   },
   {
      id: "c3d4e5f6-a7b8-9012-cdef-123456789012",
      name: "Laser Printer X200",
      brand: "PrintMaster",
      category: "Printer",
      description: "High-speed commercial laser printer",
      dynamicFields: null,
      isActive: true,
      note: "Requires toner",
      orderId: "e49405fg-8h3e-7098-efi5-810ged234100",
      picture: "https://res.cloudinary.com/dzyoln3u2/image/upload/v1777884165/348959958_767340848455629_1221980056712011193_n.jpg-1777884165154.jpg",
      price: 12500,
      sku: "SKU-1122334455",
      stock: 8,
      createdAt: "2026-02-18T08:00:00.000Z",
      updatedAt: "2026-05-03T16:20:00.000Z",
   },
   {
      id: "d4e5f6a7-b8c9-0123-defa-234567890123",
      name: "Mystery Bundle",
      brand: "Misc Brand",
      category: "Other",
      description: "Assorted promotional items",
      dynamicFields: null,
      isActive: true,
      note: null,
      orderId: "f50516gh-9i4f-8109-fgj6-921hfe345211",
      picture: "https://res.cloudinary.com/dzyoln3u2/image/upload/v1777884165/348959958_767340848455629_1221980056712011193_n.jpg-1777884165154.jpg",
      price: 299,
      sku: "SKU-5566778899",
      stock: 15,
      createdAt: "2026-01-05T07:00:00.000Z",
      updatedAt: "2026-05-06T10:00:00.000Z",
   },
];





// ─── Icons (inline SVG) ───────────────────────────────────────────────────────

const EyeIcon = () => (
   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
   </svg>
);

const EditIcon = () => (
   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
   </svg>
);

const TrashIcon = () => (
   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
   </svg>
);

const SearchIcon = () => (
   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
   </svg>
);

const FilterIcon = () => (
   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
   </svg>
);

const ChevronDownIcon = () => (
   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
   </svg>
);

const PlusIcon = () => (
   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
   </svg>
);

export default function ProductTable({ product }: { product: Product[] }) {
   const [products, setProducts] = useState<Product[]>(product);
   const [search, setSearch] = useState("");
   const [categoryFilter, setCategoryFilter] = useState<Category>("All");
   const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
   const [modal, setModal] = useState<{
      product: Product;
      mode: "view" | "edit" | "delete";
   } | null>(null);

   const filtered = products.filter((p) => {
      const matchCat = categoryFilter === "All" || p.category === categoryFilter;
      const q = search.toLowerCase();
      const matchSearch = !q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
      return matchCat && matchSearch;
   });

   const allSelected = filtered.length > 0 && filtered.every((p) => selectedIds.has(p.id));

   // Handlers 
   const toggleSelect = (id: string) => {
      setSelectedIds((prev) => {
         const next = new Set(prev);
         next.has(id) ? next.delete(id) : next.add(id);
         return next;
      });
   };

   const toggleAll = () => {
      if (allSelected) {
         setSelectedIds((prev) => {
            const next = new Set(prev);
            filtered.forEach((p) => next.delete(p.id));
            return next;
         });
      } else {
         setSelectedIds((prev) => {
            const next = new Set(prev);
            filtered.forEach((p) => next.add(p.id));
            return next;
         });
      }
   };

   const handleSave = (updated: Product) => {
      setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      setModal(null);
   };

   const handleDelete = (id: string) => {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setSelectedIds((prev) => {
         const next = new Set(prev);
         next.delete(id);
         return next;
      });
      setModal(null);
   };

   const handleBulkDelete = () => {
      setProducts((prev) => prev.filter((p) => !selectedIds.has(p.id)));
      setSelectedIds(new Set());
   };

   // ── Render
   return (
      <div className="min-h-screen  p-6 font-sans">
         <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        .scrollbar-thin::-webkit-scrollbar { height: 4px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: #f1f5f9; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
      `}</style>

         {/* ── Page Header ── */}
         <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
            <div>
               <h1 className="text-2xl font-bold text-slate-200 tracking-tight">Products</h1>
               <p className="text-sm text-slate-500 mt-0.5">
                  {products.length} total · {filtered.length} shown
               </p>
            </div>
            <Link href={"/admin/dashboard/add-product"}>
               {" "}
               <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition shadow-sm shadow-indigo-200">
                  <PlusIcon />
                  Add Product
               </button>
            </Link>
         </div>

         {/* ── Toolbar ── */}
         <div className=" rounded-2xl border border-slate-200 shadow-sm mb-4 px-4 py-3 flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-[180px]">
               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <SearchIcon />
               </span>
               <input
                  type="text"
                  placeholder="Search by name, SKU, brand…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-300 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
               />
            </div>

            {/* Category Filter */}
            <div className="relative">
               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <FilterIcon />
               </span>
               <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value as Category)}
                  className="appearance-none pl-9 pr-8 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition cursor-pointer"
               >
                  {CATEGORIES.map((c) => (
                     <option key={c} value={c}>
                        {c === "All" ? "All Categories" : c}
                     </option>
                  ))}
               </select>
               <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <ChevronDownIcon />
               </span>
            </div>

            {/* Bulk delete */}
            {selectedIds.size > 0 && (
               <button onClick={handleBulkDelete} className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition">
                  <TrashIcon />
                  Delete ({selectedIds.size})
               </button>
            )}
         </div>

         {/* ── Table ── */}
         <div className=" rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto scrollbar-thin">
               <table className="w-full min-w-[800px] border-collapse text-sm">
                  <thead>
                     <tr className=" border-b border-slate-200">
                        <th className="px-4 py-3.5 text-left w-10">
                           <input type="checkbox" checked={allSelected} onChange={toggleAll} className="w-4 h-4 rounded border-slate-300 text-indigo-600 cursor-pointer accent-indigo-600" />
                        </th>
                        <th className="px-4 py-3.5 text-left font-semibold text-slate-200 text-xs uppercase tracking-wide">Product</th>
                        <th className="px-4 py-3.5 text-left font-semibold text-slate-200 text-xs uppercase tracking-wide">Category</th>
                        <th className="px-4 py-3.5 text-left font-semibold text-slate-200 text-xs uppercase tracking-wide">SKU</th>
                        <th className="px-4 py-3.5 text-right font-semibold text-slate-200 text-xs uppercase tracking-wide">Price</th>
                        <th className="px-4 py-3.5 text-center font-semibold text-slate-200 text-xs uppercase tracking-wide">Stock</th>
                        <th className="px-4 py-3.5 text-center font-semibold text-slate-200 text-xs uppercase tracking-wide">Status</th>
                        <th className="px-4 py-3.5 text-center font-semibold text-slate-200 text-xs uppercase tracking-wide">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {filtered.length === 0 ? (
                        <tr>
                           <td colSpan={8} className="py-16 text-center text-slate-400 text-sm">
                              No products found.
                           </td>
                        </tr>
                     ) : (
                        filtered.map((product) => (
                           <tr key={product.id} className={`group hover:bg-indigo-50/40 transition-colors ${selectedIds.has(product.id) ? "bg-indigo-50/60" : ""}`}>
                              {/* Checkbox */}
                              <td className="px-4 py-3.5">
                                 <input type="checkbox" checked={selectedIds.has(product.id)} onChange={() => toggleSelect(product.id)} className="w-4 h-4 rounded border-slate-300 accent-indigo-600 cursor-pointer" />
                              </td>

                              {/* Product */}
                              <td className="px-4 py-3.5">
                                 <div className="flex items-center gap-3">
                                    <img
                                       src={product.picture}
                                       alt={product.name}
                                       onError={(e) => {
                                          (e.target as HTMLImageElement).src = "https://placehold.co/44x44/e2e8f0/94a3b8?text=IMG";
                                       }}
                                       className="w-11 h-11 rounded-lg object-cover border border-slate-200 shrink-0"
                                    />
                                    <div>
                                       <p className="font-semibold text-slate-200 leading-tight">{product.name}</p>
                                       <p className="text-xs text-slate-500 mt-0.5">{product.brand}</p>
                                    </div>
                                 </div>
                              </td>

                              {/* Category */}
                              <td className="px-4 py-3.5">
                                 <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${CATEGORY_COLORS[product.category] ?? "bg-slate-100 text-slate-600"}`}>{product.category}</span>
                              </td>

                              {/* SKU */}
                              <td className="px-4 py-3.5 text-slate-200 font-mono text-xs">{product.sku}</td>

                              {/* Price */}
                              <td className="px-4 py-3.5 text-right font-semibold text-slate-100">৳ {product.price.toLocaleString()}</td>

                              {/* Stock */}
                              <td className="px-4 py-3.5 text-center">
                                 <span
                                    className={`inline-block font-semibold text-sm px-2 py-0.5 rounded-md ${product.stock === 0 ? "bg-red-100 text-red-600" : product.stock <= 5 ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}
                                 >
                                    {product.stock}
                                 </span>
                              </td>

                              {/* Status */}
                              <td className="px-4 py-3.5 text-center">
                                 <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${product.isActive ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${product.isActive ? "bg-emerald-500" : "bg-slate-400"}`} />
                                    {product.isActive ? "Active" : "Inactive"}
                                 </span>
                              </td>

                              {/* Actions */}
                              <td className="px-4 py-3.5">
                                 <div className="flex items-center justify-center gap-1.5">
                                    {/* View */}
                                    <button onClick={() => setModal({ product, mode: "view" })} title="View" className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-100 transition">
                                       <EyeIcon />
                                    </button>
                                    {/* Edit */}
                                    <button onClick={() => setModal({ product, mode: "edit" })} title="Edit" className="p-2 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-100 transition">
                                       <EditIcon />
                                    </button>
                                    {/* Delete */}
                                    <button onClick={() => setModal({ product, mode: "delete" })} title="Delete" className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-100 transition">
                                       <TrashIcon />
                                    </button>
                                 </div>
                              </td>
                           </tr>
                        ))
                     )}
                  </tbody>
               </table>
            </div>

            {/* Footer */}
            {filtered.length > 0 && (
               <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span>{selectedIds.size > 0 ? `${selectedIds.size} selected` : `Showing ${filtered.length} of ${products.length} products`}</span>
                  <span>Updated {new Date().toLocaleDateString()}</span>
               </div>
            )}
         </div>

         {/* ── Modal ── */}
         {modal && <Modal product={modal.product} mode={modal.mode} onClose={() => setModal(null)} onSave={handleSave} onDelete={handleDelete} />}
      </div>
   );
}
