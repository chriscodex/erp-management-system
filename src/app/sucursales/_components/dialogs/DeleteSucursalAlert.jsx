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
import { deleteSucursalRequestClient } from '@/app/sucursales/_services/requests';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

/**
 * @description Un dialog de confirmación de eliminación de una sucursal.
 *
 * @param {boolean} isOpen - Indica si el diálogo está abierto o no.
 * @param {(isOpen: boolean) => void} setIsOpen - Función que se llama para cambiar el estado de apertura del dialog.
 * @param {string} id - ID de la sucursal a eliminar.
 * @param {'refresh' | 'push'} actionAfterComplete - Acción a realizar después de eliminar la sucursal:
 * - 'refresh': Refrescar la página actual.
 * - 'push': Redirigir a la ruta '/sucursales'.
 *
 * @returns Un JSX con el diálogo de confirmación de eliminación de una sucursal.
 */
export function DeleteSucursalAlert({
  isOpen,
  setIsOpen,
  id,
  actionAfterComplete,
}) {
  const router = useRouter();

  const handleConfirmationDeleteSucursal = async () => {
    try {
      setIsOpen(false);
      toast.promise(deleteSucursalRequestClient(id), {
        loading: 'Eliminando...',
        success: () => {
          if (actionAfterComplete === 'refresh') {
            router.refresh();
            return `Sucursal eliminada correctamente`;
          }
          if (actionAfterComplete === 'push') {
            router.push('/sucursales');
            return `Sucursal eliminada correctamente`;
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
              Esta acción no se puede deshacer. Esta sucursal será
              permanentemente eliminada y no podrás recuperar sus datos.
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
              onClick={handleConfirmationDeleteSucursal}
            >
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
