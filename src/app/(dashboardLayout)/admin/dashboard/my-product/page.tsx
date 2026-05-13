import ProductTable from '@/components/module/Dashboard/AdminContent/MyProduct/Producttable';
import { getProducts } from '@/components/services/product/ProductFetching';
import React from 'react';

const MyProduct =async () => {
   const products = await getProducts();
   return (
      <div>
         <ProductTable product={products?.data?.data} />
      </div>
   );
};

export default MyProduct;