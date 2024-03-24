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
import { deleteUserRequestClient } from '@/app/usuarios/_services/requests';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

/**
 * @description Un diálogo de confirmación de eliminación de un usuario.
 *
 * @param {boolean} isOpen - Indica si el diálogo está abierto o no.
 * @param {(isOpen: boolean) => void} setIsOpen - Función que se llama para cambiar el estado de apertura del diálogo.
 * @param {string} userDni - DNI del usuario a eliminar.
 * @param {'refresh' | 'push'} actionAfterComplete - Acción a realizar después de eliminar el usuario:
 * - 'refresh': Refrescar la página actual.
 * - 'push': Redirigir a la ruta '/usuarios'.
 *
 * @returns Un JSX con el diálogo de confirmación de eliminación de un usuario.
 */
function DeleteUserAlert({ isOpen, setIsOpen, userDni, actionAfterComplete }) {
  const router = useRouter();

  const handleConfirmationDeleteUser = async () => {
    try {
      setIsOpen(false);
      toast.promise(deleteUserRequestClient(userDni), {
        loading: 'Eliminando...',
        success: () => {
          if (actionAfterComplete === 'refresh') {
            router.refresh();
            return `Usuario eliminado exitosamente`;
          }
          if (actionAfterComplete === 'push') {
            router.push('/usuarios');
            return `Usuario eliminado exitosamente`;
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
            <AlertDialogTitle>Estás completamente seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Este usuario será
              permanentemente eliminado y no podrás recuperar sus datos.
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
              onClick={handleConfirmationDeleteUser}
            >
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export { DeleteUserAlert };
