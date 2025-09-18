'use client';

import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { RiEditFill } from '@remixicon/react';

import { Button } from '@/components/ui/button';

import { DeletePedidoAlert } from '@/app/inventario/motos/pedidos/_components/dialogs/DeletePedidoAlert';

export function DetailPedidoButtons({ pedidoId }) {
  const router = useRouter();
  const [isOpenDialogDelete, setIsOpenDialogDelete] = useState(false);

  useEffect(() => {
    // Fuerza la actualización de los datos cada vez que se accede a la página
    router.refresh();
  }, [router]);

  return (
    <>
      <div className="flex justify-end space-x-4">
        <Button
          onClick={() => {
            router.push(`/inventario/motos/pedidos/${pedidoId}/edit`);
          }}
          variant="outline"
          className="flex items-center"
        >
          <RiEditFill className="mr-2 h-4 w-4" />
          Editar
        </Button>
        <Button
          variant="destructive"
          className="flex items-center"
          onClick={() => setIsOpenDialogDelete(true)}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Eliminar
        </Button>
      </div>

      {/* Dialog Delete */}
      <DeletePedidoAlert
        isOpen={isOpenDialogDelete}
        setIsOpen={setIsOpenDialogDelete}
        pedidoId={pedidoId}
        actionAfterComplete="push"
      />
    </>
  );
}
