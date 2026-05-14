import ProductTable from '@/components/module/Dashboard/AdminContent/MyProduct/Producttable';
import { getProducts } from '@/components/services/product/ProductFetching';
import React, { Suspense } from 'react';

const MyProduct =async () => {
   const products = await getProducts();
   return (
      <div>
         <Suspense fallback={<div>loading...</div>}>
            <ProductTable product={products?.data?.data} />
         </Suspense>
      </div>
   );
};

export default MyProduct;