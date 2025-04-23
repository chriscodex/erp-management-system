"use client";
import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { RiPrinterLine } from '@remixicon/react';
// import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { PdfConfirmacionReservacion } from '@/app/inventario/motos/reservaciones/[id]/confirmacion/_components/pdf/PdfConfirmacionReservacion';


export function ImprimirConfirmacionReservacionButton({reservacionData}) {

// const PdfConfirmacionReservacion = dynamic(
//   () => import('@/app/inventario/motos/reservaciones/[id]/confirmacion/_components/pdf/PdfConfirmacionReservacion'),
//   { ssr: false }
// );

  const [loading, setLoading] = useState(false);

  const handleDownloadPDF = async () => {
    setLoading(true);
    try {
      const doc = (
              <PdfConfirmacionReservacion
                reservacionData={reservacionData}
              />
            );
      const blob = await pdf(doc).toBlob();

      // Crear un enlace temporal y forzar la descarga
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `confirmacion-reservacion-${reservacionData?.code}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    }
    setLoading(false);
  };

  return (
    <Button variant="default" className="flex items-center gap-2" onClick={handleDownloadPDF} disabled={loading}>
      <RiPrinterLine className="h-4 w-4" />
      <p>{loading ? 'Generando...' : 'Imprimir'}</p>
    </Button>
  );
}
