import { Package, User, Hash } from "lucide-react";
import { RiFileListLine, RiMotorbikeFill } from "@remixicon/react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { formatDateLong } from "@/lib/formateador";
import {
  RiArrowUpDownLine,
  RiDashboard2Line,
  RiFlashlightFill,
  RiOilLine,
  RiPaletteLine,
  RiRepeatLine,
  RiRuler2Fill,
  RiSpeedLine,
  RiStopMiniFill,
  RiMotorbikeLine,
} from "@remixicon/react";
import { Label } from "@/components/ui/label";
import { Badge } from '@/components/ui/badge';
import { DetailPedidoButtons } from '@/app/inventario/motos/pedidos/[id]/_components/buttons/DetailPedidoButtons';
import { GenerarInventariadoButton } from '@/app/inventario/motos/pedidos/[id]/_components/buttons/GenerarInventariadoButton';
// import { EmitirConfirmacionReservacionButton } from '@/app/inventario/motos/reservaciones/[id]/_components/buttons/EmitirConfirmacionReservacion';

export function DetailPedidoContent({ pedidoData, marcaData, categoryData }) {
  
  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardHeader className="flex lg:flex-row flex-col items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-2">
          <RiFileListLine className="h-9 w-9" />
          <Label className="sm:text-4xl text-xl font-bold">
            Detalle del Pedido
          </Label>
        </div>
        <GenerarInventariadoButton pedidoId={pedidoData._id} />
        {/* <EmitirConfirmacionReservacionButton reservacionData={reservacionData} /> */}
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2" />
                Información del Modelo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Modelo:
                  </span>{" "}
                  {pedidoData?.modelo?.nombre}
                </p>
                <p className="flex gap-4 justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Descripción:
                  </span>{" "}
                  {pedidoData?.modelo?.descripcion}
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Marca:
                  </span>{" "}
                  {marcaData?.nombre}
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Categoría:
                  </span>{" "}
                  {categoryData?.nombre}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="row-span-1 md:row-span-3">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Hash className="mr-2" />
                Detalles del pedido
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Estado de Pago:
                  </span>
                  <Badge className="capitalize">{pedidoData?.estadoPago}</Badge>
                  {/* {pedidoData?.estadoPago} */}
                </div>
                <p className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Monto pagado:
                  </span>{" "}
                  S/. {pedidoData?.montoPagado}
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Fecha de pago:
                  </span>{" "}
                  {formatDateLong(pedidoData?.fechaPago, false)}
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Monto total:
                  </span>{" "}
                  S/. {pedidoData?.montoTotal}
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Comentario:
                  </span>{" "}
                  {pedidoData?.comentario}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <RiMotorbikeFill className="mr-2" />
                Detalles de la Moto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="flex justify-between">

                  <span className="text-gray-500 dark:text-gray-400">
                    Nombre:
                  </span>{" "}
                  {pedidoData?.moto?.nombre}
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Descripción:
                  </span>{" "}
                  {pedidoData?.moto?.descripcion}
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Cantidad:
                  </span>{" "}
                  {pedidoData?.moto?.cantidad}
                </p>
              </div>
              {pedidoData?.moto?.caracteristicas &&
                Object.values(pedidoData?.moto?.caracteristicas).some((v) =>
                  v?.trim?.()
                ) && (
                  <Card className="mt-2">
                    <CardHeader className="flex flex-row items-start gap-2">
                      <RiMotorbikeLine />
                      <CardTitle>Características</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 xl:grid-cols-2 gap-2">
                      {pedidoData?.moto?.caracteristicas.motor?.trim() && (
                        <div className="flex items-center gap-2">
                          <RiDashboard2Line className="text-muted-foreground" />
                          <p className="text-muted-foreground">Motor:</p>{" "}
                          {pedidoData?.moto?.caracteristicas.motor}
                        </div>
                      )}
                      {pedidoData?.moto?.caracteristicas.cilindrada?.trim() && (
                        <div className="flex items-center gap-2">
                          <RiSpeedLine className="text-muted-foreground" />
                          <p className="text-muted-foreground">
                            Cilindrada:
                          </p>{" "}
                          {pedidoData?.moto?.caracteristicas.cilindrada}
                        </div>
                      )}
                      {pedidoData?.moto?.caracteristicas.potencia?.trim() && (
                        <div className="flex items-center gap-2">
                          <RiFlashlightFill className="text-muted-foreground" />
                          <p className="text-muted-foreground">
                            Potencia:
                          </p>{" "}
                          {pedidoData?.moto?.caracteristicas.potencia}
                        </div>
                      )}
                      {pedidoData?.moto?.caracteristicas.frenos?.trim() && (
                        <div className="flex items-center gap-2">
                          <RiStopMiniFill className="text-muted-foreground" />
                          <p className="text-muted-foreground">Frenos:</p>{" "}
                          {pedidoData?.moto?.caracteristicas.frenos}
                        </div>
                      )}
                      {pedidoData?.moto?.caracteristicas.transmision?.trim() && (
                        <div className="flex items-center gap-2">
                          <RiRepeatLine className="text-muted-foreground" />
                          <p className="text-muted-foreground">
                            Transmisión:
                          </p>{" "}
                          {pedidoData?.moto?.caracteristicas.transmision}
                        </div>
                      )}
                      {pedidoData?.moto?.caracteristicas.dimensiones?.trim() && (
                        <div className="flex items-center gap-2">
                          <RiRuler2Fill className="text-muted-foreground" />
                          <p className="text-muted-foreground">
                            Dimensiones:
                          </p>{" "}
                          {pedidoData?.moto?.caracteristicas.dimensiones}
                        </div>
                      )}
                      {pedidoData?.moto?.caracteristicas.capacidadCombustible?.trim() && (
                        <div className="flex items-center gap-2">
                          <RiOilLine className="text-muted-foreground" />
                          <p className="text-muted-foreground">
                            Capacidad de combustible:
                          </p>{" "}
                          {
                            pedidoData?.moto?.caracteristicas
                              .capacidadCombustible
                          }
                        </div>
                      )}
                      {pedidoData?.moto?.caracteristicas.suspension?.trim() && (
                        <div className="flex items-center gap-2">
                          <RiArrowUpDownLine className="text-muted-foreground" />
                          <p className="text-muted-foreground">Suspensión:</p>{" "}
                          {pedidoData?.moto?.caracteristicas.suspension}
                        </div>
                      )}
                      {pedidoData?.moto?.caracteristicas.colores?.trim() && (
                        <div className="flex items-center gap-2">
                          <RiPaletteLine className="text-muted-foreground" />
                          <p className="text-muted-foreground">Colores:</p>{" "}
                          {pedidoData?.moto?.caracteristicas.colores}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="mr-2" />
                Información de Inventario
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Almacén:
                  </span>
                  <span className="font-medium">
                    {pedidoData?.almacenId?.nombre}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Importado:
                  </span>

                  {pedidoData?.moto?.importado === "si" ? "Sí" : "No"}
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Proveedor:
                  </span>
                  <span className="font-medium">
                    {pedidoData?.proveedorId?.nombre}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-4">
          <DetailPedidoButtons pedidoId={pedidoData._id} />
        </div>
      </CardContent>
    </Card>
  );
}
