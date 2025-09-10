'use client';

import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { RiPrinterLine } from '@remixicon/react';

import { Button } from '@/components/ui/button';
import { PdfNotaDeVenta } from '@/app/taller/ordenes-servicio/[id]/nota-venta/_components/pdf/pdfNotaDeVenta';
import { EmpresasSelect } from '@/app/ventas/[ventaId]/_components/empresasSelect';

export function ImprimirNotaDeVentaButton({ ordenDeServicioData, empresas }) {
  const selectedEmpresaSinFormatear = empresas.find(
    (empresa) => empresa.ruc === ordenDeServicioData?.empresa?.ruc,
  );

  const [selectedEmpresaId, setSelectedEmpresaId] = useState(
    selectedEmpresaSinFormatear?._id || empresas[0]?._id || '',
  );

  const empresaSeleccionada = empresas.find((e) => e._id === selectedEmpresaId);

  const [loading, setLoading] = useState(false);

  const handleDownloadPDF = async () => {
    setLoading(true);
    try {
      const codigoNotaDeVenta = ordenDeServicioData?.code;

      const doc = (
        <PdfNotaDeVenta
          ordenDeServicioData={ordenDeServicioData}
          codigoNotaDeVenta={codigoNotaDeVenta}
          empresaSeleccionada={empresaSeleccionada}
        />
      );
      const blob = await pdf(doc).toBlob();

      // Crear un enlace temporal y forzar la descarga
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `nota-venta-${codigoNotaDeVenta}.pdf`;
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
        selectedEmpresaId={selectedEmpresaId}
        setSelectedEmpresaId={setSelectedEmpresaId}
        disabled={false}
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
