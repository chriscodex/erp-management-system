"use client";

import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { RiPrinterLine } from "@remixicon/react";

import { Button } from "@/components/ui/button";
import { PdfFactura } from "@/app/ventas/[ventaId]/factura/_components/pdf/pdfFactura";
import { getCurrentCounterFacturaRequestClient } from "@/app/ventas/[ventaId]/factura/_services/requests";
import { formatearCodigoCounterBoletaFactura } from "@/lib/formateador";
import { EmpresasSelect } from '@/app/ventas/[ventaId]/_components/empresasSelect';

export function ImprimirFacturaButton({ ventaData, empresas }) {

  const [selectedEmpresa, setSelectedEmpresa] = useState(null || empresas[0]);
  
  const [loading, setLoading] = useState(false);

  const handleDownloadPDF = async () => {
    setLoading(true);
    try {
      const counterFactura = await getCurrentCounterFacturaRequestClient();

      const codigoFactura = formatearCodigoCounterBoletaFactura(
        counterFactura,
        "factura"
      );

      const doc = (
        <PdfFactura ventaData={ventaData} counterFactura={counterFactura} empresaSeleccionada={selectedEmpresa}/>
      );
      const blob = await pdf(doc).toBlob();

      // Crear un enlace temporal y forzar la descarga
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `factura-${codigoFactura}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error al generar el PDF:", error);
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
        <p>{loading ? "Generando..." : "Imprimir"}</p>
      </Button>
    </div>
  );
}
