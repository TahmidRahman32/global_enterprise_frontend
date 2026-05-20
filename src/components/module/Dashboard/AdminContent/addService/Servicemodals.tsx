
"use client";

import { useState, useTransition } from "react";
import { Loader2, Trash2, AlertTriangle, CheckCircle2, AlertCircle, Sparkles, Pencil } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
// import { ServiceInterface } from "./getServices";
import { deleteService, updateServiceStatus,  } from "./serviceActions";
import { ServiceInterface } from "@/Types/service";

const ICON_OPTIONS = [
   { value: "Zap", label: "Zap", emoji: "⚡" },
   { value: "Printer", label: "Printer", emoji: "🖨️" },
   { value: "Package", label: "Package", emoji: "📦" },
   { value: "Settings", label: "Settings", emoji: "⚙️" },
   { value: "Star", label: "Star", emoji: "⭐" },
];


function Field({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
   return (
      <div className="space-y-1.5">
         <Label className="text-sm font-semibold text-foreground tracking-tight">
            {label}
            {required && <span className="ml-1 text-rose-500">*</span>}
         </Label>
         {children}
         {error && (
            <div className="flex items-center gap-1.5">
               <AlertCircle className="w-3.5 h-3.5 text-destructive shrink-0" />
               <p className="text-xs text-destructive">{error}</p>
            </div>
         )}
      </div>
   );
}


interface DeleteModalProps {
   service: ServiceInterface | null;
   open: boolean;
   onClose: () => void;
   onDeleted: (id: string) => void;
}

export function DeleteModal({ service, open, onClose, onDeleted }: DeleteModalProps) {
   const [isPending, startTransition] = useTransition();
   const [error, setError] = useState<string | null>(null);

   const handleDelete = () => {
      if (!service) return;
      setError(null);

      startTransition(async () => {
         const result = await deleteService(service.id);
         if (result.success) {
            onDeleted(service.id);
            onClose();
         } else {
            setError(result.message ?? "Delete failed. Please try again.");
         }
      });
   };

   return (
      <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
         <DialogContent className="sm:max-w-md bg-background border-border/60">
            <DialogHeader className="space-y-3">
               <div className="mx-auto w-12 h-12 rounded-full bg-destructive/10 dark:bg-destructive/20 flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-destructive" />
               </div>
               <DialogTitle className="text-center text-lg font-bold tracking-tight">Delete Service</DialogTitle>
               <DialogDescription className="text-center text-sm text-muted-foreground">
                  Are you sure you want to delete <span className="font-semibold text-foreground">&quot;{service?.title}&quot;</span>? This action cannot be undone.
               </DialogDescription>
            </DialogHeader>

            {/* Warning box */}
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 my-1">
               <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
               <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">The service will be permanently removed from the system and cannot be recovered.</p>
            </div>

            {/* Error */}
            {error && (
               <div className="flex items-start gap-2.5 p-3 rounded-lg bg-destructive/8 dark:bg-destructive/15 border border-destructive/20">
                  <AlertCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                  <p className="text-sm text-destructive">{error}</p>
               </div>
            )}

            <DialogFooter className="flex-col sm:flex-row gap-2 mt-2">
               <Button variant="outline" className="flex-1 border-border/60" onClick={onClose} disabled={isPending}>
                  Cancel
               </Button>
               <Button variant="destructive" className="flex-1" onClick={handleDelete} disabled={isPending}>
                  {isPending ? (
                     <>
                        <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                        Deleting…
                     </>
                  ) : (
                     <>
                        <Trash2 className="mr-2 h-3.5 w-3.5" />
                        Delete Service
                     </>
                  )}
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}

interface EditModalProps {
   service: ServiceInterface | null;
   open: boolean;
   onClose: () => void;
   onUpdated: (updated: ServiceInterface) => void;
}

export function EditModal({ service, open, onClose, onUpdated }: EditModalProps) {
   const [isPending, startTransition] = useTransition();
   const [errors, setErrors] = useState<Record<string, string>>({});
   const [globalError, setGlobalError] = useState<string | null>(null);
   const [success, setSuccess] = useState(false);

   // local controlled state so form reflects current service
   const [title, setTitle] = useState(service?.title ?? "");
   const [description, setDescription] = useState(service?.description ?? "");
   const [iconName, setIconName] = useState(service?.icon ?? "Zap");
   const [status, setStatus] = useState<ServiceInterface["status"]>(service?.status ?? "ACTIVE");

   // sync when service prop changes (dialog opens for a different row)
   const syncState = () => {
      setTitle(service?.title ?? "");
      setDescription(service?.description ?? "");
      setIconName(service?.icon ?? "Zap");
      setStatus(service?.status ?? "ACTIVE");
      setErrors({});
      setGlobalError(null);
      setSuccess(false);
   };

   const handleSubmit = () => {
      if (!service) return;
      setErrors({});
      setGlobalError(null);

      // Client-side validation
      const newErrors: Record<string, string> = {};
      if (!title.trim() || title.trim().length < 2) newErrors.title = "Title must be at least 2 characters.";
      if (!description.trim() || description.trim().length < 10) newErrors.description = "Description must be at least 10 characters.";
      if (Object.keys(newErrors).length > 0) {
         setErrors(newErrors);
         return;
      }

      startTransition(async () => {
         const result = await updateServiceStatus({
            id: service.id,
            title: title.trim(),
            description: description.trim(),
            iconName,
            status,
         });

         if (result.success) {
            setSuccess(true);
            onUpdated({
               ...service,
               title: title.trim(),
               description: description.trim(),
               icon: iconName as ServiceInterface["icon"],
               status,
            });
            setTimeout(() => {
               setSuccess(false);
               onClose();
            }, 900);
         } else if (result.errors) {
            setErrors(result.errors);
         } else {
            setGlobalError(result.message ?? "Update failed. Please try again.");
         }
      });
   };

   return (
      <Dialog
         open={open}
         onOpenChange={(v) => {
            if (!v) onClose();
            else syncState();
         }}
      >
         <DialogContent className="sm:max-w-lg bg-background border-border/60" >
            <DialogHeader className="space-y-1 pb-2">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center shrink-0">
                     <Pencil className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                     <DialogTitle className="text-base font-bold tracking-tight">Edit Service</DialogTitle>
                     <DialogDescription className="text-xs text-muted-foreground mt-0.5">Update the details for this service entry.</DialogDescription>
                  </div>
                  <Badge variant="secondary" className="ml-auto text-[11px] px-2 py-0.5 h-auto">
                     #{service?.id?.slice(0, 8)}
                  </Badge>
               </div>
            </DialogHeader>

            <div className="space-y-4 py-1">
               {/* Icon + Status */}
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="Icon">
                     <Select value={iconName} >
                        <SelectTrigger className="h-10 bg-muted/40 dark:bg-muted/20 border-border/60 hover:border-primary/50 text-sm">
                           <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                           {ICON_OPTIONS.map((o) => (
                              <SelectItem key={o.value} value={o.value}>
                                 <span className="flex items-center gap-2">
                                    <span>{o.emoji}</span>
                                    <span>{o.label}</span>
                                 </span>
                              </SelectItem>
                           ))}
                        </SelectContent>
                     </Select>
                  </Field>

                  <Field label="Status">
                     <Select value={status} onValueChange={(v) => setStatus(v as ServiceInterface["status"])}>
                        <SelectTrigger className="h-10 bg-muted/40 dark:bg-muted/20 border-border/60 hover:border-primary/50 text-sm">
                           <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="ACTIVE">
                              <span className="flex items-center gap-2">
                                 <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                 Active
                              </span>
                           </SelectItem>
                           <SelectItem value="INACTIVE">
                              <span className="flex items-center gap-2">
                                 <span className="w-2 h-2 rounded-full bg-slate-400" />
                                 Inactive
                              </span>
                           </SelectItem>
                        </SelectContent>
                     </Select>
                  </Field>
               </div>

               {/* Title */}
               <Field label="Title" required error={errors.title}>
                  <Input
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                     placeholder="e.g., High-Speed Digital Printing"
                     className={cn(
                        "h-10 bg-muted/40 dark:bg-muted/20 border-border/60 text-sm",
                        "placeholder:text-muted-foreground/50 hover:border-primary/50",
                        "focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/30 transition-colors",
                        errors.title && "border-destructive focus-visible:ring-destructive/30",
                     )}
                  />
               </Field>

               {/* Description */}
               <Field label="Description" required error={errors.description}>
                  <Textarea
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                     placeholder="Describe the service..."
                     rows={3}
                     className={cn(
                        "bg-muted/40 dark:bg-muted/20 border-border/60 text-sm resize-none",
                        "placeholder:text-muted-foreground/50 hover:border-primary/50",
                        "focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/30 transition-colors",
                        errors.description && "border-destructive focus-visible:ring-destructive/30",
                     )}
                  />
               </Field>

               {/* Global error */}
               {globalError && (
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/8 dark:bg-destructive/15 border border-destructive/20">
                     <AlertCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                     <p className="text-sm text-destructive">{globalError}</p>
                  </div>
               )}

               {/* Success */}
               {success && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50">
                     <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                     <p className="text-sm text-emerald-700 dark:text-emerald-400 font-medium">Service updated successfully!</p>
                  </div>
               )}
            </div>

            <DialogFooter className="flex-col sm:flex-row gap-2 pt-2">
               <Button variant="outline" className="flex-1 border-border/60" onClick={onClose} disabled={isPending}>
                  Cancel
               </Button>
               <Button className="flex-1 font-semibold shadow-sm hover:shadow-md" onClick={handleSubmit} disabled={isPending || success}>
                  {isPending ? (
                     <>
                        <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                        Updating…
                     </>
                  ) : success ? (
                     <>
                        <CheckCircle2 className="mr-2 h-3.5 w-3.5" />
                        Updated!
                     </>
                  ) : (
                     <>
                        <Sparkles className="mr-2 h-3.5 w-3.5" />
                        Save Changes
                     </>
                  )}
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}
