"use client";

import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { RiPrinterLine } from "@remixicon/react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { PdfFactura } from "@/app/taller/ordenes-servicio/[id]/factura/_components/pdf/pdfFactura";
import {
  getCurrentCounterFacturaRequestClient,
  updateFacturaStateRequestClient,
} from "@/app/taller/ordenes-servicio/[id]/factura/_services/requests";
import { formatearCodigoCounterBoletaFactura } from "@/lib/formateador";
import { EmpresasSelect } from "@/app/ventas/[ventaId]/_components/empresasSelect";

export function ImprimirFacturaButton({ ordenDeServicioData, empresas }) {
  const router = useRouter();

  const [selectedEmpresa, setSelectedEmpresa] = useState(null || empresas[0]);
  const [loading, setLoading] = useState(false);

  const handleDownloadPDF = async () => {
    setLoading(true);
    try {
      const facturaEmitida = ordenDeServicioData?.comprobante
        .toLowerCase()
        .includes("factura");

      const counterFactura = facturaEmitida
        ? ordenDeServicioData?.counter
        : await getCurrentCounterFacturaRequestClient();

      const codigoFactura = formatearCodigoCounterBoletaFactura(
        counterFactura,
        "factura"
      );

      const empresaSeleccionada = facturaEmitida
        ? ordenDeServicioData?.empresa
        : selectedEmpresa;

      const doc = (
        <PdfFactura
          ordenDeServicioData={ordenDeServicioData}
          counterFactura={counterFactura}
          empresaSeleccionada={empresaSeleccionada}
        />
      );
      const blob = await pdf(doc).toBlob();

      // Crear un enlace temporal y forzar la descarga
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `factura-${codigoFactura}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      if (!facturaEmitida) {
        const selectedEmpresaFormateada = {
          id: selectedEmpresa._id,
          ruc: selectedEmpresa.ruc,
          nombre: selectedEmpresa.nombre,
          descripcion: selectedEmpresa.descripcion,
          direccion: selectedEmpresa.direccion,
          telefono: selectedEmpresa.telefono,
          email: selectedEmpresa.email,
        };

        await updateFacturaStateRequestClient(
          ordenDeServicioData?._id,
          counterFactura,
          selectedEmpresaFormateada
        );
      }

      router.refresh();
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
        disabled={!!ordenDeServicioData?.empresa}
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
