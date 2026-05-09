
import { useId } from "react";

import Image from "next/image";
import mainLogo from "@/assets/mainLogo.jpg";
import Link from "next/link";
import SparkleNavbar from "@/components/lightswind/sparkle-navbar";
import LoginButton from "./LoginButton";
import MobileMenu from "@/components/ui/moblie-menu";
import { getCookie } from "@/components/services/auth/tokenHandlers";
import LogoutDialog from "./LogoutDialog";
import { ModeToggle } from "@/components/ui/ThemeToggle";
import { NotificationMenu } from "./NotificationMenu";
// Navigation links array to be used in both desktop and mobile menus

export default async function Navbar() {
   // const id = useId();

   const accessToken = await getCookie("accessToken");

   return (
      <div className="container mx-auto p-0 absolute top-4 left-0 right-0">
         <header
            className=" shadow-2xl container mx-auto md:rounded-full fixed z-50
                    bg-gradient-to-br from-white/30 to-white/10 
                    dark:from-gray-900/30 dark:to-gray-800/10 
                    backdrop-blur-xl backdrop-saturate-150
                    border border-white/40 dark:border-gray-700/30
                    shadow-lg shadow-black/5 dark:shadow-black/20 px-0 pr-2"
         >
            <div className="flex h-16 items-center justify-between gap-4">
               {/* Left side */}
               <div className="flex flex-1 items-center gap-2">
                  {/* Mobile menu trigger */}
                  <div className="flex items-center md:hidden">
                     <MobileMenu />
                  </div>

                  <div className="md:flex items-center gap-6 hidden">
                     {/* Search form */}

                     <div className="relative">
                        <Image src={mainLogo} alt="Main Logo" width={65} height={40} className="  rounded-es-[40px] rounded-ss-[40px]" />
                        {/* <Input
                           id={id}
                           className="peer h-8 ps-8 pe-2 bg-white/50 dark:bg-gray-800/50 
                                     border border-gray-200/50 dark:border-gray-700/50
                                     backdrop-blur-sm"
                           placeholder="Search..."
                           type="search"
                        /> */}
                        {/* <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 text-muted-foreground/80 peer-disabled:opacity-50">
                           <SearchIcon size={16} />
                        </div> */}
                     </div>
                  </div>
               </div>
               {/* Middle area */}
               <div className="hidden md:flex md:flex-1 md:justify-center gap-4 ">
                  <SparkleNavbar items={["Home", "Products", "Services", "Contact", "Dashboard"]} routes={["/", "/product", "/service", "/contact", "user/dashboard"]} color="#E5C158" />
               </div>

               {/* Right side */}
               <div className="flex flex-1 items-center justify-end gap-4">
                  <NotificationMenu />
                  <ModeToggle />
                  {accessToken ? <LogoutDialog /> : <LoginButton />}
                  {/* <LoginButton /> */}
                  {/* User menu */}
                  {/* <UserMenu /> */}
               </div>
            </div>
         </header>
      </div>
   );
}
