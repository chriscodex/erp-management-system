'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { RiLock2Fill } from '@remixicon/react';

import { Button } from '@/components/ui/button';

import { FinalizarVentaAlert } from '@/app/ventas/[ventaId]/boleta/_components/dialogs/finalizarVentaAlert';

export function DetailBoletaButtons({ ventaId }) {
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
          variant="default"
          className="flex items-center"
          onClick={() => setIsOpenDialogDelete(true)}
        >
          <RiLock2Fill className="mr-1 h-4 w-4" />
          Finalizar Venta
        </Button>
      </div>
      {/* Dialog Delete */}
      <FinalizarVentaAlert
        isOpen={isOpenDialogDelete}
        setIsOpen={setIsOpenDialogDelete}
        ventaId={ventaId}
        actionAfterComplete="push"
      />
    </>
  );
}
