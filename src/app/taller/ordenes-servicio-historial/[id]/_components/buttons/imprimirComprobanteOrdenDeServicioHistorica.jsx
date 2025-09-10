'use client';
import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { RiPrinterLine } from '@remixicon/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { PdfBoleta } from '@/app/taller/ordenes-servicio-historial/[id]/_components/boleta/_components/pdf/pdfBoleta';
import { PdfFactura } from '@/app/taller/ordenes-servicio-historial/[id]/_components/factura/_components/pdf/pdfFactura';
import { formatearCodigoCounterBoletaFactura } from '@/lib/formateador';

export function ImprimirComprobanteOrdenDeServicioHistoricaButton({
  ordenDeServicioHistoricaData,
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleDownloadPDF = async () => {
    setLoading(true);
    try {
      const { comprobante, counter } = ordenDeServicioHistoricaData;

      // Elegir si es boleta o factura
      const tipoComprobante = comprobante?.toLowerCase().includes('boleta')
        ? 'boleta'
        : comprobante?.toLowerCase().includes('factura')
          ? 'factura'
          : 'undefined';
      const codigo = formatearCodigoCounterBoletaFactura(
        counter,
        tipoComprobante,
      );

      // Elegir el documento a renderizar

      const doc =
        tipoComprobante === 'boleta' ? (
          <PdfBoleta
            ordenDeServicioHistoricaData={ordenDeServicioHistoricaData}
            counterBoleta={counter}
            selectedEmpresa={ordenDeServicioHistoricaData?.empresa}
          />
        ) : (
          <PdfFactura
            ordenDeServicioHistoricaData={ordenDeServicioHistoricaData}
            counterFactura={counter}
            selectedEmpresa={ordenDeServicioHistoricaData?.empresa}
          />
        );

      const blob = await pdf(doc).toBlob();

      // Crear un enlace temporal y forzar la descarga
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${tipoComprobante}-${codigo}.pdf`;
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
      <Button
        className="cursor-pointer"
        onClick={handleDownloadPDF}
        disabled={loading}
      >
        <RiPrinterLine />
        Imprimir Comprobante
      </Button>
    </>
  );
}
