import { z } from "zod";

export const serviceSchema = z.object({
   icon: z.string().min(1, "Icon is required"),
   status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
   title: z.string().min(1, "Title is required"),
   description: z.string().min(1, "Description is required"),
});

export const ICON_COLORS: Record<string, string> = {
   Zap: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
   Printer: "bg-blue-100  dark:bg-blue-900/30  text-blue-600  dark:text-blue-400",
   Package: "bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400",
   Settings: "bg-slate-100  dark:bg-slate-800      text-slate-600  dark:text-slate-400",
   Star: "bg-rose-100   dark:bg-rose-900/30    text-rose-600   dark:text-rose-400",
   Ribbon: "bg-rose-100   dark:bg-rose-900/30    text-rose-600   dark:text-rose-400",
};
