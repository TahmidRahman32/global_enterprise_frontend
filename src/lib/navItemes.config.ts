import { NavSections } from "@/Types/dashboard.interface";
import { getDefaultDashboardRoute, UserRole } from "./auth-utils";

export const getCommonNavItems = (role: UserRole): NavSections[] => {
   // const defaultDashboardRoute = getDefaultDashboardRoute(role);

   return [
      {
         items: [
            // {
            //    icon: "IconsComponent",
            //    label: "Home",
            //    href: defaultDashboardRoute,
            //    badge: "New",
            //    role: ["ADMIN", "USER"],
            // },
            // {
            //    icon: "IconsComponent",
            //    label: "Profile",
            //    href: "/profile",
            //    badge: "New",
            //    role: ["ADMIN", "USER"],
            // },
         ],
      },
   ];
};

export const adminNavItems: NavSections[] = [
   {
      title: "Admin Section",
      items: [
         {
            icon: "Home",
            label: "Home",
            href: "/",
            badge: "New",
            role: ["ADMIN", "SUPER_ADMIN"],
         },
         {
            icon: "Inbox",
            label: "Inbox",
            href: "/admin/dashboard/inbox",
            badge: "New",
            role: ["USER"],
         },
         {
            icon: "PlusCircle",
            label: "Add-Product",
            href: "/admin/dashboard/add-product",
            badge: "New",
            role: ["USER"],
         },

         {
            icon: "Users",
            label: "Users",
            href: "/admin/dashboard/user-list",
            badge: "New",
            role: ["ADMIN", "SUPER_ADMIN"],
         },
         {
            icon: "ListOrdered",
            label: "Order",
            href: "/admin/dashboard/oder-list",
            badge: "New",
            role: ["ADMIN", "SUPER_ADMIN"],
         },
         {
            icon: "Printer",
            label: "Products",
            href: "/admin/dashboard/my-product",
            badge: "New",
            role: ["ADMIN", "SUPER_ADMIN"],
         },
         {
            icon: "Settings",
            label: "Settings",
            href: "/admin/dashboard/settings",
            badge: "New",
            role: ["ADMIN", "SUPER_ADMIN"],
         },
      ],
   },
];


export const userNavItems: NavSections[] = [
   {
      title: "User Section",
      items: [
         {
            icon: "Home",
            label: "Home",
            href: "/",
            badge: "New",
            role: ["USER"],
         },
         {
            icon: "circle-user",
            label: "Profile",
            href: "/my-profile",
            badge: "New",
            role: ["USER"],
         },
         {
            icon: "Inbox",
            label: "Inbox",
            href: "/user/dashboard/user-inbox",
            badge: "New",
            role: ["USER"],
         },
         {
            icon: "ShoppingCart",
            label: "My-Order",
            href: "/user/dashboard/my-order",
            badge: "New",
            role: ["USER"],
         },
         {
            icon: "Settings",
            label: "Settings",
            href: "/settings",
            badge: "New",
            role: ["ADMIN", "SUPER_ADMIN"],
         },
      ],
   },
];


export const GetNavItemsByRole = (role: UserRole): NavSections[] => {
   const commonItems = getCommonNavItems(role);
   switch (role) {
      case "ADMIN":
         return [...commonItems, ...adminNavItems];
      case "USER":
         return [...commonItems, ...userNavItems];
      default:
         return [];
   }
};
