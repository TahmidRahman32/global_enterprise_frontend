
import ServicesSection from "@/components/module/commonService/ServicesSection";
import { getServices } from "@/components/module/Dashboard/AdminContent/addService/serviceActions";
import React from "react";

const servicesPage = async () => {
   const services = await getServices()
   // console.log(services)
   return (
      <div>
         <ServicesSection services={services?.data} />
      </div>
   );
};

export default servicesPage;