/*  */ "use client";

import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { RiPrinterLine } from "@remixicon/react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useQrBase64 } from "@/hooks/useQrBase64";
import { PdfBoleta } from "@/app/ventas/[ventaId]/boleta/_components/pdf/pdfBoleta";
import {
  getCurrentCounterBoletaRequestClient,
  updateBoletaStateRequestClient,
} from "@/app/ventas/[ventaId]/boleta/_services/requests";
import { formatearCodigoCounterBoletaFactura } from "@/lib/formateador";
import { EmpresasSelect } from "@/app/ventas/[ventaId]/_components/empresasSelect";
export function ImprimirBoletaButton({ ventaData, empresas, reimprimir }) {
  const router = useRouter();

  const [selectedEmpresa, setSelectedEmpresa] = useState(null || empresas[0]);
  const [loading, setLoading] = useState(false);

  const qrBase64 = useQrBase64(selectedEmpresa?.ruc);

  const handleDownloadPDF = async () => {
    setLoading(true);
    try {
      const boletaEmitida = ventaData?.comprobante
        .toLowerCase()
        .includes("boleta");

      const counterBoleta = boletaEmitida
        ? ventaData?.counter
        : await getCurrentCounterBoletaRequestClient();

      const codigoBoleta = formatearCodigoCounterBoletaFactura(
        counterBoleta,
        "boleta"
      );

      const empresaSeleccionada = boletaEmitida
        ? ventaData?.empresa
        : selectedEmpresa;

      const doc = (
        <PdfBoleta
          ventaData={ventaData}
          counterBoleta={counterBoleta}
          selectedEmpresa={empresaSeleccionada}
          qrBase64={qrBase64}
        />
      );
      const blob = await pdf(doc).toBlob();

      // Crear un enlace temporal y forzar la descarga
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `boleta-${codigoBoleta}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      if (!boletaEmitida) {
        const selectedEmpresaFormateada = {
          empresaId: selectedEmpresa._id,
          ruc: selectedEmpresa.ruc,
          nombre: selectedEmpresa.nombre,
          descripcion: selectedEmpresa.descripcion,
          telefono: selectedEmpresa.telefono,
          email: selectedEmpresa.email,
          direccion: selectedEmpresa.direccion,
          distrito: selectedEmpresa.distrito,
          provincia: selectedEmpresa.provincia,
          departamento: selectedEmpresa.departamento,
          ubigeo: selectedEmpresa.ubigeo,
        };
        
        await updateBoletaStateRequestClient(
          ventaData?._id,
          counterBoleta,
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
    <div className="flex flex-col items-center gap-4 md:flex-row">
      <EmpresasSelect
        empresas={empresas}
        selectedEmpresa={selectedEmpresa}
        setSelectedEmpresa={setSelectedEmpresa}
        disabled={!!ventaData?.empresa}
      />

      <Button
        variant="default"
        className="flex items-center gap-2"
        onClick={handleDownloadPDF}
        disabled={loading}
      >
        <RiPrinterLine className="h-4 w-4" />
        <p>{loading ? "Generando..." : reimprimir ? "Reimprimir" : "Imprimir"}</p>
      </Button>
    </div>
  );
}
