'use client';

import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { RiPrinterLine } from '@remixicon/react';

import { Button } from '@/components/ui/button';
import { PdfBoleta } from '@/app/inventario/motos/reservaciones/[id]/boleta/_components/pdf/PdfBoleta';
// import { getCurrentCounterBoletaRequestClient } from '@/app/ventas/[ventaId]/boleta/_services/requests';

export function ImprimirBoletaButton({reservacionData}) {
  
  const [loading, setLoading] = useState(false);

  const handleDownloadPDF = async () => {
    setLoading(true);
    try {
      // const counterBoleta = await getCurrentCounterBoletaRequestClient();
     

      const doc = <PdfBoleta reservacionData={reservacionData} counterBoleta={2000} />;
      const blob = await pdf(doc).toBlob();

      // Crear un enlace temporal y forzar la descarga
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'boleta.pdf';
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
