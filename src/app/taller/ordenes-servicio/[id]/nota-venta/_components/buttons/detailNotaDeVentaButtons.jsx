'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { FinalizarNotaVentaAlert } from '@/app/taller/ordenes-servicio/[id]/nota-venta/_components/dialogs/finalizarNotaVentaAlert';
import { RiLock2Fill } from '@remixicon/react';
import { Button } from '@/components/ui/button';

export function DetailNotaVentaButtons({ ordenServicioId }) {
  const router = useRouter();
  const [isOpenDialogDelete, setIsOpenDialogDelete] = useState(false);

  useEffect(() => {
    router.refresh();
  }, [router]);

  return (
    <>
      <div className="flex justify-end space-x-4">
        <Button
          variant="default"
          className="flex items-center"
          onClick={() => setIsOpenDialogDelete(true)}
        >
          <RiLock2Fill className="mr-1 h-4 w-4" />
          Finalizar Orden de Servicio
        </Button>
      </div>
      {/* Dialog Delete */}
      <FinalizarNotaVentaAlert
        isOpen={isOpenDialogDelete}
        setIsOpen={setIsOpenDialogDelete}
        ordenServicioId={ordenServicioId}
        actionAfterComplete="push"
      />
    </>
  );
}
