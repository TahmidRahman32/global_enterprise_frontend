import InboxClient from '@/components/module/Dashboard/UserContent/inbox/Inbox';
import { getMassages, getMyMessages } from '@/components/services/message/messageFetching';
import React from 'react';

const UserInbox = async () => {
   const messages = await getMyMessages()
   console.log(messages?.data)
  
   return (
      <div>
         <InboxClient messages={messages?.data} />
      </div>
   );
};

export default UserInbox; 