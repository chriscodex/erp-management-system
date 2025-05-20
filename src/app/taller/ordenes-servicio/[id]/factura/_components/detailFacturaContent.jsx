import { User, Package, Hash } from "lucide-react";
import { RiInfoCardFill } from "@remixicon/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateLong, formatDateShort } from "@/lib/formateador";
import { Label } from "@/components/ui/label";

import { ImprimirFacturaButton } from "@/app/taller/ordenes-servicio/[id]/factura/_components/buttons/imprimirFacturaButton";
import { FinalizarOrdenDeServicioButton } from "@/app/taller/ordenes-servicio/[id]/_components/buttons/FinalizarOrdenDeServicioButton";
import { formatMoney } from "@/lib/utils";
import { HomeRepairService } from "@mui/icons-material";
export function DetailFacturaContent({ ordenDeServicioData, empresas }) {
  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardHeader className="flex flex-col lg:flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-2">
          <RiInfoCardFill className="h-9 w-9" />
          <Label className="sm:text-4xl text-xl font-bold">Factura</Label>
        </div>
        <div className="flex flex-col items-center lg:flex-row gap-4">
          <ImprimirFacturaButton
            ordenDeServicioData={ordenDeServicioData}
            empresas={empresas}
          />
          <FinalizarOrdenDeServicioButton
            ordenDeServicioId={ordenDeServicioData?._id}
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
            <CardContent>
              {ordenDeServicioData?.cliente?.tipo === "persona" ? (
                <div className="space-y-2">
                  <p>
                    <strong>Nombre:</strong>{" "}
                    {ordenDeServicioData?.cliente?.datos?.nombres}{" "}
                    {ordenDeServicioData?.cliente?.datos?.apellidos}
                  </p>
                  <p>
                    <strong>DNI:</strong>{" "}
                    {ordenDeServicioData?.cliente?.datos?.dni}
                  </p>
                  {ordenDeServicioData?.cliente?.datos?.direccion && (
                    <p>
                      <strong>Dirección:</strong>{" "}
                      {ordenDeServicioData?.cliente?.datos?.direccion}
                    </p>
                  )}
                  {ordenDeServicioData?.cliente?.datos?.email && (
                    <p>
                      <strong>Email:</strong>{" "}
                      {ordenDeServicioData?.cliente?.datos?.email}
                    </p>
                  )}
                  {ordenDeServicioData?.cliente?.datos?.celular && (
                    <p>
                      <strong>Celular:</strong>{" "}
                      {ordenDeServicioData?.cliente?.datos?.celular}
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <p>
                    <strong>Razon Social:</strong>{" "}
                    {ordenDeServicioData?.cliente?.datos?.razonSocial}
                  </p>
                  <p>
                    <strong>RUC:</strong>{" "}
                    {ordenDeServicioData?.cliente?.datos?.ruc}
                  </p>
                  <p>
                    <strong>Representante Legal:</strong>{" "}
                    {ordenDeServicioData?.cliente?.datos?.representanteLegal}
                  </p>
                  <p>
                    <strong>Dirección:</strong>{" "}
                    {ordenDeServicioData?.cliente?.datos?.direccion}
                  </p>
                  {ordenDeServicioData?.cliente?.datos?.email && (
                    <p>
                      <strong>Email:</strong>{" "}
                      {ordenDeServicioData?.cliente?.datos?.email}
                    </p>
                  )}
                  {ordenDeServicioData?.cliente?.datos?.celular && (
                    <p>
                      <strong>Celular:</strong>{" "}
                      {ordenDeServicioData?.cliente?.datos?.celular}
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Hash className="mr-2" />
                Detalles de la Orden de Servicio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>
                  <strong>Código:</strong> {ordenDeServicioData?.code}
                </p>
                <p>
                  <strong>Fecha de ingreso:</strong>{" "}
                  {formatDateLong(ordenDeServicioData?.fechaIngreso, true)}
                </p>
                <p>
                  <strong>Comprobante:</strong>{" "}
                  {ordenDeServicioData?.comprobante}
                </p>
                <p>
                  <strong>Estado SUNAT:</strong>{" "}
                  {ordenDeServicioData?.estadoSunat}
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
                  <TableHead>Precio</TableHead>
                  <TableHead>Cantidad</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ordenDeServicioData?.productos.map((producto) => {
                  return (
                    <TableRow key={producto?.code}>
                      <TableCell className="font-medium">
                        {producto?.code}
                      </TableCell>
                      <TableCell>{producto?.nombre}</TableCell>
                      <TableCell>{producto?.descripcion}</TableCell>
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
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {ordenDeServicioData?.servicios?.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HomeRepairService className="mr-2" />
                Servicios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ordenDeServicioData?.servicios?.map((servicio) => {
                    return (
                      <TableRow key={servicio?.code}>
                        <TableCell>{servicio?.descripcion}</TableCell>
                        <TableCell>
                          S/.{formatMoney(servicio?.precio)}
                        </TableCell>
                        <TableCell>
                          {formatDateShort(servicio?.fecha, false)}
                        </TableCell>
                        <TableCell>
                          S/.{formatMoney(servicio?.precio)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
