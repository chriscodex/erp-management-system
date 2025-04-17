'use client';

import { useState } from 'react';
import { RiBox3Fill} from '@remixicon/react';

import { Button } from '@/components/ui/button';

import { GenerarInventariadoAlert } from '@/app/inventario/motos/pedidos/[id]/_components/dialogs/GenerarInventariadoAlert';

export function GenerarInventariadoButton({ pedidoId }) {
  const [isOpenDialogDelete, setIsOpenDialogDelete] = useState(false);

  return (
    <>
      <div className="flex justify-end space-x-4">
        <Button
          className="flex items-center bg-green-600 hover:bg-green-700"
          onClick={() => setIsOpenDialogDelete(true)}
        >
          <RiBox3Fill className="mr-2 h-4 w-4" />
          Mover a Inventario
        </Button>
      </div>
      {/* Dialog Delete */}
      <GenerarInventariadoAlert
        isOpen={isOpenDialogDelete}
        setIsOpen={setIsOpenDialogDelete}
        pedidoId={pedidoId}
        actionAfterComplete="push"
      />
    </>
  );
}
