"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PDFViewer } from "@react-pdf/renderer";

import { FinalizarVentaAlert } from "@/app/ventas/[ventaId]/_components/dialogs/finalizarVentaAlert";
import { PdfFactura } from "@/app/ventas/[ventaId]/factura/_components/pdf/pdfFactura";

export function DetailFacturaButtons({ ventaId, ventaData, empresas }) {
  const router = useRouter();
  const [isOpenDialogDelete, setIsOpenDialogDelete] = useState(false);

  useEffect(() => {
    router.refresh();
  }, [router]);

  return (
    <>
      <div className="mt-8">
        <PDFViewer width="100%" height="600px">
          <PdfFactura
            ventaData={ventaData}
            counterFactura={2000}
            empresas={empresas}
          />
        </PDFViewer>
      </div>
      {/* Dialog Delete */}
      <FinalizarVentaAlert
        isOpen={isOpenDialogDelete}
        setIsOpen={setIsOpenDialogDelete}
        ventaId={ventaId}
        actionAfterComplete="push"
      />
    </>
  );
}
