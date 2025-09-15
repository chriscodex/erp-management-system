'use client';
import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { RiPrinterLine } from '@remixicon/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { PdfBoleta } from '@/app/ventas/ventas-historicas/[id]/_components/boleta/_components/pdf/pdfBoleta';
import { PdfFactura } from '@/app/ventas/ventas-historicas/[id]/_components/factura/_components/pdf/pdfFactura';
import { PdfNotaVenta } from '@/app/ventas/ventas-historicas/[id]/_components/nota-venta/pdfNotaVenta';
import { formatearCodigoCounterBoletaFactura } from '@/lib/formateador';

export function ImprimirComprobanteVentaHistoricaButton({
  ventaHistoricaData,
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleDownloadPDF = async () => {
    setLoading(true);
    try {
      const { comprobante, counter, empresa } = ventaHistoricaData;

      // Elegir si es boleta, factura o solo nota de venta
      const tipoComprobante = comprobante?.toLowerCase().includes('boleta')
        ? 'boleta'
        : comprobante?.toLowerCase().includes('factura')
        ? 'factura'
        : comprobante?.toLowerCase().includes('nota de venta')
        ? 'nota-venta'
        : 'undefined';

      const codigo =
        tipoComprobante === 'boleta' || tipoComprobante === 'factura'
          ? formatearCodigoCounterBoletaFactura(counter, tipoComprobante)
          : ventaHistoricaData.code;

      const doc =
        tipoComprobante === 'boleta' ? (
          <PdfBoleta
            ventaHistoricaData={ventaHistoricaData}
            counterBoleta={counter}
            selectedEmpresa={empresa}
          />
        ) : tipoComprobante === 'factura' ? (
          <PdfFactura
            ventaHistoricaData={ventaHistoricaData}
            counterFactura={counter}
            selectedEmpresa={empresa}
          />
        ) : (
          <PdfNotaVenta
            ventaHistoricaData={ventaHistoricaData}
            codigoNotaDeVenta={ventaHistoricaData?.code}
            selectedEmpresa={empresa}
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
