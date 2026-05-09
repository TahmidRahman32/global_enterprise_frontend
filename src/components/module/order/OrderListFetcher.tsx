import { queryStringFormatter } from '@/lib/formatters';

import { getAllOrders } from './OrderAcrion';
import OrderTableHeader from '../Dashboard/AdminContent/All-Order/OrderTableHeader';
interface OrderListFetcherProps {
   searchParams: { [key: string]: string | string[] | undefined };
}
const OrderListFetcher = async ({ searchParams }: OrderListFetcherProps) => {
   const queryString = queryStringFormatter(searchParams);
   const AllOrders = await getAllOrders(queryString);
      // console.log(myOrders);
      // console.log(AllOrders.data, "first");
      const orders = AllOrders?.data ?? [];
   return (
      <div>
         <OrderTableHeader orders={orders}/>
         {/* <Pagination currentPage={userMetaData.page} totalPages={totalPages} /> */}
      </div>
   );
};

export default OrderListFetcher;