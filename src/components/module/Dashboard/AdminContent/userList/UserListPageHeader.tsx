// src/components/shared/UserListFetcher.tsx
import { getAllUsers } from "@/components/services/users/usersFetching";
import DataFetchingHeader from "@/components/shared/DataFetchingHeader";
import Pagination from "@/components/shared/Pagination";
import { queryStringFormatter } from "@/lib/formatters";
// import DataFetchingHeader from "./DataFetchingHeader";

interface UserListFetcherProps {
   searchParams: { [key: string]: string | string[] | undefined };
}

const UserListFetcher = async ({ searchParams }: UserListFetcherProps) => {
   const queryString = queryStringFormatter(searchParams);
   const userList = await getAllUsers(queryString);
   // console.log(userList?.data?.meta, "add meta");
   const userMetaData = userList?.data?.meta; 
   const totalPages = Math.ceil(userMetaData.total / userMetaData.limit)
   // console.log(totalPages)
   return (
      <>
         <DataFetchingHeader userList={userList?.data.data ?? []} />
         <Pagination currentPage={userMetaData.page} totalPages={totalPages}/>
      </>
   );
};

export default UserListFetcher;
