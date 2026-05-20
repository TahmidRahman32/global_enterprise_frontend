// components/admin/ServiceForm.tsx
"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Loader2, Zap, Printer, Package, Settings, Star, CheckCircle2, AlertCircle, Sparkles, Barcode, Hash, Layers, Ribbon } from "lucide-react";
// import { saveService } from "./serviceActions";
import { cn } from "@/lib/utils";
import { saveService } from "./serviceActions";

// ─── Icon Options ──────────────────────────────────────────────────────────────

const ICON_OPTIONS = [
   { value: "Zap", label: "Zap", emoji: "⚡", icon: Zap, color: "text-amber-500" },
   { value: "Printer", label: "Printer", emoji: "🖨️", icon: Printer, color: "text-blue-500" },
   { value: "Package", label: "Package", emoji: "📦", icon: Package, color: "text-violet-500" },
   { value: "Settings", label: "Settings", emoji: "⚙️", icon: Settings, color: "text-slate-500" },
   { value: "Star", label: "Star", emoji: "⭐", icon: Star, color: "text-rose-500" },
   { value: "Barcode", label: "Barcode", emoji: "", icon: Barcode, color: "text-rose-500" },
   { value: "Ribbon", label: "Ribbon", emoji: "", icon: Ribbon, color: "text-rose-500" },
   { value: "Hash", label: "Hash", emoji: "", icon: Hash, color: "text-yellow-500" },
   { value: "Layers", label: "Layers", emoji: "", icon: Layers, color: "text-yellow-900" },
];

// ─── Props ────────────────────────────────────────────────────────────────────

interface ServiceFormProps {
   initialService?: {
      id?: string;
      iconName?: string;
      title?: string;
      description?: string;
      status?: string;
   };
   onSuccess?: () => void;
}

// ─── Field Wrapper ─────────────────────────────────────────────────────────────

function Field({ label, required, hint, error, children }: { label: string; required?: boolean; hint?: string; error?: string; children: React.ReactNode }) {
   return (
      <div className="space-y-1.5">
         <div className="flex items-center justify-between">
            <Label className="text-sm font-semibold text-foreground tracking-tight">
               {label}
               {required && <span className="ml-1 text-rose-500 dark:text-rose-400">*</span>}
            </Label>
            {hint && <span className="text-[11px] text-muted-foreground">{hint}</span>}
         </div>
         {children}
         {error && (
            <div className="flex items-center gap-1.5 mt-1">
               <AlertCircle className="w-3.5 h-3.5 text-destructive shrink-0" />
               <p className="text-xs text-destructive">{error}</p>
            </div>
         )}
      </div>
   );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function ServiceForm({ initialService, onSuccess }: ServiceFormProps) {
   const [state, formAction, isPending] = useActionState(saveService, {
      success: false,
      errors: {},
   });
   console.log(state);

   const isEditing = !!initialService?.id;

   useEffect(() => {
      if (state.success && onSuccess) {
         onSuccess();
      }
   }, [state.success]);

  

   return (
      <div className=" max-w-6xl mx-auto items-center  mt-8  h-screen justify-center ">
         {/* ── Header ── */}
         <div className="mb-6">
            <div className="flex items-center gap-3 mb-1">
               <div className="w-8 h-8 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary" />
               </div>
               <h2 className="text-lg font-bold text-foreground tracking-tight">{isEditing ? "Edit Service" : "New Service"}</h2>
               {isEditing && (
                  <Badge variant="secondary" className="text-[11px] px-2 py-0.5 h-auto">
                     Editing
                  </Badge>
               )}
            </div>
            <p className="text-sm text-muted-foreground ml-11">{isEditing ? "Update the details below to modify this service." : "Fill in the details to create a new service."}</p>
         </div>

         <Separator className="mb-6" />

         {/* ── Form ── */}
         <form action={formAction} className="space-y-5">
            {isEditing && <input type="hidden" name="id" value={initialService.id} />}

            {/* Icon + Status row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {/* Icon */}
               <Field label="Icon" hint="Visual identifier">
                  <Select name="icon" defaultValue={initialService?.iconName || "Zap"}>
                     <SelectTrigger className={cn("h-10 w-full bg-muted/40 dark:bg-muted/20 border-border/60", "hover:border-primary/50 focus:border-primary transition-colors", "text-sm font-medium")}>
                        <SelectValue placeholder="Select an icon" />
                     </SelectTrigger>
                     <SelectContent className="bg-popover border-border/60">
                        {ICON_OPTIONS.map((opt) => {
                           const Icon = opt.icon;
                           return (
                              <SelectItem key={opt.value} value={opt.value} className="cursor-pointer focus:bg-accent">
                                 <span className="flex items-center gap-2.5">
                                    <Icon className={cn("w-4 h-4 shrink-0", opt.color)} />
                                    <span>{opt.label}</span>
                                 </span>
                              </SelectItem>
                           );
                        })}
                     </SelectContent>
                  </Select>
               </Field>

               {/* Status */}
               <Field label="Status">
                  <Select name="status" defaultValue={initialService?.status || "ACTIVE"}>
                     <SelectTrigger className={cn("h-10 w-full bg-muted/40 dark:bg-muted/20 border-border/60", "hover:border-primary/50 focus:border-primary transition-colors", "text-sm font-medium")}>
                        <SelectValue />
                     </SelectTrigger>
                     <SelectContent className="bg-popover border-border/60">
                        <SelectItem value="ACTIVE" className="cursor-pointer focus:bg-accent">
                           <span className="flex items-center gap-2.5">
                              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                              <span>Active</span>
                           </span>
                        </SelectItem>
                        <SelectItem value="INACTIVE" className="cursor-pointer focus:bg-accent">
                           <span className="flex items-center gap-2.5">
                              <span className="w-2 h-2 rounded-full bg-slate-400 shrink-0" />
                              <span>Inactive</span>
                           </span>
                        </SelectItem>
                     </SelectContent>
                  </Select>
               </Field>
            </div>

            {/* Title */}
            <Field label="Title" required hint="Keep it concise" error={state.errors?.title}>
               <Input
                  id="title"
                  name="title"
                  defaultValue={initialService?.title}
                  placeholder="e.g., High‑Speed Digital Printing"
                  className={cn(
                     "h-10 bg-muted/40 dark:bg-muted/20 border-border/60 text-sm",
                     "placeholder:text-muted-foreground/50",
                     "hover:border-primary/50 focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/30",
                     "transition-colors",
                     state.errors?.title && "border-destructive focus-visible:ring-destructive/30",
                  )}
               />
            </Field>

            {/* Description */}
            <Field label="Description" required hint="Max 300 chars" error={state.errors?.description}>
               <Textarea
                  id="description"
                  name="description"
                  defaultValue={initialService?.description}
                  placeholder="Describe what makes this service valuable to your clients..."
                  rows={4}
                  className={cn(
                     "bg-muted/40 dark:bg-muted/20 border-border/60 text-sm resize-none",
                     "placeholder:text-muted-foreground/50",
                     "hover:border-primary/50 focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/30",
                     "transition-colors leading-relaxed",
                     state.errors?.description && "border-destructive focus-visible:ring-destructive/30",
                  )}
               />
            </Field>

            {/* Global error */}
            {state.errors?.global && (
               <div className="flex items-start gap-2.5 p-3 rounded-lg bg-destructive/8 dark:bg-destructive/15 border border-destructive/20">
                  <AlertCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                  <p className="text-sm text-destructive">{state.errors.global}</p>
               </div>
            )}

            {/* Success banner */}
            {state.success && (
               <div className="flex items-center gap-2.5 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <p className="text-sm text-emerald-700 dark:text-emerald-400 font-medium">Service {isEditing ? "updated" : "created"} successfully!</p>
               </div>
            )}

            <Separator />

            {/* Submit */}
            <div className="flex items-center justify-end gap-3 pt-1">
               <Button type="button" variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" onClick={onSuccess} disabled={isPending}>
                  Cancel
               </Button>

               <Button type="submit" disabled={isPending} size="sm" className={cn("min-w-[130px] font-semibold transition-all", "bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90", "shadow-sm hover:shadow-md")}>
                  {isPending ? (
                     <>
                        <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                        {isEditing ? "Updating…" : "Creating…"}
                     </>
                  ) : (
                     <>
                        {isEditing ? (
                           <>
                              <CheckCircle2 className="mr-2 h-3.5 w-3.5" />
                              Update Service
                           </>
                        ) : (
                           <>
                              <Sparkles className="mr-2 h-3.5 w-3.5" />
                              Create Service
                           </>
                        )}
                     </>
                  )}
               </Button>
            </div>
         </form>
      </div>
   );
}
