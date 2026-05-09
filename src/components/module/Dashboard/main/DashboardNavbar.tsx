import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, Search } from 'lucide-react';
import React from 'react';
import NavDropdownMenu from './NavDropdownMenu';
import MainDashboardContent from './DashboardContent';
import { getUserInfo } from '@/components/services/auth/getUserInfo';
import { UserInfo } from '@/Types/user.interfece';

const DashboardNavbar = async() => {
   const userInfo = (await getUserInfo()) as UserInfo;
   return (
      <div >
         {/* Header */}
         <header className=" dark:bg-gray-800 shadow-sm h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center flex-1 max-w-md ">
               <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input type="text" placeholder="Search jobs, labels..." className="pl-10 pr-4 py-2 w-full" />
               </div>
            </div>
            <div className="flex items-center space-x-4">
               <Button variant="ghost" size="icon" className="relative">
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 w-2 h-2  rounded-full"></span>
               </Button>
               <NavDropdownMenu userinfo={userInfo} />
            </div>
         </header>

         {/* Main content area */}
         {/* <MainDashboardContent /> */}
      </div>
   );
};

export default DashboardNavbar;