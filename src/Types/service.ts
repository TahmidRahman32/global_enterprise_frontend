// types/service.ts

import { ICON_MAP } from "@/components/module/commonService/ServicesSection";

export interface IServicePayload {
   icon: string;
   title: string;
   description: string;
   status: "ACTIVE" | "INACTIVE";
}

export interface IService extends IServicePayload {
   id: string;
   createdAt: Date;
}

export type ServiceStatus = "ACTIVE" | "INACTIVE" | "DELETE";

export interface IUpdateServicePayload {
   id: string;
   title?: string;
   description?: string;
   iconName?: string;
   status?: ServiceStatus;
}

export interface ActionResult<T = unknown> {
   success: boolean;
   message?: string;
   data?: T;
   errors?: Record<string, string>;
}

export interface ServiceInterface {
   id: string;
   icon: keyof typeof ICON_MAP;
   title: string;
   description: string;
   status: "ACTIVE" | "INACTIVE" | "DELETE";
   createdAt: string;
   updatedAt: string;
}
