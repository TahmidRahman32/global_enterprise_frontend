import React from "react";
export const dynamic = "force-dynamic";
const UserLayout = ({ children }: { children: React.ReactNode }) => {
   return <div>
         {children}
   </div>;
};

export default UserLayout;
