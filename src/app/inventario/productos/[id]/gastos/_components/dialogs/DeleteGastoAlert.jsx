'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { deleteGastoRequestClient } from '@/app/inventario/productos/[id]/gastos/_services/requests';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function DeleteGastoAlert({
  isOpen,
  setIsOpen,
  gastoId,
  productId,
  actionAfterComplete,
}) {
  const router = useRouter();

  const handleConfirmationDeleteGasto = async () => {
    try {
      setIsOpen(false);
      toast.promise(deleteGastoRequestClient(gastoId, productId), {
        loading: 'Eliminando...',
        success: () => {
          if (actionAfterComplete === 'refresh') {
            router.refresh();
            return `Gasto eliminado correctamente`;
          }
          if (actionAfterComplete === 'push') {
            router.push(`/inventario/productos/${productId}/gastos`);
            return `Gasto eliminado correctamente`;
          }
        },
        error: (error) => {
          return error;
        },
      });
    } catch (error) {}
  };

  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás completamente seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Este gasto será permanentemente
              eliminado y no podrás recuperar sus datos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="bg-secondary text-secondary-foreground hover:opacity-80"
              onClick={() => setIsOpen(false)}
            >
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleConfirmationDeleteGasto}
            >
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
