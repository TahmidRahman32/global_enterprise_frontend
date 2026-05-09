import { getMyOrders } from '@/components/module/order/OrderAcrion';
import React from 'react';

const MyOrderPage =async () => {
   const myOrders = await getMyOrders()
   console.log(myOrders)

   return (
      <div>
        <h2>my order page</h2> 
      </div>
   );
};

export default MyOrderPage;