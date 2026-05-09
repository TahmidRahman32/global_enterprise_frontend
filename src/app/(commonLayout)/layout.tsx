import Footer from '@/components/shared/Footer/PublicFooter';
import Navbar from '@/components/shared/navbar/PublicNavbar';
import React from 'react';

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <div>
         <nav>
            <Navbar />
         </nav>
         <div className="min-h-[70vh] ">{children}</div>
         <div className="">
            <Footer></Footer>
         </div>
      </div>
   );
};

export default CommonLayout;