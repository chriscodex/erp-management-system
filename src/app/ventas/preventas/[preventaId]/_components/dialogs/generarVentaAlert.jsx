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
import { deletePreventaRequestClient } from '@/app/ventas/preventas/[preventaId]/_services/requests';

/**
 * @description Un dialog de confirmación de eliminación de una marca.
 *
 * @param {boolean} isOpen - Indica si el diálogo está abierto o no.
 * @param {(isOpen: boolean) => void} setIsOpen - Función que se llama para cambiar el estado de apertura del dialog.
 * @param {string} id - ID de la marca a eliminar.
 * @param {'refresh' | 'push'} actionAfterComplete - Acción a realizar después de eliminar la marca:
 * - 'refresh': Refrescar la página actual.
 * - 'push': Redirigir a la ruta '/inventario/marcas'.
 *
 * @returns Un JSX con el diálogo de confirmación de eliminación de una marca.
 */
export function GenerarVentaAlert({
  isOpen,
  setIsOpen,
  preventaId,
  actionAfterComplete = 'refresh',
}) {
  const router = useRouter();

  const handleConfirmationDeleteProduct = async () => {
    try {
      setIsOpen(false);
      toast.promise(deletePreventaRequestClient(preventaId), {
        loading: 'Eliminando...',
        success: () => {
          if (actionAfterComplete === 'refresh') {
            router.refresh();
            return `Preventa eliminada correctamente`;
          }
          if (actionAfterComplete === 'push') {
            router.push(`/ventas/${preventaId}`);
            return `Preventa eliminada correctamente`;
          }
        },
        error: (error) => {
          return error;
        },
      });
    } catch (error) {}
  };

  const handleGenerarVenta = async () => {
    router.push(`/ventas/${preventaId}`);
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
              onClick={handleGenerarVenta}
            >
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
