'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { RiLock2Fill } from '@remixicon/react';
import { PDFViewer } from '@react-pdf/renderer';

import { Button } from '@/components/ui/button';

import { FinalizarVentaAlert } from '@/app/ventas/[ventaId]/_components/dialogs/finalizarVentaAlert';
import { PdfFactura } from '@/app/ventas/[ventaId]/factura/_components/pdf/pdfFactura';

export function DetailFacturaButtons({ ventaId, ventaData, empresas}) {
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
              Finalizar Venta
            </Button>
          </div>
          <div className="mt-8">
            <PDFViewer width="100%" height="600px">
              <PdfFactura ventaData={ventaData} counterFactura={2000} empresas={empresas}/>
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
