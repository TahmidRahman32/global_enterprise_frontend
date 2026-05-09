import type { LucideIcon } from "lucide-react";

import * as Icons from "lucide-react";

export const IconsComponent = (iconName: string): LucideIcon => {
   const IconsComponent = Icons[iconName as keyof typeof Icons] as LucideIcon;

   if (!IconsComponent) {
     return Icons["Circle"] as LucideIcon; // Return a default icon if the specified one is not found
   }
   return IconsComponent; 
}