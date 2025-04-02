"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PDFViewer } from "@react-pdf/renderer";

import { PdfBoleta } from "@/app/inventario/motos/reservaciones/[id]/boleta/_components/pdf/PdfBoleta";

export function DetailBoletaButtons({ reservacionData, counterBoleta }) {
  const router = useRouter();

  useEffect(() => {
    // Fuerza la actualización de los datos cada vez que se accede a la página
    router.refresh();
  }, [router]);

  return (
    <>
      <div className="mt-8">
        <PDFViewer width="100%" height="600px">
          <PdfBoleta
            reservacionData={reservacionData}
            counterBoleta={counterBoleta}
          />
        </PDFViewer>
      </div>
    </>
  );
}
