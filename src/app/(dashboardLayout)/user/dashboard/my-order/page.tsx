
import { MyOrdersFetcher } from "@/components/module/Dashboard/UserContent/myOrders/MyOrdersFetcher";
import { MyOrdersSkeleton } from "@/components/module/Dashboard/UserContent/myOrders/MyOrdersSkeleton";
import { Suspense } from "react";


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