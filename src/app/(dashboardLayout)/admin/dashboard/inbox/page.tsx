import InboxPage from '@/components/module/Dashboard/AdminContent/inbox/InboxPage';
import { InboxLoader } from '@/components/module/Dashboard/AdminContent/inbox/Inboxskeleton';
// import { InboxSkeleton } from '@/components/module/Dashboard/AdminContent/inbox/Inboxskeleton';
import { getMassages } from '@/components/services/message/messageFetching';
import React, { Suspense } from 'react';
export const dynamic = "force-dynamic";
const Inbox = async() => {
    const allMessage = await getMassages();
   //  console.log(allMessage?.data);
   return (
      <div>
         <Suspense fallback={<InboxLoader />}>
            <InboxPage messages={allMessage?.data} />
         </Suspense>
      </div>
   );
};

export default Inbox;