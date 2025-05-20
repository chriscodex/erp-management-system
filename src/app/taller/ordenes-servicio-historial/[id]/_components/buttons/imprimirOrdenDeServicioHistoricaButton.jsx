"use client";
import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { RiPrinterLine } from '@remixicon/react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { PdfOrdenDeServicioHistorica} from '@/app/taller/ordenes-servicio-historial/[id]/_components/pdf/pdfOrdenDeServicioHistorica';

export function ImprimirOrdenDeServicioHistoricaButton({ ordenDeServicioHistoricaData }) {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleDownloadPDF = async () => {
    setLoading(true);
    try {
      const doc = (
        <PdfOrdenDeServicioHistorica
          ordenDeServicioHistoricaData={ordenDeServicioHistoricaData}
        />
      );
      const blob = await pdf(doc).toBlob();

      // Crear un enlace temporal y forzar la descarga
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `orden-de-servicio-${ordenDeServicioHistoricaData?.code}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      router.refresh();
    } catch (error) {
      console.error("Error al generar el PDF:", error);
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
        <RiPrinterLine/>
        Imprimir Orden de Servicio
      </Button>
    </>
  );
}
