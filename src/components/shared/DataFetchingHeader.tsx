   import { RefreshButton } from "./RefreshButton";
import SearchFilter from "./SearchFilter";
import SelectFilter from "./SelectFilter";
import UserList, { UsersInterface } from "../module/Dashboard/AdminContent/userList/UserList";


interface DataFetchingHeaderProps {
   userList?: UsersInterface[];
}

const DataFetchingHeader = ({ userList = [] }: DataFetchingHeaderProps) => {
   
   return (
      <div>
         <div className="grid gap-3 md:grid-cols-3 md:w-[550px] px-4 py-5">
            <SearchFilter paramName="searchTerm" placeHolder="search users..." />
            <SelectFilter
               paramName="status"
               placeHolder="Filter by status"
               options={[
                  { label: "All", value: "All" },
                  { label: "Active", value: "ACTIVE" },
                  { label: "Inactive", value: "INACTIVE" },
                  { label: "Deleted", value: "DELETE" },
               ]}
            />
            <RefreshButton />
         </div>
         <UserList userList={userList} />
        
      </div>
   );
};

export default DataFetchingHeader;
