'use client';

import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { RiPrinterLine } from '@remixicon/react';

import { Button } from '@/components/ui/button';
import { PdfBoleta } from '@/app/ventas/[ventaId]/boleta/_components/pdf/pdfBoleta';
import { getCurrentCounterBoletaRequestClient } from '@/app/ventas/[ventaId]/boleta/_services/requests';
import { formatearCodigoCounterBoletaFactura } from '@/lib/formateador';
import { EmpresasSelect } from '@/app/ventas/[ventaId]/boleta/_components/empresasSelect';

export function ImprimirBoletaButton({ ventaData, empresas }) {
  const [selectedEmpresa, setSelectedEmpresa] = useState(null || empresas[0]);
  const [loading, setLoading] = useState(false);

  const handleDownloadPDF = async () => {
    setLoading(true);
    try {
      const counterBoleta = await getCurrentCounterBoletaRequestClient();

      const codigoBoleta = formatearCodigoCounterBoletaFactura(counterBoleta);

      const doc = (
        <PdfBoleta
          ventaData={ventaData}
          counterBoleta={counterBoleta}
          selectedEmpresa={selectedEmpresa}
        />
      );
      const blob = await pdf(doc).toBlob();

      // Crear un enlace temporal y forzar la descarga
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `boleta-${codigoBoleta}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center gap-4">
      <EmpresasSelect
        empresas={empresas}
        selectedEmpresa={selectedEmpresa}
        setSelectedEmpresa={setSelectedEmpresa}
      />

      <Button
        variant="default"
        className="flex items-center gap-2"
        onClick={handleDownloadPDF}
        disabled={loading}
      >
        <RiPrinterLine className="h-4 w-4" />
        <p>{loading ? 'Generando...' : 'Imprimir'}</p>
      </Button>
    </div>
  );
}
