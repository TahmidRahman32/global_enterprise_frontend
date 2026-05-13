// import { getMyOrders } from '@/components/module/order/OrderAcrion';
// import React from 'react';

import { MyOrdersFetcher } from "@/components/module/Dashboard/UserContent/myOrders/MyOrdersFetcher";
import { MyOrdersSkeleton } from "@/components/module/Dashboard/UserContent/myOrders/MyOrdersSkeleton";
import { Suspense } from "react";

// const MyOrderPage =async () => {
//    const myOrders = await getMyOrders()
//    console.log(myOrders)

//    return (
//       <div>
//         <h2>my order page</h2>
//       </div>
//    );
// };

// export default MyOrderPage;

interface PageProps {
   searchParams: Promise<{ [key: string]: string | undefined }>;
}
export default async function MyOrdersPage({ searchParams }: PageProps) {
   const resolvedParams = await searchParams;

   return (
      <Suspense fallback={<MyOrdersSkeleton />} key={JSON.stringify(resolvedParams)}>
         <MyOrdersFetcher searchParams={resolvedParams} />
      </Suspense>
   );
}