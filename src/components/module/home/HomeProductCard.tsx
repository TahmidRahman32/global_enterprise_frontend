// app/page.tsx or any page where you want the section

import { getProducts } from "@/components/services/product/ProductFetching";
import OurProducts from "../product/LandingPageProductCard";

export default async function HomeProductCard() {
   // You can pass your own product array (max 4 shown by design)
   const myProducts = await getProducts();
   // console.log(myProducts.data.data);
   // const displayedProducts = myProducts?.data?.data.slice(0, 3);

   return (
      <main>
         <OurProducts products={myProducts?.data?.data} />
      </main>
   );
}
