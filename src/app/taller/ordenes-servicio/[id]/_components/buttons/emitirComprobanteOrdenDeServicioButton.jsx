"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  RiFileList2Fill,
  RiFileList3Line,
  RiFileListLine,
} from "@remixicon/react";
import { useRouter } from "next/navigation";

export function EmitirComprobanteOrdenDeServicioButton({
  ordenDeServicioData,
}) {
  const router = useRouter();

  const comprobante = ordenDeServicioData?.comprobante.toLowerCase();

  const boletaEmitida = comprobante?.includes("boleta");
  const facturaEmitida = comprobante?.includes("factura");

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="px-2">
            <RiFileList2Fill className="h-4 w-4" />
            <span>Emitir Comprobante</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              if (!facturaEmitida) {
                router.push(
                  `/taller/ordenes-servicio/${ordenDeServicioData?._id}/boleta`
                );
              }
            }}
            disabled={facturaEmitida}
            title={
              facturaEmitida
                ? "Ya se emitió una factura, no puedes emitir boleta."
                : ""
            }
          >
            <RiFileListLine />
            Boleta
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              if (!boletaEmitida) {
                router.push(
                  `/taller/ordenes-servicio/${ordenDeServicioData?._id}/factura`
                );
              }
            }}
            disabled={boletaEmitida}
            title={
              boletaEmitida
                ? "Ya se emitió una factura, no puedes emitir boleta."
                : ""
            }
          >
            <RiFileList2Fill />
            Factura
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() =>
              router.push(
                `/taller/ordenes-servicio/${ordenDeServicioData?._id}/nota-venta`
              )
            }
          >
            <RiFileList3Line />
            Nota de Venta
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
