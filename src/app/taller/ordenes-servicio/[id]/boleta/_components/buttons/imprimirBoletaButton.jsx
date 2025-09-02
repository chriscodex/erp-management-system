/*  */ 'use client';

import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { RiPrinterLine } from '@remixicon/react';
import { useRouter } from 'next/navigation';
import QRCode from 'qrcode';

import { Button } from '@/components/ui/button';
import { PdfBoleta } from '@/app/taller/ordenes-servicio/[id]/boleta/_components/pdf/pdfBoleta';
import {
  getCurrentCounterBoletaRequestClient,
  updateBoletaStateRequestClient,
} from '@/app/taller/ordenes-servicio/[id]/boleta/_services/requests';
import {
  formatearCodigoCounterBoletaFactura,
  obtenerSerieYCorrelativo,
} from '@/lib/formateador';
import { EmpresasSelect } from '@/app/ventas/[ventaId]/_components/empresasSelect';

export function ImprimirBoletaButton({
  ordenDeServicioData,
  empresas,
  reimprimir,
  loading,
  setLoading,
}) {
  const router = useRouter();

  const selectedEmpresaSinFormatear = empresas.find(
    (empresa) => empresa.ruc === ordenDeServicioData?.empresa?.ruc,
  );

  const [selectedEmpresaId, setSelectedEmpresaId] = useState(
    selectedEmpresaSinFormatear?._id || empresas[0]?._id || '',
  );

  // Siempre obtener el objeto empresa seleccionado a partir del id
  const empresaSeleccionada = empresas.find((e) => e._id === selectedEmpresaId);

  const handleDownloadPDF = async () => {
    setLoading(true);
    try {
      const isBoletaEmitida = ordenDeServicioData?.comprobante
        .toLowerCase()
        .includes('boleta');

      const counterBoleta = isBoletaEmitida
        ? ordenDeServicioData?.counter
        : await getCurrentCounterBoletaRequestClient();

      let fechaParaImprimir = isBoletaEmitida
        ? ordenDeServicioData?.fechaEmisionComprobante
        : '';

      if (!isBoletaEmitida && empresaSeleccionada) {
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

        const responseUpdate = await updateBoletaStateRequestClient(
          ordenDeServicioData?._id,
          counterBoleta,
          selectedEmpresaFormateada,
        );

        fechaParaImprimir = responseUpdate?.fechaEmisionComprobante;
      }

      const codigoBoleta = formatearCodigoCounterBoletaFactura(
        counterBoleta,
        'boleta',
      );

      const empresaParaPDF = isBoletaEmitida
        ? ordenDeServicioData?.empresa
        : empresaSeleccionada;

      const { serie, correlativo } = obtenerSerieYCorrelativo(
        counterBoleta,
        'boleta',
      );

      const montoTotalProductos = ordenDeServicioData?.productos.reduce(
        (acumulador, producto) =>
          acumulador + producto?.precioVenta * producto?.cantidad,
        0,
      );

      const montoTotalServicios = ordenDeServicioData?.servicios.reduce(
        (acumulador, servicio) => acumulador + servicio?.precio,
        0,
      );

      const montoTotal = montoTotalProductos + montoTotalServicios;

      const montoIgv = (0.18 * montoTotal).toFixed(2);

      // Fecha
      const fechaFormateada = new Date(
        fechaParaImprimir ||
          ordenDeServicioData?.fechaEmisionComprobante ||
          new Date(),
      )
        .toISOString()
        .slice(0, 10);

      const clienteDni = ordenDeServicioData?.cliente?.datos?.dni || '';

      const value = `${
        empresaSeleccionada?.ruc || ''
      }|${'03'}|${serie}|${correlativo}|${montoIgv}|${montoTotal}|${fechaFormateada}|1|${clienteDni}`;

      const qrBase64 = await QRCode.toDataURL(value, { width: 80 });

      const doc = (
        <PdfBoleta
          ordenDeServicioData={ordenDeServicioData}
          counterBoleta={counterBoleta}
          selectedEmpresa={empresaParaPDF}
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
        selectedEmpresaId={selectedEmpresaId}
        setSelectedEmpresaId={setSelectedEmpresaId}
        disabled={!!ordenDeServicioData?.empresa}
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
