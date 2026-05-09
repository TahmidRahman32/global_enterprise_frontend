// inside CardSection.tsx, after imports
import { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CardItem } from "./CardSection";
import Link from "next/link";

export const SpotlightCard = ({ card }: { card: CardItem }) => {
   // console.log(card)
   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
   const cardRef = useRef<HTMLElement>(null);

   const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });
   };

   const borderColor = { gradient: "linear-gradient(180deg, #F59E0B, #000)" };

   return (
      <article
         ref={cardRef}
         onMouseMove={handleMouseMove}
         // onClick={() => handleCardClick(card.url)}
         className="group relative flex flex-col md:w-[490px] rounded-[20px] overflow-hidden border-2 border-yellow-500 transition-colors duration-300 cursor-pointer container mx-auto"
         style={
            {
               "--card-border": borderColor.gradient || "transparent",
               background: `linear-gradient(180deg, rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${card?.picture}) center/cover no-repeat`,
               "--spotlight-color": "rgba(255,255,255,0.3)",
            } as React.CSSProperties
         }
      >
         {/* Spotlight overlay */}
         <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-20 opacity-0 group-hover:opacity-100"
            style={{
               background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, var(--spotlight-color), transparent 70%)`,
            }}
         />

         {/* Image container - FIXED HEIGHT */}
         <div className="relative z-10 box-border h-[300px] ">
            <div className="relative w-full h-full overflow-hidden">
               {card?.picture ? (
                  <Image src={card?.picture} alt={card?.name} fill sizes="100%" className="object-cover  shadow-2xl" loading="lazy" />
               ) : (
                  <div>
                     <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-500">No Image Available</span>
                     </div>
                  </div>
               )}
            </div>
         </div>

         {/* Footer */}
         <footer className="relative z-10 p-2 text-white bg-black font-sans flex justify-between items-center">
            <div className="text-left">
               <h3 className="m-0 text-xl font-semibold line-clamp-1">{card?.name}</h3>
               {card?.note && <span className="text-gray-400 opacity-80 ">{card?.note}</span>}
               {/* <p className="m-0  opacity-85 ">Price:{card?.price}</p> */}
               {card.stock !== undefined && (
                  <span className=" opacity-85  ">
                     <span className="text-yellow-500 font-primary-BB font-bold">Stock:</span> {card?.stock}
                  </span>
               )}
            </div>
            <div>
               <Link href={`/product/${card?.id}`}>
                  <Button className="py-2 px-4 text-xl  font-primary-bebas transform transition-transform duration-300 hover:scale-105 bg-yellow-500">Details</Button>
               </Link>
            </div>
         </footer>
      </article>
   );
};
