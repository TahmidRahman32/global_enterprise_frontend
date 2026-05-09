import { RefreshButton } from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import { UsersInterface } from "../userList/UserList";
import OrderTable, { ApiOrder } from "./OrderTable";
interface OrderDataFetchingHeaderProps {
   orders?: ApiOrder[];
}

const OrderTableHeader = ({ orders = [] }: OrderDataFetchingHeaderProps) => {
   // console.log(orders)
   return (
      <div>
         <div className="grid gap-3 md:grid-cols-3 md:w-[550px] px-4 py-5">
            <SearchFilter paramName="searchTerm" placeHolder="search users..." />
            <SelectFilter
               paramName="status"
               placeHolder="Filter by status"
               options={[
                  { label: "All", value: "All" },
                  { label: "Pending", value: "PENDING" },
                  { label: "Completed", value: "COMPLETED" },
                  { label: "Cancelled", value: "CANCELLED" },
               ]}
            />
            <RefreshButton />
         </div>
         <OrderTable orders={orders} />
      </div>
   );
};

export default OrderTableHeader;
