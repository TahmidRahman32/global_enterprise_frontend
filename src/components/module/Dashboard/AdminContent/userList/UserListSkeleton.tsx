import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const SKELETON_ROWS = 6;

const UserListSkeleton = () => {
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
                  {Array.from({ length: SKELETON_ROWS }).map((_, i) => (
                     <TableRow key={i} className="hover:bg-gray-50/20">
                        {/* Profile Picture */}
                        <TableCell className="p-2 sm:p-3">
                           <Skeleton className="h-8 w-8 sm:h-10 sm:w-10 rounded-full" />
                        </TableCell>

                        {/* Name */}
                        <TableCell>
                           <Skeleton className="h-4 w-24 sm:w-32" />
                        </TableCell>

                        {/* Email */}
                        <TableCell>
                           <Skeleton className="h-4 w-32 sm:w-48" />
                        </TableCell>

                        {/* Role */}
                        <TableCell className="hidden sm:table-cell">
                           <Skeleton className="h-4 w-16" />
                        </TableCell>

                        {/* Status Badge */}
                        <TableCell>
                           <Skeleton className="h-5 w-16 rounded-full" />
                        </TableCell>

                        {/* Join Date */}
                        <TableCell className="hidden md:table-cell">
                           <Skeleton className="h-4 w-24" />
                        </TableCell>

                        {/* Actions */}
                        <TableCell className="text-right">
                           <div className="flex items-center justify-end gap-1 sm:gap-2">
                              <Skeleton className="h-7 w-7 sm:h-8 sm:w-8 rounded-md" />
                              <Skeleton className="h-7 w-7 sm:h-8 sm:w-8 rounded-md" />
                              <Skeleton className="h-7 w-7 sm:h-8 sm:w-8 rounded-md" />
                              <Skeleton className="h-7 w-7 sm:h-8 sm:w-8 rounded-md" />
                           </div>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </div>
      </div>
   );
};

export default UserListSkeleton;
