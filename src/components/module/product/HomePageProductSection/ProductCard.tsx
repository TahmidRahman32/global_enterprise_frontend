import Image from "next/image";
import { Product } from "./FallBackData";
import Link from "next/link";
const CARD_WIDTH = 320; 
export const ProductCard = ({ product }: { product: Product }) => (
   <div className="relative flex-none select-none" style={{ width: CARD_WIDTH }}>
      {/* Card shell */}
      <div className="group relative rounded-[20px] overflow-hidden bg-[#0d0d0d] border border-white/[0.07] shadow-2xl transition-all duration-500 hover:border-[#bd9520]/40 hover:shadow-[0_32px_64px_rgba(189,149,32,0.12)]">
         {/* Image */}
         <div className="relative w-full overflow-hidden" style={{ height: 300 }}>
            <Image src={product.picture} alt={product.name} fill draggable={false} className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-108" sizes="320px" />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/20 to-transparent" />

            {/* Badge */}
            {product.badge && <span className="absolute top-4 left-4 rounded-full bg-[#bd9520] px-3 py-0.5 text-[10px] font-['Montserrat',sans-serif] font-bold uppercase tracking-[0.18em] text-white shadow-lg">{product.badge}</span>}
         </div>

         {/* Content */}
         <div className="px-6 pt-4 pb-6">
            <h3 className="font-['Cormorant_Garamond',Georgia,serif] text-xl font-semibold leading-tight text-white line-clamp-1">{product.name}</h3>
            {product.description && <p className="mt-1.5 text-[13px] font-['Montserrat',sans-serif] font-light leading-relaxed text-white/45 line-clamp-2">{product.description}</p>}

            <div className="mt-5 flex items-center justify-between">
               <span className="font-['Cormorant_Garamond',Georgia,serif] text-2xl font-bold text-[#bd9520]">${product.price.toFixed(2)}</span>
               <Link href={`/product/${product.id}`}>
                  <button className="group/btn relative overflow-hidden rounded-full border border-[#bd9520]/50 px-5 py-2 text-xs font-['Montserrat',sans-serif] font-semibold uppercase tracking-[0.15em] text-[#bd9520] transition-all duration-300 hover:border-[#bd9520] hover:text-white">
                     {/* Fill on hover */}
                     <span className="absolute inset-0 -translate-x-full bg-[#bd9520] transition-transform duration-300 ease-out group-hover/btn:translate-x-0" />
                     <span className="relative">Shop Now</span>
                  </button>
               </Link>
            </div>
         </div>

         {/* Decorative corner glint */}
         <div className="pointer-events-none absolute top-0 right-0 h-24 w-24 overflow-hidden">
            <div className="absolute -top-12 -right-12 h-24 w-24 rotate-45 bg-[#bd9520]/8 group-hover:bg-[#bd9520]/15 transition-colors duration-500" />
         </div>
      </div>
   </div>
);