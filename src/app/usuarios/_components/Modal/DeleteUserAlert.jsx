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
import { deleteUser } from '@/app/usuarios/_services/requests';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

function DeleteUserAlert({ isOpen, setIsOpen, userDni, actionAfterComplete }) {
  const router = useRouter();

  const handleConfirmationDeleteUser = async () => {
    try {
      setIsOpen(false);
      toast.promise(deleteUser(userDni), {
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
            <AlertDialogCancel onClick={() => setIsOpen(false)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmationDeleteUser}>
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export { DeleteUserAlert };
