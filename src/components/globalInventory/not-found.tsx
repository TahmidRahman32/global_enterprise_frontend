"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Compass } from "lucide-react";

const NotFoundPage = () => {
   const router = useRouter();
   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
   const [particles, setParticles] = useState<Array<{ x: number; y: number; duration: number }>>([]);

   useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
         setMousePosition({ x: e.clientX, y: e.clientY });
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
   }, []);

   useEffect(() => {
      const newParticles = Array.from({ length: 30 }, () => ({
         x: Math.random() * window.innerWidth,
         y: Math.random() * window.innerHeight,
         duration: Math.random() * 10 + 10,
      }));
      setParticles(newParticles);
   }, []);

   return (
      <div className="relative min-h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 overflow-hidden flex items-center justify-center">
         <style jsx global>{`
            body {
               overflow: hidden;
            }
         `}</style>

         <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((part, i) => (
               <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "#bb931c" }}
                  initial={{ x: part.x, y: part.y, opacity: 0.15 }}
                  animate={{
                     y: [part.y, part.y - 40, part.y + 35, part.y - 25, part.y + 20, part.y],
                     x: [part.x, part.x + 25, part.x - 20, part.x + 15, part.x - 10, part.x],
                     opacity: [0.15, 0.4, 0.1, 0.3, 0.2, 0.15],
                  }}
                  transition={{
                     duration: part.duration,
                     repeat: Infinity,
                     repeatType: "mirror",
                     ease: "linear",
                  }}
               />
            ))}
         </div>

         <motion.div
            className="absolute w-80 h-80 rounded-full pointer-events-none"
            style={{
               background: "radial-gradient(circle, rgba(187,147,28,0.25), rgba(45,212,191,0.1))",
               filter: "blur(60px)",
            }}
            animate={{ x: mousePosition.x - 160, y: mousePosition.y - 160 }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
         />

         <div className="relative z-10 px-4 text-center max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, type: "spring", stiffness: 100 }} className="relative">
               <h1 className="text-[10rem] sm:text-[14rem] md:text-[18rem] font-black leading-none tracking-tighter bg-gradient-to-r from-white via-[#bb931c] to-teal-400 bg-clip-text text-transparent select-none">404</h1>
               <motion.div
                  animate={{
                     textShadow: ["0 0 0px rgba(0,0,0,0)", "0 0 15px rgba(187,147,28,0.5)", "0 0 0px rgba(0,0,0,0)"],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 text-[10rem] sm:text-[14rem] md:text-[18rem] font-black leading-none tracking-tighter bg-gradient-to-r from-white via-[#bb931c] to-teal-400 bg-clip-text text-transparent blur-sm opacity-60 select-none"
               >
                  404
               </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="mt-4 relative">
               <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  Lost in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bb931c] to-teal-400">Space</span>
               </h2>
               <p className="text-gray-400 text-base md:text-lg max-w-md mx-auto">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.6, rotate: -45 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: 0.5, duration: 0.8, type: "spring" }} className="my-8">
               <div className="relative w-28 h-28 mx-auto">
                  <div className="absolute inset-0 rounded-full border-2 animate-ping" style={{ borderColor: "#bb931c80" }} />
                  <div className="absolute inset-1 rounded-full border" style={{ borderColor: "#14b8a6" }} />
                  <Compass className="w-14 h-14 text-teal-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin-slow" />
               </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.5 }} className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
               <Button size="lg" style={{ backgroundColor: "#bb931c", color: "#0f172a" }} className="gap-2 hover:scale-105 transition-transform" >
                  <Link href="/" className="flex items-center gap-2">
                     <Home className="w-4 h-4" /> Back to Home
                  </Link>
               </Button>
               <Button variant="outline" size="lg" className="border-teal-400 text-teal-400 hover:bg-teal-400/10 gap-2 hover:scale-105 transition-transform" onClick={() => router.back()}>
                  <ArrowLeft className="w-4 h-4" /> Go Back
               </Button>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-12 text-sm text-gray-500">
               <p>You might find these links helpful:</p>
               <div className="flex gap-5 justify-center mt-3">
                  <Link href="/" className="hover:text-[#bb931c] transition-colors">
                     Home
                  </Link>
                  <Link href="/about" className="hover:text-[#bb931c] transition-colors">
                     About
                  </Link>
                  <Link href="/contact" className="hover:text-[#bb931c] transition-colors">
                     Contact
                  </Link>
                  <Link href="/blog" className="hover:text-[#bb931c] transition-colors">
                     Blog
                  </Link>
               </div>
            </motion.div>
         </div>

         <style jsx>{`
            @keyframes spin-slow {
               from {
                  transform: translate(-50%, -50%) rotate(0deg);
               }
               to {
                  transform: translate(-50%, -50%) rotate(360deg);
               }
            }
            .animate-spin-slow {
               animation: spin-slow 12s linear infinite;
            }
         `}</style>
      </div>
   );
};

export default NotFoundPage;
