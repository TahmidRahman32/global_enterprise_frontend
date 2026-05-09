import OrderListSkeleton from "@/components/module/Dashboard/AdminContent/All-Order/OrderCardSkeleton";
import { getMyOrders } from "@/components/module/order/OrderAcrion";
import OrderListFetcher from "@/components/module/order/OrderListFetcher";
import React, { Suspense } from "react";

const OrderListPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
   const searchParamsObj = await searchParams;
   const myOrders = await getMyOrders();
   
   // console.log(orders, AllOrders.data._debugInfo);
   return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
         <div className="relative flex flex-col justify-center items-center mt-8">
            <h2 className="font-primary-inter font-bold text-3xl pb-16 relative inline-block">
               <h1 className="text-4xl font-bold text-gray-100 tracking-tight sm:text-5xl">Order Management</h1>
               <p className="mt-3 text-lg text-gray-400 max-w-2xl mx-auto">Manage customer orders with status tracking and actions</p>
               <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#bd9520] to-transparent" />
            </h2>
         </div>
         <Suspense fallback={<OrderListSkeleton />} key={JSON.stringify(searchParamsObj)}>
            <OrderListFetcher searchParams={searchParamsObj} />
         </Suspense>
      </div>
   );
};

export default OrderListPage;
