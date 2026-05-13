// import { getMyOrders } from "./Myordersactions";
// import MyOrdersClient from "./Myordersclient";

import { getMyOrders } from "./Myordersactions";
import MyOrdersClient from "./Myordersclient";

// ── Async fetcher component ───────────────────────────────────────────────────
export async function MyOrdersFetcher({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
   const result = await getMyOrders({
      status: searchParams.status,
      searchTerm: searchParams.searchTerm,
      page: searchParams.page ? Number(searchParams.page) : 1,
      limit: 10,
      sortBy: searchParams.sortBy || "createdAt",
      sortOrder: searchParams.sortOrder || "desc",
   });
   // console.log(result,"get my order")

   const orders = result?.data ?? [];
   const meta = result?.meta ?? { total: 0, limit: 10, page: 1 };
   // console.log(orders,"check")

   return <MyOrdersClient initialOrders={orders} initialMeta={meta} />;
}

// export async function MyOrdersFetcher({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
//    const result = await getMyOrders({});

//    // ✅ Match your actual API structure
//    const orders = result?.data ?? [];
//    const meta = result?.meta ?? { total: 0, limit: 10, page: 1 };

//    return <MyOrdersClient initialOrders={orders} initialMeta={meta} />;
// }