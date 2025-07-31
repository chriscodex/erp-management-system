"use client";

import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { RiPrinterLine } from "@remixicon/react";
import { useRouter } from "next/navigation";

import { Button } from '@/components/ui/button';
import { PdfFactura } from '@/app/ventas/[ventaId]/factura/_components/pdf/pdfFactura';
import QRCode from 'qrcode';
import {
  getCurrentCounterFacturaRequestClient,
  updateFacturaStateRequestClient,
} from '@/app/ventas/[ventaId]/factura/_services/requests';
import {
  formatearCodigoCounterBoletaFactura,
  obtenerSerieYCorrelativo,
} from '@/lib/formateador';
import { EmpresasSelect } from '@/app/ventas/[ventaId]/_components/empresasSelect';

export function ImprimirFacturaButton({
  ventaData,
  empresas,
  reimprimir,
  loading,
  setLoading,
  disabled = false,
}) {
  const router = useRouter();

  const selectedEmpresaSinFormatear = empresas.find(
    (empresa) => empresa.ruc === ventaData?.empresa?.ruc
  );

  const [selectedEmpresa, setSelectedEmpresa] = useState(
    selectedEmpresaSinFormatear || empresas[0]
  );

  const handleDownloadPDF = async () => {
    setLoading(true);
    try {
      const facturaEmitida = ventaData?.comprobante
        .toLowerCase()
        .includes("factura");

      const counterFactura = facturaEmitida
        ? ventaData?.counter
        : await getCurrentCounterFacturaRequestClient();

      if (!facturaEmitida) {
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

        await updateFacturaStateRequestClient(
          ventaData?._id,
          counterFactura,
          selectedEmpresaFormateada
        );
      }

      const codigoFactura = formatearCodigoCounterBoletaFactura(
        counterFactura,
        "factura"
      );

      const empresaSeleccionada = facturaEmitida
        ? ventaData?.empresa
        : selectedEmpresa;

      // Lógica QR igual que boleta
      // Serie y correlativo
      const { serie, correlativo } = obtenerSerieYCorrelativo(
        counterFactura,
        'factura'
      );

      // Total y IGV
      const total = ventaData?.productos?.reduce(
        (acc, producto) => acc + producto?.precioVenta * producto?.cantidad,
        0
      );
      const montoIgv = (0.18 * total).toFixed(2);

      // Fecha
      const fechaFormateada = new Date(ventaData?.fecha)
        .toISOString()
        .slice(0, 10);

      let clienteDocumento = ventaData?.clienteRuc;

      // Valor QR SUNAT
      const value = `${
        selectedEmpresa.ruc
      }|${'01'}|${serie}|${correlativo}|${montoIgv}|${total}|${fechaFormateada}|6|${clienteDocumento}`;

      const qrBase64 = await QRCode.toDataURL(value, { width: 80 });

      const doc = (
        <PdfFactura
          ventaData={ventaData}
          counterFactura={counterFactura}
          selectedEmpresa={empresaSeleccionada}
          qrBase64={qrBase64}
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
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    }
    router.refresh();
    setLoading(false);
  };

  return (
    <div className="flex items-center gap-4">
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
        disabled={loading || disabled}
      >
        <RiPrinterLine className="h-4 w-4" />
        <p>
          {loading ? "Generando..." : reimprimir ? "Reimprimir" : "Imprimir"}
        </p>
      </Button>
    </div>
  );
}
