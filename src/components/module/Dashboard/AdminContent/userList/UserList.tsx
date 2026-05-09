"use client";

import { useState, useTransition, useEffect } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2, CheckCircle, XCircle } from "lucide-react";
import mainLogo from "@/assets/mainLogo.jpg";
import UserStatusFrom from "./UserStatusFrom";
import { UpdateStatusByUserId } from "@/components/services/users/usersFetching";
import { useRouter } from "next/navigation";
import DataFetchingHeader from "@/components/shared/DataFetchingHeader";

// ============================================================================
// Type Definitions
// ============================================================================

export interface UsersInterface {
   id: string;
   name: string;
   email: string;
   address: string;
   createdAt: string;
   profilePhoto: string;
   role: string;
   status: "ACTIVE" | "INACTIVE" | "DELETE";
}

interface UserListProps {
   userList?: UsersInterface[];
   onView?: (user: UsersInterface) => void;
   onEdit?: (user: UsersInterface) => void;
   onDelete?: (user: UsersInterface) => void;
   onStatusChange?: (user: UsersInterface, newStatus: UsersInterface["status"]) => void;
}

// ============================================================================
// Status Badge Component
// ============================================================================

const StatusBadge = ({ status }: { status: UsersInterface["status"] }) => {
   const config = {
      ACTIVE: { label: "Active", className: "bg-green-500/20 text-green-600 border-green-500/30" },
      INACTIVE: { label: "Inactive", className: "bg-red-500/20 text-red-600 border-red-500/30" },
      DELETE: { label: "Deleted", className: "bg-gray-500/20 text-gray-600 border-gray-500/30" },
   };
   const { label, className } = config[status];
   return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${className}`}>{label}</span>;
};

// ============================================================================
// Helper: Format Date
// ============================================================================

const formatDate = (dateString: string) => {
   try {
      return format(new Date(dateString), "MMM dd, yyyy");
   } catch {
      return "Invalid date";
   }
};

// ============================================================================
// Main Component – Fully Responsive (Horizontal Scroll on Mobile)
// ============================================================================

export default function UserList({ userList = [], onView, onEdit, onDelete, onStatusChange }: UserListProps) {
   const router = useRouter();
   const [isPending, startTransition] = useTransition();
   const [localUsers, setLocalUsers] = useState<UsersInterface[]>(userList);

   // const handleOnSuccess = () => {
   //    setTransition(() => {
   //       router.refresh();
   //       console.log("an add")
   //    });
   // };

   const handleView = (user: UsersInterface) => {
      if (onView) onView(user);
      else alert(`View user: ${user.id}`);
   };

   const handleEdit = async (userId: string, newStatus: any) => {
      setLocalUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u)));

      await UpdateStatusByUserId(userId, newStatus); 
      router.refresh(); 
   };

   const handleUiRefreshSuccess = () => {
      startTransition(() => {
         router.refresh();
         // console.log("add ui");
      });
   };

   const handleDelete = (user: UsersInterface) => {
      if (window.confirm(`Delete user "${user.name}"? This will set status to DELETE.`)) {
         if (onDelete) onDelete(user);
         else if (onStatusChange) onStatusChange(user, "DELETE");
         else {
            setLocalUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, status: "DELETE" } : u)));
            handleEdit(user.id, "DELETE");
         }
      }
   };

   const handleToggleActive = (user: UsersInterface) => {
      const newStatus = user.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
      if (onStatusChange) onStatusChange(user, newStatus);
      else {
         setLocalUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, status: newStatus } : u)));
         handleEdit(user.id, newStatus);
      }
   };

   return (
      <div className="w-full">
        
         <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <Table className="min-w-[640px] md:min-w-full">
               <TableHeader>
                  <TableRow className="hover:bg-gray-50/10">
                     <TableHead className="w-16">Picture</TableHead>
                     <TableHead>Name</TableHead>
                     <TableHead>Email</TableHead>
                     <TableHead className="hidden sm:table-cell">Role</TableHead>
                     <TableHead>Status</TableHead>
                     <TableHead className="hidden md:table-cell">Join Date</TableHead>
                     <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {localUsers.length === 0 ? (
                     <TableRow>
                        <TableCell colSpan={7} className="h-32 text-center text-gray-200">
                           No users found.
                        </TableCell>
                     </TableRow>
                  ) : (
                     localUsers.map((user) => (
                        <TableRow key={user.id} className="hover:bg-gray-50/20">
                          
                           <TableCell className="p-2 sm:p-3">
                              <div className="relative h-8 w-8 sm:h-10 sm:w-10 overflow-hidden rounded-full">
                                 <Image src={user.profilePhoto || mainLogo} alt={user.name} fill className="object-cover" sizes="(max-width: 640px) 32px, 40px" />
                              </div>
                           </TableCell>

                           {/* Name */}
                           <TableCell className="font-medium text-gray-100 text-sm sm:text-base">{user.name}</TableCell>

                           {/* Email – truncate on very small screens */}
                           <TableCell className="text-gray-300 text-sm sm:text-base max-w-[150px] sm:max-w-none truncate">{user.email}</TableCell>

                           {/* Role – hidden on mobile */}
                           <TableCell className="hidden sm:table-cell text-gray-400 capitalize text-sm sm:text-base">{user.role}</TableCell>

                           {/* Status Badge */}
                           <TableCell>
                              <StatusBadge status={user.status} />
                           </TableCell>

                           {/* Join Date – hidden on smaller tablets/mobile */}
                           <TableCell className="hidden md:table-cell text-gray-300 text-sm sm:text-base">{formatDate(user.createdAt)}</TableCell>

                           {/* Actions – responsive button sizes */}
                           <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-1 sm:gap-2">
                                 {user.status !== "DELETE" && (
                                    <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 text-gray-500 hover:text-green-600" onClick={() => handleToggleActive(user)} title={user.status === "ACTIVE" ? "Set Inactive" : "Set Active"}>
                                       {user.status === "ACTIVE" ? <XCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
                                    </Button>
                                 )}

                                 <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 text-gray-500 hover:text-blue-600" onClick={() => handleView(user)} title="View">
                                    <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                 </Button>

                                 <UserStatusFrom
                                    // onSuccess={handleOnSuccess}
                                    trigger={
                                       <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 text-gray-500 hover:text-amber-600" title="Edit">
                                          <Pencil className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                       </Button>
                                    }
                                    handleUiRefreshSuccess={handleUiRefreshSuccess}
                                    currentStatus={user.status}
                                    onConfirm={(newStatus) => handleEdit(user.id, newStatus)}
                                 />

                                 <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 text-gray-500 hover:text-red-600" onClick={() => handleDelete(user)} title="Delete">
                                    <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                 </Button>
                              </div>
                           </TableCell>
                        </TableRow>
                     ))
                  )}
               </TableBody>
            </Table>
         </div>
      </div>
   );
}
