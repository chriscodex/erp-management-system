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
import { ImprimirVentaHistoricaButton } from "@/app/ventas/ventas-historicas/[id]/_components/buttons/imprimirVentaHistoricaButton";

export function DetailVentaHistoricaContent({ ventaHistoricaData }) {
  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardHeader className="flex flex-col items-center justify-between space-y-0 pb-4 md:flex-row">
        <div className="flex items-center gap-2">
          <RiFileListLine className="h-9 w-9" />
          <Label className="sm:text-4xl text-xl font-bold">
            Detalle de la Venta en Historial
          </Label>
        </div>
        <div className="flex flex-col items-center gap-2 lg:flex-row">
          <Badge variant="error" className="text-sm h-9 px-4 flex items-center justify-center">
            <span className="font-bold mr-1">Estado:</span> Finalizado
          </Badge>
          <ImprimirVentaHistoricaButton
            ventaHistoricaData={ventaHistoricaData}
          />
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
            {ventaHistoricaData?.cliente?.tipo === "persona" ? (
              <CardContent>
                <div className="space-y-2">
                  <p>
                    <strong>Nombre:</strong>{" "}
                    {ventaHistoricaData?.cliente?.datos?.nombres}{" "}
                    {ventaHistoricaData?.cliente?.datos?.apellidos}
                  </p>
                  <p>
                    <strong>DNI:</strong>{" "}
                    {ventaHistoricaData?.cliente?.datos?.dni}
                  </p>
                  {ventaHistoricaData?.cliente?.datos?.email && (
                    <p>
                      <strong>Email:</strong>{" "}
                      {ventaHistoricaData?.cliente?.datos?.email}
                    </p>
                  )}
                  {ventaHistoricaData?.cliente?.datos?.celular && (
                    <p>
                      <strong>Celular:</strong>{" "}
                      {ventaHistoricaData?.cliente?.datos?.celular}
                    </p>
                  )}
                </div>
              </CardContent>
            ) : (
              <CardContent>
                <div className="space-y-2">
                  <p>
                    <strong>Razon Social:</strong>{" "}
                    {ventaHistoricaData?.cliente?.datos?.razonSocial}
                  </p>
                  <p>
                    <strong>RUC:</strong>{" "}
                    {ventaHistoricaData?.cliente?.datos?.ruc}
                  </p>
                  <p>
                    <strong>Representante Legal:</strong>{" "}
                    {ventaHistoricaData?.cliente?.datos?.representanteLegal}
                  </p>
                  <p>
                    <strong>Direccion:</strong>{" "}
                    {ventaHistoricaData?.cliente?.datos?.direccion}
                  </p>
                  {ventaHistoricaData?.cliente?.datos?.email && (
                    <p>
                      <strong>Email:</strong>{" "}
                      {ventaHistoricaData?.cliente?.datos?.email}
                    </p>
                  )}
                  {ventaHistoricaData?.cliente?.datos?.celular && (
                    <p>
                      <strong>Celular:</strong>{" "}
                      {ventaHistoricaData?.cliente?.datos?.celular}
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
                  <strong>Código:</strong> {ventaHistoricaData?.code}
                </p>
                <p>
                  <strong>Fecha:</strong>{" "}
                  {formatDateLong(ventaHistoricaData?.fecha, true)}
                </p>
                <p>
                  <strong>Vendedor:</strong>{" "}
                  {ventaHistoricaData?.usuario?.nombres +
                    " " +
                    ventaHistoricaData?.usuario?.apellidos}{" "}
                </p>
                <p>
                  <strong>Comprobante:</strong>{" "}
                  {ventaHistoricaData?.comprobante}
                </p>
                <p>
                  <strong>Estado SUNAT:</strong>{" "}
                  {ventaHistoricaData?.estadoSunat}
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
                {ventaHistoricaData?.productos.map((producto) => {
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
                {ventaHistoricaData?.obsequios.map((obsequio) => (
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
            <CardContent>{ventaHistoricaData?.comentarios}</CardContent>
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
                  {ventaHistoricaData?.productos?.reduce(
                    (acc, producto) => acc + producto?.cantidad,
                    0
                  )}
                </p>
                <p>
                  <strong>Total de Obsequios:</strong>{" "}
                  {ventaHistoricaData?.obsequios?.reduce(
                    (acc, obsequio) => acc + obsequio?.cantidad,
                    0
                  )}
                </p>
                <p>
                  <strong>Monto Total:</strong> S/.
                  {ventaHistoricaData?.productos
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
      </CardContent>
    </Card>
  );
}
