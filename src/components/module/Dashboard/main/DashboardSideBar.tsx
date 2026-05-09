import { getUserInfo } from '@/components/services/auth/getUserInfo';
import { UserInfo } from '@/Types/user.interfece';
import React from 'react';
import DashboardSideBarContent from './DashboardSideBarContent';
import { getDefaultDashboardRoute } from '@/lib/auth-utils';
import { NavSections } from '@/Types/dashboard.interface';
import { GetNavItemsByRole } from '@/lib/navItemes.config';

const DashboardSideBar = async () => {
    const userInfo = (await getUserInfo()) as UserInfo;
    const navItems: NavSections[] = GetNavItemsByRole(userInfo.role);
    const dashboardHome = getDefaultDashboardRoute(userInfo.role);
   return (
      <div>
         <DashboardSideBarContent userinfo={userInfo} navItems={navItems} dashboardHome={dashboardHome} />
      </div>
   );
};

export default DashboardSideBar;