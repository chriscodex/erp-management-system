'use client';

import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { RiPrinterLine } from '@remixicon/react';

import { Button } from '@/components/ui/button';
import { PdfBoleta } from '@/app/ventas/[ventaId]/boleta/_components/pdf/pdfBoleta';
import { getCurrentCounterBoletaRequestClient } from '@/app/ventas/[ventaId]/boleta/_services/requests';

export function ImprimirBoletaButton({ ventaData }) {
  const [loading, setLoading] = useState(false);

  const handleDownloadPDF = async () => {
    setLoading(true);
    try {
      const counterBoleta = await getCurrentCounterBoletaRequestClient();
      console.log('counterBoleta', counterBoleta);
      const doc = <PdfBoleta ventaData={ventaData} counterBoleta={counterBoleta} />;
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
