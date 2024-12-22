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
import { reduceUnitProductRequestClient } from '@/app/inventario/productos/[id]/_services/requests';

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
export function ReduceStockProductAlert({
  isOpenDialog,
  setIsOpenDialog,
  productId,
  cantidadADisminuir,
  setFormSubmitIsLoading,
  onClose,
  stock,
}) {
  const router = useRouter();

  const handleConfirmationDelete = async () => {
    try {
      setIsOpenDialog(false);
      toast.promise(
        reduceUnitProductRequestClient(
          productId,
          cantidadADisminuir,
          setFormSubmitIsLoading
        ),
        {
          loading: 'Procesando...',
          success: () => {
            onClose();
            router.refresh();
            return `Cantidad agregada correctamente`;
          },
          error: (error) => {
            setFormSubmitIsLoading(false);
            return error;
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <AlertDialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás completamente seguro?</AlertDialogTitle>
            {cantidadADisminuir === 1 ? (
              <AlertDialogDescription>
                Esta acción no se puede deshacer. Se eliminará la última unidad
                en stock, el ID {stock}.
              </AlertDialogDescription>
            ) : (
              <AlertDialogDescription>
                Esta acción no se puede deshacer. Se eliminarán las últimas{' '}
                {cantidadADisminuir} unidades en stock, desde el ID {stock}{' '}
                hasta el ID {stock - cantidadADisminuir + 1}.
              </AlertDialogDescription>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="bg-secondary text-secondary-foreground hover:opacity-80"
              onClick={() => setIsOpenDialog(false)}
            >
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleConfirmationDelete}
            >
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
