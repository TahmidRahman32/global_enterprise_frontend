import { UserRole } from "@/lib/auth-utils";

export interface NavItem {
   icon: string;
   label: string;
   href: string;
   badge: string | number ;
   role: UserRole[]; // Array of roles that can access this item
}

export interface NavSections{
   title?: string;
   items: NavItem[];
}