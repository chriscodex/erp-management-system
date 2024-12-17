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
import { deleteMotoRequestClient } from '@/app/inventario/motos/modelos/[modeloId]/unidades/_services/requests';

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
export function DeleteMotoAlert({
  isOpen,
  setIsOpen,
  motoId,
  modeloId,
  actionAfterComplete = 'refresh',
}) {
  const router = useRouter();

  const handleConfirmationDeleteProduct = async () => {
    try {
      setIsOpen(false);
      toast.promise(deleteMotoRequestClient(motoId), {
        loading: 'Eliminando...',
        success: () => {
          if (actionAfterComplete === 'refresh') {
            router.refresh();
            return `Moto eliminada correctamente`;
          }
          if (actionAfterComplete === 'push') {
            router.push(`/inventario/motos/modelos/${modeloId}`);
            return `Moto eliminada correctamente`;
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
              Esta acción no se puede deshacer. Esta moto será permanentemente
              eliminada y no podrás recuperar sus datos.
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
              onClick={handleConfirmationDeleteProduct}
            >
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
