import { Home, Printer, FileText, Settings, Users, Package, PlusCircle, MessagesSquare } from "lucide-react";
export const AdminNavItems = [
   { icon: Home, label: "Dashboard", href: "#" },
   { icon: MessagesSquare, label: "Messages", href: "/admin/dashboard/messages" },
   { icon: PlusCircle, label: "Add Printer", href: "/admin/dashboard/addProduct" },
   { icon: Package, label: "Labels", href: "#" },
   { icon: FileText, label: "Reports", href: "#" },
   { icon: Users, label: "Users", href: "/admin/dashboard/userslist" },
   { icon: Settings, label: "Settings", href: "#" },
];
