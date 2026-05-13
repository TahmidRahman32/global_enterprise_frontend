// import UserDashboard from '@/components/module/Dashboard/userContent/UserDashboard';
import UserDashboard from '@/components/module/Dashboard/UserContent/UserDashboard';
import { getProducts } from '@/components/services/product/ProductFetching';
import React from 'react';

const UserDashboardPage =async () => {
   const products = await getProducts();
   return (
      <div>
         <UserDashboard products={products?.data?.data}/>
      </div>
   );
};

export default UserDashboardPage;