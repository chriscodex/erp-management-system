'use client';

import { RiPrinterLine } from '@remixicon/react';
import { PDFDownloadLink } from '@react-pdf/renderer';

import { Button } from '@/components/ui/button';

import { PdfBoleta } from '@/app/ventas/[ventaId]/boleta/_components/pdf/pdfBoleta';

export function ImprimirBoletaButton({ ventaData }) {
  return (
    <PDFDownloadLink
      document={<PdfBoleta ventaData={ventaData} />}
      fileName="boleta.pdf"
    >
      <Button variant="default" className="flex items-center gap-2">
        <RiPrinterLine className="h-4 w-4" />
        <p>Imprimir</p>
      </Button>
    </PDFDownloadLink>
  );
}
