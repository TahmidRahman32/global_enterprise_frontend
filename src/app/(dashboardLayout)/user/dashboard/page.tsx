// import UserDashboard from '@/components/module/Dashboard/userContent/UserDashboard';
import UserDashboard from '@/components/module/Dashboard/UserContent/UserDashboard';
import { getMetaData } from '@/components/services/meta/metaDataFetching';
import { getProducts } from '@/components/services/product/ProductFetching';
import React from 'react';

const UserDashboardPage =async () => {
   const products = await getProducts();
   const metaData = await getMetaData();
   console.log(metaData)
   return (
      <div>
         <UserDashboard products={products?.data?.data} meta={metaData.data} />
      </div>
   );
};

export default UserDashboardPage;