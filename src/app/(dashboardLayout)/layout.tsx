import Dashboard from "@/components/module/Dashboard/main/Dashboard";
import MainDashboardContent from "@/components/module/Dashboard/main/Dashboard";
import DashboardNavbar from "@/components/module/Dashboard/main/DashboardNavbar";
import DashboardSideBar from "@/components/module/Dashboard/main/DashboardSideBar";
import { getCookie } from "@/components/services/auth/tokenHandlers";
import LogoutDialog from "@/components/shared/navbar/LogoutDialog";
import React from "react";

const CommonDashboardLayout = async ({ children }: { children: React.ReactNode }) => {
   // const accessToken = await getCookie("accessToken");
   return (
      <div className="flex h-screen overflow-hidden ">
         {/* <h1> Dashboard sidebar</h1> */}
         <DashboardSideBar />
         <div className="flex flex-col flex-1 h-screen overflow-hidden">
            <DashboardNavbar />
            <main className="flex-1 overflow-y-auto ">
               <div className="">{children}</div>
            </main>
         </div>
         {/* {accessToken && <LogoutDialog />} */}
         {/* <Dashboard /> */}
      </div>
   );
};

export default CommonDashboardLayout;
