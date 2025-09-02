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
import { deleteGastoGeneralRequestClient } from '@/app/gastos-generales/_services/requests';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

function DeleteGastoGeneralAlert({
  isOpen,
  setIsOpen,
  gastoGeneralId,
  actionAfterComplete,
}) {
  const router = useRouter();

  const handleConfirmationDeleteGastoGeneral = async () => {
    try {
      setIsOpen(false);
      toast.promise(deleteGastoGeneralRequestClient(gastoGeneralId), {
        loading: 'Eliminando...',

        success: () => {
          if (actionAfterComplete === 'refresh') {
            router.refresh();
            return `Gasto general eliminado correctamente`;
          }
          if (actionAfterComplete === 'push') {
            router.push('/gastos-generales');
            return `Gasto general eliminado correctamente`;
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
              Esta acción no se puede deshacer. Este gasto general será
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
              onClick={handleConfirmationDeleteGastoGeneral}
            >
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export { DeleteGastoGeneralAlert };
