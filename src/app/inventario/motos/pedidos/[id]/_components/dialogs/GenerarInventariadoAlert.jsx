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
import { inventariarPedidoRequestClient } from '@/app/inventario/motos/pedidos/[id]/_services/requests';
export function GenerarInventariadoAlert({
  isOpen,
  setIsOpen,
  pedidoId,
  actionAfterComplete = 'refresh',
}) {
  const router = useRouter();

  const handleInventariarPedido = async () => {
    try {
      setIsOpen(false);
      toast.promise(inventariarPedidoRequestClient(pedidoId), {
        loading: 'Inventariando pedido...',
        success: (response) => {
          if (actionAfterComplete === 'refresh') {
            router.refresh();
            return `Pedido inventariado correctamente`;
          }
          if (actionAfterComplete === 'push') {
            // router.push(`/modelos/${response?._id}`);
            router.push(`/inventario/motos/modelos`);
            return `Pedido inventariado correctamente`;
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
            <AlertDialogTitle>Confirmar Generación de Inventariado</AlertDialogTitle>
            <AlertDialogDescription>
              Estás a punto de pasar este pedido al inventario de motos. Al
              continuar, el pedido será eliminado y el registro se moverá al
              apartado de motos. ¿Estás seguro de que deseas continuar?
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
              onClick={handleInventariarPedido}
            >
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
