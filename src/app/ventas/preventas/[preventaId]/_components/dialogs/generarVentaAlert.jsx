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
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { createVentaRequestClient } from '@/app/ventas/preventas/[preventaId]/_services/requests';

export function GenerarVentaAlert({
  isOpen,
  setIsOpen,
  preventaId,
  actionAfterComplete = 'refresh',
}) {
  const router = useRouter();

  const handleCreateVenta = async () => {
    try {
      setIsOpen(false);
      toast.promise(createVentaRequestClient(preventaId), {
        loading: 'Creando Venta...',
        success: (response) => {
          if (actionAfterComplete === 'refresh') {
            router.refresh();
            return `Venta creada correctamente`;
          }
          if (actionAfterComplete === 'push') {
            router.push(`/ventas/${response?._id}`);
            return `Venta creada correctamente`;
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
            <AlertDialogTitle>Confirmar Generación de Venta</AlertDialogTitle>
            <AlertDialogDescription>
              Estás a punto de transformar esta preventa en una venta. Al
              continuar, la preventa será eliminada y el registro se moverá al
              apartado de ventas. ¿Estás seguro de que deseas continuar?
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
              onClick={handleCreateVenta}
            >
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
