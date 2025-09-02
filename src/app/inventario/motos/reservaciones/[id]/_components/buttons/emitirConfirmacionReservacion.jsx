'use client';

import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { RiPrinterLine, RiCheckboxCircleLine } from '@remixicon/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

import { PdfConfirmacionReservacion } from '@/app/inventario/motos/reservaciones/[id]/_components/pdf/PdfConfirmacionReservacion';
import { FinalizarReservacionAlert } from '@/app/inventario/motos/reservaciones/_components/dialogs/FinalizarReservacionAlert';

export function EmitirConfirmacionReservacionButton({ reservacionData }) {
  const router = useRouter();

  const [isOpenDialogDelete, setIsOpenDialogDelete] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleDownloadPDF = async () => {
    setLoading(true);
    try {
      const doc = (
        <PdfConfirmacionReservacion reservacionData={reservacionData} />
      );
      const blob = await pdf(doc).toBlob();

      // Crear un enlace temporal y forzar la descarga
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `reservacion-${reservacionData?.code}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      router.refresh();
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    }
    setLoading(false);
  };
  return (
    <>
      <div className="flex flex-row gap-2">
        <Button
          onClick={() => setIsOpenDialogDelete(true)}
          variant="outline"
          className="self-end flex items-center bg-green-600 hover:bg-green-700 text-white hover:text-white"
        >
          <RiCheckboxCircleLine className="mr-2 h-4 w-4" />
          Finalizar Reservación
        </Button>

        {/* <Button
          variant="default"
          className="flex items-center gap-2"
          onClick={handleDownloadPDF}
          disabled={loading}
        >
          <RiPrinterLine className="h-4 w-4" />
          <p>{loading ? "Generando..." : "Imprimir"}</p>
        </Button> */}
        <Button
          className="cursor-pointer"
          onClick={handleDownloadPDF}
          disabled={loading}
        >
          <RiPrinterLine />
          Imprimir Reservación
        </Button>
      </div>

      <FinalizarReservacionAlert
        isOpen={isOpenDialogDelete}
        setIsOpen={setIsOpenDialogDelete}
        reservacionId={reservacionData?._id}
        actionAfterComplete="push"
      />
    </>
  );
}
