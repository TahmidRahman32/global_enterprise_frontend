import ServiceList from '@/components/module/Dashboard/AdminContent/addService/getServices';
import { getServices } from '@/components/module/Dashboard/AdminContent/addService/serviceActions';

import React from 'react';

const ServicesPage =async () => {
   const  services = await getServices()

   return (
      <div>
         <ServiceList services={services?.data} />
      </div>
   );
};

export default ServicesPage;