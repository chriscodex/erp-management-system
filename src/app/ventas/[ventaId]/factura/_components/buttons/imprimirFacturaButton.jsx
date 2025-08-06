'use client';

import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { RiPrinterLine } from '@remixicon/react';
import { useRouter } from 'next/navigation';

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
  clienteRuc,
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

  const [selectedEmpresaId, setSelectedEmpresaId] = useState(
    selectedEmpresaSinFormatear?._id || empresas[0]?._id || ''
  );

  // Siempre obtener el objeto empresa seleccionado a partir del id
  const empresaSeleccionada = empresas.find(e => e._id === selectedEmpresaId);

  const handleDownloadPDF = async () => {
    setLoading(true);
    try {
      const isFacturaEmitida = ventaData?.comprobante
        .toLowerCase()
        .includes('factura');

      const counterFactura = isFacturaEmitida
        ? ventaData?.counter
        : await getCurrentCounterFacturaRequestClient();

      if (!isFacturaEmitida && empresaSeleccionada) {
        // Actualizar el estado de la factura en el backend
        const selectedEmpresaFormateada = {
          empresaId: empresaSeleccionada._id,
          ruc: empresaSeleccionada.ruc,
          nombre: empresaSeleccionada.nombre,
          descripcion: empresaSeleccionada.descripcion,
          telefono: empresaSeleccionada.telefono,
          email: empresaSeleccionada.email,
          direccion: empresaSeleccionada.direccion,
          distrito: empresaSeleccionada.distrito,
          provincia: empresaSeleccionada.provincia,
          departamento: empresaSeleccionada.departamento,
          ubigeo: empresaSeleccionada.ubigeo,
        };

        await updateFacturaStateRequestClient(
          ventaData?._id,
          counterFactura,
          selectedEmpresaFormateada
        );
      }

      const codigoFactura = formatearCodigoCounterBoletaFactura(
        counterFactura,
        'factura'
      );

      const empresaParaPDF = isFacturaEmitida
        ? ventaData?.empresa
        : empresaSeleccionada;

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

      // Valor QR SUNAT
      const value = `${
        empresaSeleccionada?.ruc || ''
      }|${'01'}|${serie}|${correlativo}|${montoIgv}|${total}|${fechaFormateada}|6|${clienteRuc}`;

      const qrBase64 = await QRCode.toDataURL(value, { width: 80 });

      const doc = (
        <PdfFactura
          ventaData={ventaData}
          counterFactura={counterFactura}
          selectedEmpresa={empresaParaPDF}
          qrBase64={qrBase64}
          clienteRuc={clienteRuc}
        />
      );
      const blob = await pdf(doc).toBlob();

      // Crear un enlace temporal y forzar la descarga
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `factura-${codigoFactura}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    }
    router.refresh();
    setLoading(false);
  };

  const isClienteRucAdded = Boolean(ventaData?.clienteRuc)

  return (
    <div className="flex items-center gap-4">
      <EmpresasSelect
        empresas={empresas}
        selectedEmpresaId={selectedEmpresaId}
        setSelectedEmpresaId={setSelectedEmpresaId}
        disabled={!isClienteRucAdded || !!ventaData?.empresa}
      />
      <Button
        variant="default"
        className="flex items-center gap-2"
        onClick={handleDownloadPDF}
        disabled={loading || disabled}
      >
        <RiPrinterLine className="h-4 w-4" />
        <p>
          {loading ? 'Generando...' : reimprimir ? 'Reimprimir' : 'Imprimir'}
        </p>
      </Button>
    </div>
  );
}
