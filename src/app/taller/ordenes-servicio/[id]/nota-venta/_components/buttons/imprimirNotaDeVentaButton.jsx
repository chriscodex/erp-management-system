'use client';

import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { RiPrinterLine } from '@remixicon/react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { PdfNotaDeVenta } from '@/app/taller/ordenes-servicio/[id]/nota-venta/_components/pdf/pdfNotaDeVenta';
import {
  getCurrentCounterNotaDeVentaRequestClient,
  updateNotaDeVentaStateRequestClient,
} from '@/app/taller/ordenes-servicio/[id]/nota-venta/_services/requests';
import { formatearCodigoCounterBoletaFactura } from '@/lib/formateador';
import { EmpresasSelect } from '@/app/ventas/[ventaId]/_components/empresasSelect';

export function ImprimirNotaDeVentaButton({ ordenDeServicioData, empresas }) {
  const router = useRouter();

  const [selectedEmpresa, setSelectedEmpresa] = useState(null || empresas[0]);
  const [loading, setLoading] = useState(false);

  const handleDownloadPDF = async () => {
    setLoading(true);
    try {
      const counterNotaDeVenta =
        await getCurrentCounterNotaDeVentaRequestClient();

      const codigoNotaDeVenta = formatearCodigoCounterBoletaFactura(
        counterNotaDeVenta,
        'nota-venta',
      );

      const doc = (
        <PdfNotaDeVenta
          ordenDeServicioData={ordenDeServicioData}
          counterNotaDeVenta={counterNotaDeVenta}
          empresaSeleccionada={selectedEmpresa}
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

      await updateNotaDeVentaStateRequestClient(ordenDeServicioData?._id);
      router.refresh();
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
