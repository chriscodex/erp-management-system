'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  RiFileList2Fill,
  RiFileList3Line,
  RiFileListLine,
} from '@remixicon/react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useRouter } from 'next/navigation';

export function EmitirComprobanteVentaButton({ ventaData }) {
  const router = useRouter();
  const comprobante = ventaData?.comprobante.toLowerCase();

  const facturaEmitida = comprobante?.includes('factura');

  const boletaEmitida = comprobante?.includes('boleta');

  const noPuedeEmitirBoleta =
    facturaEmitida || ventaData?.clienteId?.tipo === 'empresa';

  const noPuedeEmitirFactura = boletaEmitida;

  return (
    <TooltipProvider>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="px-2">
            <RiFileList2Fill className="h-4 w-4" />
            <span>Emitir Comprobante</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          {/* Boleta */}
          {noPuedeEmitirBoleta ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <DropdownMenuItem disabled className="cursor-not-allowed">
                    <RiFileListLine />
                    Boleta
                  </DropdownMenuItem>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  No puedes emitir una boleta, ya se emitió una factura o el
                  cliente es una empresa
                </p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => router.push(`/ventas/${ventaData?._id}/boleta`)}
            >
              <RiFileListLine />
              Boleta
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator />

          {/* Factura */}
          {noPuedeEmitirFactura ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <DropdownMenuItem disabled className="cursor-not-allowed">
                    <RiFileList2Fill />
                    Factura
                  </DropdownMenuItem>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Ya se emitió una boleta, no puedes emitir factura</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => router.push(`/ventas/${ventaData?._id}/factura`)}
            >
              <RiFileList2Fill />
              Factura
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator />

          {/* Nota de venta */}
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router.push(`/ventas/${ventaData?._id}/nota-venta`)}
          >
            <RiFileList3Line />
            Nota de Venta
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  );
}
