import { ServiceInterface } from "@/Types/service";
import { useState, useTransition } from "react";
import { Loader2, Trash2, AlertTriangle, CheckCircle2, AlertCircle, Sparkles, Pencil } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteOrder } from "@/components/module/order/OrderAcrion";
import { IOrder } from "./OrderTable";

interface DeleteModalProps {
   order: IOrder | null;
   open: boolean;
   onClose: () => void;
   onDeleted: (id: string) => void;
}
export function DeleteModal({ order, open, onClose, onDeleted }: DeleteModalProps) {
   const [isPending, startTransition] = useTransition();
   const [error, setError] = useState<string | null>(null);

   const handleDelete = () => {
      if (!order) return;
      setError(null);

      startTransition(async () => {
         const result = await deleteOrder(order.id);
         if (result.success) {
            onDeleted(order.id);
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
                  Are you sure you want to delete <span className="font-semibold text-foreground">&quot;{order?.customerName}&quot;</span>? This action cannot be undone.
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