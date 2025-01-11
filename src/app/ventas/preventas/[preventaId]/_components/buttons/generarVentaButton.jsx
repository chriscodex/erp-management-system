'use client';

import { useState } from 'react';
import { RiShoppingCartLine } from '@remixicon/react';

import { Button } from '@/components/ui/button';

import { GenerarVentaAlert } from '@/app/ventas/preventas/[preventaId]/_components/dialogs/generarVentaAlert';

export function GenerarVentaButton({ preventaId }) {
  const [isOpenDialogDelete, setIsOpenDialogDelete] = useState(false);

  return (
    <>
      <div className="flex justify-end space-x-4">
        <Button
          className="flex items-center bg-green-600 hover:bg-green-700"
          onClick={() => setIsOpenDialogDelete(true)}
        >
          <RiShoppingCartLine className="mr-2 h-4 w-4" />
          Generar Venta
        </Button>
      </div>
      {/* Dialog Delete */}
      <GenerarVentaAlert
        isOpen={isOpenDialogDelete}
        setIsOpen={setIsOpenDialogDelete}
        preventaId={preventaId}
        actionAfterComplete="push"
      />
    </>
  );
}
