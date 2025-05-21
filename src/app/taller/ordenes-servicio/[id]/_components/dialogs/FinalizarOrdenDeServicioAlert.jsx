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
import { finalizarOrdenDeServicioRequestClient } from '@/app/taller/ordenes-servicio/[id]/_services/requests';

export function FinalizarOrdenDeServicioAlert({
  isOpen,
  setIsOpen,
  ordenDeServicioId,
  counterBoleta,
  actionAfterComplete = 'refresh',
}) {
  const router = useRouter();

  const handleCreateOrdenDeServicio = async () => {
    try {

      setIsOpen(false);
      toast.promise(finalizarOrdenDeServicioRequestClient(ordenDeServicioId, counterBoleta), {
        loading: 'Finalizando Orden De Servicio...',
        success: () => {
          if (actionAfterComplete === 'refresh') {
            router.refresh();
            return `Orden de Servicio finalizada correctamente`;
          }
          if (actionAfterComplete === 'push') {
            router.push(`/taller/ordenes-servicio-historial`);
            return `Orden de Servicio finalizada correctamente`;
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
            <AlertDialogTitle>Confirmar Finalización de Orden de Servicio</AlertDialogTitle>
            <AlertDialogDescription>
              Estás a punto de finalizar esta orden de servicio. Al
              continuar, la orden de servicio será eliminada y el registro se moverá al
              historial de órdenes de servicio. ¿Estás seguro de que deseas continuar?
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
              onClick={handleCreateOrdenDeServicio}
            >
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
