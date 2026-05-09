import React from 'react';
import { BounceLoader, HashLoader, PuffLoader } from 'react-spinners';

const Spinner = () => {
   return (
      <div className="flex items-center justify-center min-h-screen  ">
         {/* <PuffLoader /> */}
         {/* <BounceLoader /> */}
         <HashLoader className="animate-spin" color="#c4840d" size={100} />
      </div>
   );
};

export default Spinner;