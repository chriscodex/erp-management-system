import { User, Package, Gift, Calendar, Hash, FileText } from "lucide-react";
import { RiFileListLine } from "@remixicon/react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateLong } from "@/lib/formateador";
import { Label } from "@/components/ui/label";

import { DetailProductPreventaDetailSheet } from "@/app/ventas/preventas/[preventaId]/_components/sheets/detailProductPreventaDetailSheet";
import { DetailPreventaButtons } from "@/app/ventas/preventas/[preventaId]/_components/buttons/detailPreventaButtons";
import { GenerarVentaButton } from "@/app/ventas/preventas/[preventaId]/_components/buttons/generarVentaButton";
import { formatMoney } from "@/lib/utils";
import { ImprimirCotizacionButton } from "@/app/ventas/preventas/[preventaId]/_components/buttons/imprimirCotizacionButton";
import { DetailObsequioPreventaDetailSheet } from "./sheets/detailObsequioPreventaDetailSheet";

export function DetailPreventaContent({ preventaData, empresa }) {
  console.log("preventaData", preventaData);

  const precioTotal = preventaData?.productos?.reduce((acc, product) => {
    return acc + product.precioVenta;
  }, 0);
  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardHeader className="flex flex-col gap-2 items-center justify-between space-y-0 pb-4 md:flex-row  ">
        <div className="flex items-center gap-2">
          <RiFileListLine className="h-9 w-9" />
          <Label className="sm:text-4xl text-xl font-bold">
            {preventaData?.cotizacion === "si"
              ? "Detalle de la Cotización"
              : "Detalle de la Pre-Venta"}
          </Label>
        </div>
        <div className="flex flex-col items-center gap-2 md:items-end xl:flex-row">
          {preventaData?.cotizacion === "si" && (
            <ImprimirCotizacionButton preventaData={preventaData} empresa={empresa} />
          )}
          <GenerarVentaButton preventaId={preventaData._id} />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2" />
                Información del Cliente
              </CardTitle>
            </CardHeader>
            {preventaData?.clienteId?.tipo === "persona" ? (
              <CardContent>
                <div className="space-y-2">
                  <p>
                    <strong>Nombre:</strong>{" "}
                    {preventaData?.clienteId?.datos?.nombres}{" "}
                    {preventaData?.clienteId?.datos?.apellidos}
                  </p>
                  <p>
                    <strong>DNI:</strong> {preventaData?.clienteId?.datos?.dni}
                  </p>
                  {preventaData?.clienteId?.datos?.email && (
                    <p>
                      <strong>Dirección:</strong>{" "}
                      {preventaData?.clienteId?.datos?.email}
                    </p>
                  )}
                  {preventaData?.clienteId?.datos?.celular && (
                    <p>
                      <strong>Celular:</strong>{" "}
                      {preventaData?.clienteId?.datos?.celular}
                    </p>
                  )}
                </div>
              </CardContent>
            ) : (
              <CardContent>
                <div className="space-y-2">
                  <p>
                    <strong>Razon Social:</strong>{" "}
                    {preventaData?.clienteId?.datos?.razonSocial}
                  </p>
                  <p>
                    <strong>RUC:</strong> {preventaData?.clienteId?.datos?.ruc}
                  </p>
                  <p>
                    <strong>Represante Legal:</strong>{" "}
                    {preventaData?.clienteId?.datos?.representanteLegal}
                  </p>
                  <p>
                    <strong>Dirección:</strong>{" "}
                    {preventaData?.clienteId?.datos?.direccion}
                  </p>
                  {preventaData?.clienteId?.datos?.celular && (
                    <p>
                      <strong>Celular:</strong>{" "}
                      {preventaData?.clienteId?.datos?.celular}
                    </p>
                  )}
                </div>
              </CardContent>
            )}
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Hash className="mr-2" />
                {preventaData?.cotizacion === "si"
                  ? "Detalle de la Cotización"
                  : "Detalle de la Pre-Venta"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>
                  <strong>Código:</strong> {preventaData?.code}
                </p>
                <p>
                  <strong>Fecha:</strong>{" "}
                  {formatDateLong(preventaData?.fecha, true)}
                </p>
                {preventaData?.fechaValidez && (
                  <p>
                    <strong>Válido hasta el:</strong>{" "}
                    {formatDateLong(preventaData?.fechaValidez, false)}
                  </p>
                )}
                <p>
                  <strong>Vendedor:</strong>{" "}
                  {preventaData?.usuario?.nombres +
                    " " +
                    preventaData?.usuario?.apellidos}{" "}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="mr-2" />
              Productos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead>Cantidad</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {preventaData?.productos?.map((producto) => {
                  return (
                    <TableRow key={producto?.code}>
                      <TableCell className="font-medium">
                        {producto?.code}
                      </TableCell>
                      <TableCell>{producto?.nombre}</TableCell>
                      <TableCell>{producto?.descripcion}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {producto?.tipo === "moto"
                            ? producto?.estado?.titulo
                            : producto?.estado}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        S/.{formatMoney(producto?.precioVenta)}
                      </TableCell>
                      <TableCell>{producto?.cantidad}</TableCell>
                      <TableCell>
                        S/.{formatMoney(producto?.precioVenta)}
                      </TableCell>
                      <TableCell>
                        <DetailProductPreventaDetailSheet
                          productPreventa={producto}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <span className="font-bold text-lg">Total:</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-bold text-lg">
                      S/.{formatMoney(precioTotal)}
                    </span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Gift className="mr-2" />
              Obsequios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Cantidad</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {preventaData?.obsequios &&
                preventaData.obsequios.length > 0 ? (
                  preventaData.obsequios.map((obsequio) => (
                    <TableRow key={obsequio?.code}>
                      <TableCell className="font-medium">
                        {obsequio?.code}
                      </TableCell>
                      <TableCell>{obsequio?.nombre}</TableCell>
                      <TableCell>{obsequio?.descripcion}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{obsequio?.estado}</Badge>
                      </TableCell>
                      <TableCell>{obsequio?.cantidad}</TableCell>
                      <TableCell>
                        <DetailObsequioPreventaDetailSheet
                          obsequioPreventa={obsequio}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-24 text-center"
                    >
                      Sin obsequios.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2" />
                Comentarios
              </CardTitle>
            </CardHeader>
            <CardContent>{preventaData?.comentarios}</CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2" />
                Resumen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>
                  <strong>Total de Productos:</strong>{" "}
                  {preventaData?.productos?.reduce(
                    (acc, producto) => acc + producto?.cantidad,
                    0
                  )}
                </p>
                <p>
                  <strong>Total de Obsequios:</strong>{" "}
                  {preventaData?.obsequios?.reduce(
                    (acc, obsequio) => acc + obsequio?.cantidad,
                    0
                  )}
                </p>
                <p>
                  <strong>Monto Total:</strong> S/.
                  {preventaData?.productos
                    .reduce(
                      (acc, producto) =>
                        acc + producto?.precioVenta * producto?.cantidad,
                      0
                    )
                    .toFixed(2)}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-4">
          <DetailPreventaButtons preventaId={preventaData._id} />
        </div>
      </CardContent>
    </Card>
  );
}
