import MainDashboardContent from '@/components/module/Dashboard/main/DashboardContent';
import React from 'react';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <div>
 
         {children}
      </div>
   );
};

export default AdminLayout;