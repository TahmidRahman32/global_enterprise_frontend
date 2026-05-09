

import UserListFetcher from "@/components/module/Dashboard/AdminContent/userList/UserListPageHeader";
import UserListSkeleton from "@/components/module/Dashboard/AdminContent/userList/UserListSkeleton";
import Pagination from "@/components/shared/Pagination";
import { Suspense } from "react";
// import UserListFetcher from "@/components/shared/UserListFetcher";

const UserListPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
   const searchParamsObj = await searchParams;

   return (
      <div>
         <div className="relative flex flex-col justify-center items-center mt-8">
            <h2 className="font-primary-inter font-bold text-3xl pb-16 relative inline-block">
               User List
               <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#bd9520] to-transparent" />
            </h2>
         </div>
         <Suspense fallback={<UserListSkeleton/>} key={JSON.stringify(searchParamsObj)}>
           
            <UserListFetcher searchParams={searchParamsObj} />
     
         </Suspense>
      </div>
   );
};

export default UserListPage;
