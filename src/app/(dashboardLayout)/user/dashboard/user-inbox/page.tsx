import InboxClient from '@/components/module/Dashboard/UserContent/inbox/Inbox';
import React from 'react';

const UserInbox = () => {
   const message: any = []
   return (
      <div>
         <InboxClient messages={message}/>
      </div>
   );
};

export default UserInbox; 