"use client";

import React, { useState, useRef, useLayoutEffect, useTransition } from "react";
import { gsap } from "gsap";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";

interface SparkleNavbarProps {
   items: string[];
   routes: string[];
   color?: string;
   activeIndex?: number;
   onItemClick?: (index: number, item: string, route: string) => void;
}

const SparkleNavbar: React.FC<SparkleNavbarProps> = ({ items, routes, color = "#00fffc", activeIndex: externalActiveIndex, onItemClick }) => {
   const router = useRouter();
   const pathname = usePathname();
   const [isPending, startTransition] = useTransition();
   const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

   // Calculate initial active index based on current route
   const getInitialActiveIndex = () => {
      if (externalActiveIndex !== undefined) return externalActiveIndex;
      const currentPath = pathname;
      const index = routes.findIndex((route) => route === currentPath);
      return index >= 0 ? index : 0;
   };

   const [internalActiveIndex, setInternalActiveIndex] = useState(getInitialActiveIndex);
   const activeIndex = externalActiveIndex !== undefined ? externalActiveIndex : internalActiveIndex;

   const navRef = useRef<HTMLDivElement>(null);
   const activeElementRef = useRef<HTMLDivElement>(null);
   const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

   // Update active index when route changes
   useLayoutEffect(() => {
      const newActiveIndex = getInitialActiveIndex();
      if (newActiveIndex !== internalActiveIndex) {
         queueMicrotask(() => {
            setInternalActiveIndex(newActiveIndex);
            setLoadingIndex(null); // Clear loading when route completes
         });
      }
         setLoadingIndex(null);
   }, [pathname, externalActiveIndex]);


   // Function to create the SVG content for the active element
   const createSVG = (element: HTMLDivElement) => {
      element.innerHTML = `
         <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <rect width="100" height="100" fill="${color}" />
         </svg>
      `;
   };

   const getOffsetLeft = (element: HTMLButtonElement) => {
      if (!navRef.current || !activeElementRef.current) return 0;
      const elementRect = element.getBoundingClientRect();
      const navRect = navRef.current.getBoundingClientRect();
      const activeElementWidth = activeElementRef.current.offsetWidth;
      return elementRect.left - navRect.left + (elementRect.width - activeElementWidth) / 2;
   };

   useLayoutEffect(() => {
      const activeButton = buttonRefs.current[activeIndex];
      if (navRef.current && activeElementRef.current && activeButton) {
         gsap.set(activeElementRef.current, {
            x: getOffsetLeft(activeButton),
         });
         gsap.to(activeElementRef.current, {
            "--active-element-show": "1",
            duration: 0.2,
         });
      }
   }, [activeIndex]);

   // Handle navigation with loading state
   const handleClick = (index: number) => {
      const navElement = navRef.current;
      const activeElement = activeElementRef.current;
      const oldButton = buttonRefs.current[activeIndex];
      const newButton = buttonRefs.current[index];

      if (index === activeIndex || !navElement || !activeElement || !oldButton || !newButton) {
         return;
      }

      const targetRoute = routes[index];

      // Set loading state
      setLoadingIndex(index);

      // Call the external click handler if provided
      if (onItemClick) {
         onItemClick(index, items[index], targetRoute);
      } else {
         // Navigate to the route using Next.js router with transition
         startTransition(() => {
            router.push(targetRoute);
         });
      }

      // Animation logic
      const x = getOffsetLeft(newButton);
      const direction = index > activeIndex ? "after" : "before";
      const spacing = Math.abs(x - getOffsetLeft(oldButton));

      navElement.classList.add(direction);

      gsap.set(activeElement, {
         rotateY: direction === "before" ? "180deg" : "0deg",
      });

      gsap.to(activeElement, {
         keyframes: [
            {
               "--active-element-width": `${spacing > navElement.offsetWidth - 60 ? navElement.offsetWidth - 60 : spacing}px`,
               duration: 0.3,
               ease: "none",
               onStart: () => {
                  createSVG(activeElement);
                  gsap.to(activeElement, {
                     "--active-element-opacity": 1,
                     duration: 0.1,
                  });
               },
            },
            {
               "--active-element-scale-x": "0",
               "--active-element-scale-y": ".25",
               "--active-element-width": "0px",
               duration: 0.3,
               onStart: () => {
                  gsap.to(activeElement, {
                     "--active-element-mask-position": "40%",
                     duration: 0.5,
                  });
                  gsap.to(activeElement, {
                     "--active-element-opacity": 0,
                     delay: 0.45,
                     duration: 0.25,
                  });
               },
               onComplete: () => {
                  activeElement.innerHTML = "";
                  navElement.classList.remove("before", "after");
                  gsap.set(activeElement, {
                     x: getOffsetLeft(newButton),
                     "--active-element-show": "1",
                  });
                  // Update state only if not externally controlled
                  if (externalActiveIndex === undefined) {
                     setInternalActiveIndex(index);
                  }
               },
            },
         ],
      });

      gsap.to(activeElement, {
         x,
         "--active-element-strike-x": "-50%",
         duration: 0.6,
         ease: "none",
      });
   };

   return (
      <>
         <style>{`
            .navigation-menu {
               margin: 20px 0px;
               position: relative;
               z-index: 1;
            }

            .navigation-menu ul {
               margin: 0;
               padding: 0;
               list-style: none;
               display: flex;
               gap: 40px;
            }

            .navigation-menu ul li button {
               -webkit-appearance: none;
               -moz-appearance: none;
               appearance: none;
               border: none;
               cursor: pointer;
               background-color: transparent;
               padding: 0;
               margin: 0;
               line-height: 22px;
               transition: color 0.25s;
               color: inherit;
               position: relative;
               display: flex;
               align-items: center;
               gap: 8px;
            }

            .navigation-menu ul li button:disabled {
               cursor: not-allowed;
               opacity: 0.6;
            }

            .navigation-menu ul li:not(.active):not(.loading):hover button {
               text-shadow: 0 0 10px ${color}, 0 0 20px ${color};
            }

            .navigation-menu .active-element {
               --active-element-scale-x: 1;
               --active-element-scale-y: 1;
               --active-element-show: 0;
               --active-element-opacity: 0;
               --active-element-width: 0px;
               --active-element-strike-x: 0%;
               --active-element-mask-position: 0%;
               position: absolute;
               left: 0;
               top: 34px;
               height: 3px;
               width: 36px;
               border-radius: 2px;
               background-color: ${color};
               opacity: var(--active-element-show);
            }

            .navigation-menu .loading-spinner {
               animation: spin 1s linear infinite;
            }

            @keyframes spin {
               from {
                  transform: rotate(0deg);
               }
               to {
                  transform: rotate(360deg);
               }
            }
         `}</style>

         <nav className="navigation-menu" ref={navRef}>
            <ul>
               {items.map((item, index) => (
                  <li
                     key={item}
                     className={`
                        ${index === activeIndex ? "active" : ""} 
                        ${loadingIndex === index ? "loading" : ""}
                     `}
                  >
                     <button
                        ref={(el) => {
                           buttonRefs.current[index] = el;
                        }}
                        onClick={() => handleClick(index)}
                        disabled={isPending || loadingIndex !== null}
                        className="text-white text-lg font-primary-inter"
                     >
                        {item}
                        {/* {loadingIndex === index && <Loader2 className="loading-spinner" size={14} style={{ color }} />} */}
                     </button>
                  </li>
               ))}
            </ul>
            <div className="active-element" ref={activeElementRef} />
         </nav>
      </>
   );
};

export default SparkleNavbar;
