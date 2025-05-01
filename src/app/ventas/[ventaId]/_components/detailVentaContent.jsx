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
import { DetailVentaButtons } from "@/app/ventas/[ventaId]/_components/buttons/detailVentaButtons";
import { EmitirComprobanteVentaButton } from "@/app/ventas/[ventaId]/_components/buttons/emitirComprobanteVentaButton";

export function DetailVentaContent({ ventaData }) {
  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardHeader className="flex flex-col md:flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-2">
          <RiFileListLine className="h-9 w-9" />
          <Label className="sm:text-4xl text-xl font-bold">
            Detalle de la Venta
          </Label>
        </div>
        <EmitirComprobanteVentaButton ventaData={ventaData} />
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
            {ventaData?.clienteId?.tipo === "persona" ? (
              <CardContent>
                <div className="space-y-2">
                  <p>
                    <strong>Nombre:</strong>{" "}
                    {ventaData?.clienteId?.datos?.nombres}{" "}
                    {ventaData?.clienteId?.datos?.apellidos}
                  </p>
                  <p>
                    <strong>DNI:</strong> {ventaData?.clienteId?.datos?.dni}
                  </p>
                  {ventaData?.clienteId?.datos?.direccion && (
                    <p>
                      <strong>Dirección:</strong>{" "}
                      {ventaData?.clienteId?.datos?.direccion}
                    </p>
                  )}
                  {ventaData?.clienteId?.datos?.email && (
                    <p>
                      <strong>Email:</strong>{" "}
                      {ventaData?.clienteId?.datos?.email}
                    </p>
                  )}
                  {ventaData?.clienteId?.datos?.celular && (
                    <p>
                      <strong>Celular:</strong>{" "}
                      {ventaData?.clienteId?.datos?.celular}
                    </p>
                  )}
                </div>
              </CardContent>
            ) : (
              <CardContent>
                <div className="space-y-2">
                  <p>
                    <strong>Razon Social:</strong>{" "}
                    {ventaData?.clienteId?.datos?.razonSocial}
                  </p>
                  <p>
                    <strong>RUC:</strong> {ventaData?.clienteId?.datos?.ruc}
                  </p>
                  <p>
                    <strong>Representante Legal:</strong>{" "}
                    {ventaData?.clienteId?.datos?.representanteLegal}
                  </p>
                  <p>
                    <strong>Direccion:</strong>{" "}
                    {ventaData?.clienteId?.datos?.direccion}
                  </p>
                  {ventaData?.clienteId?.datos?.email && (
                    <p>
                      <strong>Email:</strong>{" "}
                      {ventaData?.clienteId?.datos?.email}
                    </p>
                  )}
                  {ventaData?.clienteId?.datos?.celular && (
                    <p>
                      <strong>Celular:</strong>{" "}
                      {ventaData?.clienteId?.datos?.celular}
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
                Detalles de la Venta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>
                  <strong>Código:</strong> {ventaData?.code}
                </p>
                <p>
                  <strong>Fecha:</strong>{" "}
                  {formatDateLong(ventaData?.fecha, true)}
                </p>
                <p>
                  <strong>Vendedor:</strong>{" "}
                  {ventaData?.usuario?.nombres +
                    " " +
                    ventaData?.usuario?.apellidos}{" "}
                </p>
                <p>
                  <strong>Comprobante:</strong> {ventaData?.comprobante}
                </p>
                <p>
                  <strong>Estado SUNAT:</strong> {ventaData?.estadoSunat}
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
                {ventaData?.productos.map((producto) => {
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
                        S/. {producto?.precioVenta.toFixed(2)}
                      </TableCell>
                      <TableCell>{producto?.cantidad}</TableCell>
                      <TableCell>
                        S/.{" "}
                        {(producto?.precioVenta * producto?.cantidad).toFixed(
                          2
                        )}
                      </TableCell>
                      <TableCell>
                        <DetailProductPreventaDetailSheet
                          productPreventa={producto}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {ventaData?.obsequios.map((obsequio) => (
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
                  </TableRow>
                ))}
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
            <CardContent>{ventaData?.comentarios}</CardContent>
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
                  {ventaData?.productos?.reduce(
                    (acc, producto) => acc + producto?.cantidad,
                    0
                  )}
                </p>
                <p>
                  <strong>Total de Obsequios:</strong>{" "}
                  {ventaData?.obsequios?.reduce(
                    (acc, obsequio) => acc + obsequio?.cantidad,
                    0
                  )}
                </p>
                <p>
                  <strong>Monto Total:</strong> S/.
                  {ventaData?.productos
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
          <DetailVentaButtons ventaId={ventaData._id} />
        </div>
      </CardContent>
    </Card>
  );
}
