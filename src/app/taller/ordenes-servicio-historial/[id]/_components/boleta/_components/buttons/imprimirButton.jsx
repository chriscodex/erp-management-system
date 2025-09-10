/*  */ 'use client';

import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { RiPrinterLine } from '@remixicon/react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { PdfBoleta } from '@/app/taller/ordenes-servicio/[id]/boleta/_components/pdf/pdfBoleta';
import {
  getCurrentCounterBoletaRequestClient,
  updateBoletaStateRequestClient,
} from '@/app/taller/ordenes-servicio/[id]/boleta/_services/requests';
import { formatearCodigoCounterBoletaFactura } from '@/lib/formateador';
import { EmpresasSelect } from '@/app/ventas/[ventaId]/_components/empresasSelect';

export function ImprimirBoletaButton({
  ordenDeServicioData,
  empresas,
  onSaveCounterBoleta,
}) {
  const router = useRouter();

  const [selectedEmpresa, setSelectedEmpresa] = useState(null || empresas[0]);
  const [loading, setLoading] = useState(false);

  const handleDownloadPDF = async () => {
    setLoading(true);
    try {
      const counterBoleta = await getCurrentCounterBoletaRequestClient();

      const codigoBoleta = formatearCodigoCounterBoletaFactura(
        counterBoleta,
        'boleta',
      );

      const doc = (
        <PdfBoleta
          ordenDeServicioData={ordenDeServicioData}
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

      await updateBoletaStateRequestClient(ordenDeServicioData?._id);

      onSaveCounterBoleta(counterBoleta);

      router.refresh();
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center gap-4 md:flex-row">
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
