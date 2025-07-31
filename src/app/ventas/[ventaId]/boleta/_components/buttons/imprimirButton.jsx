/*  */ 'use client';

import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { RiPrinterLine } from '@remixicon/react';
import { useRouter } from 'next/navigation';
import QRCode from 'qrcode';

import { Button } from '@/components/ui/button';
import { PdfBoleta } from '@/app/ventas/[ventaId]/boleta/_components/pdf/pdfBoleta';
import {
  getCurrentCounterBoletaRequestClient,
  updateBoletaStateRequestClient,
} from '@/app/ventas/[ventaId]/boleta/_services/requests';
import {
  formatearCodigoCounterBoletaFactura,
  obtenerSerieYCorrelativo,
} from '@/lib/formateador';
import { EmpresasSelect } from '@/app/ventas/[ventaId]/_components/empresasSelect';
export function ImprimirBoletaButton({
  ventaData,
  empresas,
  reimprimir,
  loading,
  setLoading,
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
      const isBoletaEmitida = ventaData?.comprobante
        .toLowerCase()
        .includes('boleta');

      const counterBoleta = isBoletaEmitida
        ? ventaData?.counter
        : await getCurrentCounterBoletaRequestClient();

      if (!isBoletaEmitida) {
        // Actualizar el estado de la boleta en el backend
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

      /* Formatear los datos para mostrar en el comprobante */
      const codigoBoleta = formatearCodigoCounterBoletaFactura(
        counterBoleta,
        'boleta'
      );

      const empresaSeleccionada = isBoletaEmitida
        ? ventaData?.empresa
        : selectedEmpresa;

      const { serie, correlativo } = obtenerSerieYCorrelativo(
        counterBoleta,
        'boleta'
      );

      const montoTotal = ventaData?.productos.reduce(
        (acc, producto) => acc + producto?.precioVenta * producto?.cantidad,
        0
      );

      const montoIgv = (0.18 * montoTotal).toFixed(2);

      const fechaFormateada = new Date(ventaData?.fecha)
        .toISOString()
        .slice(0, 10);

        console.log("ventaData", ventaData);

      const clienteDni = ventaData?.clienteId?.datos?.dni || '';

      const value = `${
        selectedEmpresa.ruc
      }|${'03'}|${serie}|${correlativo}|${montoIgv}|${montoTotal}|${fechaFormateada}|6|${clienteDni}`;

      const qrBase64 = await QRCode.toDataURL(value, { width: 80 });

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
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `boleta-${codigoBoleta}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    }
    router.refresh();
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
        <p>
          {loading ? 'Generando...' : reimprimir ? 'Reimprimir' : 'Imprimir'}
        </p>
      </Button>
    </div>
  );
}
