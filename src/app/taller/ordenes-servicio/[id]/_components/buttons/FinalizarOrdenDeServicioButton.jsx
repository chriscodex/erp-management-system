'use client';

import { useState } from 'react';
import { RiFileCopy2Line} from '@remixicon/react';

import { Button } from '@/components/ui/button';

import { FinalizarOrdenDeServicioAlert } from '@/app/taller/ordenes-servicio/[id]/_components/dialogs/FinalizarOrdenDeServicioAlert';

export function FinalizarOrdenDeServicioButton({ ordenDeServicioId }) {

  const [isOpenDialogDelete, setIsOpenDialogDelete] = useState(false);

  return (
    <>
      <div className="flex justify-end space-x-4">
        <Button
          className="flex items-center bg-green-600 hover:bg-green-700"
          onClick={() => setIsOpenDialogDelete(true)}
        >
          <RiFileCopy2Line className="mr-2 h-4 w-4" />
          Finalizar Orden de Servicio
        </Button>
      </div>
      {/* Dialog Delete */}
      <FinalizarOrdenDeServicioAlert
        isOpen={isOpenDialogDelete}
        setIsOpen={setIsOpenDialogDelete}
        ordenDeServicioId={ordenDeServicioId}
        actionAfterComplete="push"
      />
    </>
  );
}
