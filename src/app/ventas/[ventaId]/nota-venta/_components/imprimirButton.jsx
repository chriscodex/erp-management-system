/*  */ 'use client';

import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { RiPrinterLine } from '@remixicon/react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { PdfNotaVenta } from '@/app/ventas/[ventaId]/nota-venta/_components/pdf/pdfNotaVenta';
import { EmpresasSelect } from '@/app/ventas/[ventaId]/_components/empresasSelect';
export function ImprimirBoletaButton({ ventaData, empresas }) {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const selectedEmpresaSinFormatear = empresas.find(
    (empresa) => empresa.ruc === ventaData?.empresa?.ruc,
  );

  const [selectedEmpresaId, setSelectedEmpresaId] = useState(
    selectedEmpresaSinFormatear?._id || empresas[0]?._id || '',
  );

  // Siempre obtener el objeto empresa seleccionado a partir del id
  const empresaSeleccionada = empresas.find((e) => e._id === selectedEmpresaId);

  const handleDownloadPDF = async () => {
    try {
      const isBoletaEmitida = ventaData?.comprobante
        .toLowerCase()
        .includes('boleta');

      const isFacturaEmitida = ventaData?.comprobante
        .toLowerCase()
        .includes('factura');

      const empresaParaPDF =
        isBoletaEmitida || isFacturaEmitida
          ? ventaData?.empresa
          : empresaSeleccionada;

      const doc = (
        <PdfNotaVenta ventaData={ventaData} selectedEmpresa={empresaParaPDF} />
      );
      const blob = await pdf(doc).toBlob();

      // Crear un enlace temporal y forzar la descarga
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `nota-venta.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    }
    router.refresh();
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center gap-4 md:flex-row">
      <EmpresasSelect
        empresas={empresas}
        selectedEmpresaId={selectedEmpresaId}
        setSelectedEmpresaId={setSelectedEmpresaId}
        disabled={!!ventaData?.empresa}
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
