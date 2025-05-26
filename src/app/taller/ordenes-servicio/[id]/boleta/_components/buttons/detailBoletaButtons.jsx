'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { RiLock2Fill } from '@remixicon/react';
import { PDFViewer } from '@react-pdf/renderer';

import { Button } from '@/components/ui/button';

import { FinalizarVentaAlert } from '@/app/ventas/[ventaId]/_components/dialogs/finalizarVentaAlert';
import { PdfBoleta } from '@/app/ventas/[ventaId]/boleta/_components/pdf/pdfBoleta';

export function DetailBoletaButtons({ ventaId, ventaData, counterBoleta }) {
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
      <div className="mt-8">
        <PDFViewer width="100%" height="600px">
          <PdfBoleta ventaData={ventaData} counterBoleta={counterBoleta} />
        </PDFViewer>
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
