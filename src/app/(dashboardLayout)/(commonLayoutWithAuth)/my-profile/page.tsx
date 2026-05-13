// import MyProfile from "@/components/myProfile/MyProfile";
// import { getUserInfo } from "@/services/auth/getUserInfo";
import MyProfile from "@/components/module/commonLayout/MyProfile/MyProfile";
import { getUserInfo } from "@/components/services/auth/getUserInfo";
import React from "react";

const MyProfilePage = async () => {
   const userInfo = await getUserInfo();
   // console.log(userInfo, "my profile")
   return (
      <div>
         <MyProfile userInfo={userInfo} />
      </div>
   );
};

export default MyProfilePage;
