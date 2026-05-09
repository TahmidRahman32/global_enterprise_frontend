import z from "zod";

// Define the form schema with Zod for registration
export const registerSchema = z
   .object({
      name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name is too long"),
      email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
      password: z.string().min(6, "Password must be at least 6 characters").max(50, "Password is too long"),
      confirmPassword: z.string().min(6, "Please confirm your password"),
   })
   .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
   });

      // Password validation criteria (for live feedback)
   export const validatePassword = (password: string) => {
      const checks = {
         length: password.length >= 6,
         uppercase: /[A-Z]/.test(password),
         lowercase: /[a-z]/.test(password),
         number: /[0-9]/.test(password),
         special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      };
      const passed = Object.values(checks).filter(Boolean).length;
      return { checks, passed, total: Object.keys(checks).length };
   };
