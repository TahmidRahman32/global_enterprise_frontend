import { logoutUser } from "@/components/services/auth/logoutUser";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { UserInfo } from "@/Types/user.interfece";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import commonImg from "@/assets/mainLogo.jpg";

interface NavDropdownMenuProps {
   // You can add props here if needed, e.g. user info, logout handler, etc.
   userinfo: UserInfo;
}
const NavDropdownMenu = ({ userinfo }: NavDropdownMenuProps) => {
   const handleLogout = async () => {
      // Implement your logout logic here, e.g. clear cookies, call logout API, etc.
      await logoutUser();
   };
   return (
      <div>
         <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-2">
               <span className="text-sm font-medium">{userinfo.name}</span>
               <ChevronDown size={16} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className={"w-72"}>
               <DropdownMenuGroup>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <div className="flex flex-col justify-center items-center my-5">
                     <Image src={userinfo.profilePhoto ? userinfo.profilePhoto : commonImg} alt="Avatar" className="w-10 h-10 rounded-full" />
                     <span className="text-sm font-medium">{userinfo.name}</span>
                     <p>{userinfo.email}</p>
                  </div>
               </DropdownMenuGroup>
               <DropdownMenuSeparator />
               <DropdownMenuGroup>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>
                     {/* <Button variant="ghost" onClick={handleLogout} className="w-full text-left">
                        Logout
                     </Button> */}
                  </DropdownMenuItem>
               </DropdownMenuGroup>
            </DropdownMenuContent>
         </DropdownMenu>
      </div>
   );
};

export default NavDropdownMenu;
