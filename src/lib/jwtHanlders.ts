/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import jwt from "jsonwebtoken";

export const verifyAccessToken = async (token: string) => {
   try {
      // Decode the token WITHOUT verification (backend handles signature verification)
      const decodedToken = jwt.decode(token) as jwt.JwtPayload;

      if (!decodedToken) {
         return {
            success: false,
            message: "Invalid token format",
         };
      }

      // Check if token is expired
      if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
         return {
            success: false,
            message: "Token has expired",
         };
      }

      return {
         success: true,
         message: "Token is valid",
         payload: decodedToken,
      };
   } catch (error: any) {
      return {
         success: false,
         message: error?.message || "Invalid token",
      };
   }
};

export const verifyResetPasswordToken = async (token: string) => {
   try {
      const verifiedResetToken = jwt.verify(token, process.env.RESET_PASS_TOKEN as string) as jwt.JwtPayload;
      return {
         success: true,
         message: "Token is valid",
         payload: verifiedResetToken,
      };
   } catch (error: any) {
      return {
         success: false,
         message: error?.message || "Invalid token",
      };
   }
};
