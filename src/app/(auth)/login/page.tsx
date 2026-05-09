import LoginForm from "@/components/auth/login/LoginForm";
import React from "react";


const LoginPage = async ({ searchParams }: { searchParams?: Promise<{ redirect?: string }> }) => {
   const { redirect } = (await searchParams) || {};
   // console.log("Redirect param in login page:", redirect);
   return (
      <div>
         <LoginForm redirect={redirect} />
      </div>
   );
};

export default LoginPage;
