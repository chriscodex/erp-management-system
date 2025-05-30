import { User, Package, Calendar, Hash, FileText } from "lucide-react";
import { RiBikeLine, RiFileListLine } from "@remixicon/react";

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
import {
  formatDateLong,
  formatDateShort,
  formatearCodigoCounterBoletaFactura,
} from "@/lib/formateador";
import { Label } from "@/components/ui/label";

import { DetailProductOrdenDeServicioDetailSheet } from "@/app/taller/ordenes-servicio/[id]/_components/sheets/detailProductOrdenDeServicioDetailSheet";
import { DetailServicioOrdenDeServicioDetailSheet } from "@/app/taller/ordenes-servicio/[id]/_components/sheets/detailServicioOrdenDeServicioDetailSheet";
import { DetailMecanicoOrdenDeServicioDetailSheet } from "@/app/taller/ordenes-servicio/[id]/_components/sheets/detailMecanicoOrdenDeServicioDetailSheet";
import { formatMoney } from "@/lib/utils";
import { HomeRepairService } from "@mui/icons-material";
import { ImprimirComprobanteOrdenDeServicioHistoricaButton } from "./buttons/imprimirComprobanteOrdenDeServicioHistorica";

export function DetailOrdenDeServicioHistoricaContent({
  ordenDeServicioHistoricaData,
}) {
  const precioTotalProductos = ordenDeServicioHistoricaData?.productos?.reduce(
    (acc, product) => {
      return acc + product.precioVenta;
    },
    0
  );

  const precioTotalServicios = ordenDeServicioHistoricaData?.servicios?.reduce(
    (acc, servicio) => {
      return acc + servicio.precio;
    },
    0
  );

  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardHeader className="flex flex-col items-center justify-between space-y-0 pb-4 md:flex-row">
        <div className="flex items-center gap-2">
          <RiFileListLine className="h-9 w-9" />
          <Label className="sm:text-4xl text-xl font-bold">
            Detalle de la Orden de Servicio en Historial
          </Label>
        </div>
        <div className="flex flex-col items-center gap-2 lg:flex-row">
          <Badge
            variant="error"
            className="text-sm h-9 px-4 flex items-center justify-center"
          >
            <span className="font-bold mr-1">Estado:</span> Finalizado
          </Badge>
          <ImprimirComprobanteOrdenDeServicioHistoricaButton
            ordenDeServicioHistoricaData={ordenDeServicioHistoricaData}
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
            {ordenDeServicioHistoricaData?.cliente?.tipo === "persona" ? (
              <CardContent>
                <div className="space-y-2">
                  <p>
                    <strong>Nombre:</strong>{" "}
                    {ordenDeServicioHistoricaData?.cliente?.datos?.nombres}{" "}
                    {ordenDeServicioHistoricaData?.cliente?.datos?.apellidos}
                  </p>
                  <p>
                    <strong>DNI:</strong>{" "}
                    {ordenDeServicioHistoricaData?.cliente?.datos?.dni}
                  </p>
                  {ordenDeServicioHistoricaData?.cliente?.datos?.direccion && (
                    <p>
                      <strong>Dirección:</strong>{" "}
                      {ordenDeServicioHistoricaData?.cliente?.datos?.direccion}
                    </p>
                  )}
                  {ordenDeServicioHistoricaData?.cliente?.datos?.email && (
                    <p>
                      <strong>Email:</strong>{" "}
                      {ordenDeServicioHistoricaData?.cliente?.datos?.email}
                    </p>
                  )}
                  {ordenDeServicioHistoricaData?.cliente?.datos?.celular && (
                    <p>
                      <strong>Celular:</strong>{" "}
                      {ordenDeServicioHistoricaData?.cliente?.datos?.celular}
                    </p>
                  )}
                </div>
              </CardContent>
            ) : (
              <CardContent>
                <div className="space-y-2">
                  <p>
                    <strong>Razon Social:</strong>{" "}
                    {ordenDeServicioHistoricaData?.cliente?.datos?.razonSocial}
                  </p>
                  <p>
                    <strong>RUC:</strong>{" "}
                    {ordenDeServicioHistoricaData?.cliente?.datos?.ruc}
                  </p>
                  <p>
                    <strong>Represante Legal:</strong>{" "}
                    {
                      ordenDeServicioHistoricaData?.cliente?.datos
                        ?.representanteLegal
                    }
                  </p>
                  <p>
                    <strong>Dirección:</strong>{" "}
                    {ordenDeServicioHistoricaData?.cliente?.datos?.direccion}
                  </p>
                  {ordenDeServicioHistoricaData?.cliente?.datos?.email && (
                    <p>
                      <strong>Email:</strong>{" "}
                      {ordenDeServicioHistoricaData?.cliente?.datos?.email}
                    </p>
                  )}
                  {(ordenDeServicioHistoricaData?.cliente?.datos?.celular ??
                    ordenDeServicioHistoricaData?.cliente?.datos?.celular) && (
                    <p>
                      <strong>Celular:</strong>{" "}
                      {ordenDeServicioHistoricaData?.cliente?.datos?.celular ??
                        ordenDeServicioHistoricaData?.cliente?.datos?.celular}
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
                Detalle de la Orden de Servicio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>
                  <strong>Código:</strong> {ordenDeServicioHistoricaData?.code}
                </p>
                <p>
                  <strong>Origen del servicio:</strong>{" "}
                  {ordenDeServicioHistoricaData?.origenServicio === "garantia"
                    ? "Garantía"
                    : ordenDeServicioHistoricaData?.origenServicio === "pagado"
                    ? "Pagado"
                    : "Interno"}
                </p>
                <p>
                  <strong>Tipo de servicio:</strong>{" "}
                  {ordenDeServicioHistoricaData?.tipoServicio ===
                  "mantenimiento"
                    ? "Mantenimiento"
                    : "Reparación"}
                </p>
                <p>
                  <strong>Fecha de ingreso:</strong>{" "}
                  {formatDateLong(
                    ordenDeServicioHistoricaData?.fechaIngreso,
                    false
                  )}
                </p>
                {ordenDeServicioHistoricaData?.fechaEntregaEstimada && (
                  <p>
                    <strong>Fecha de entrega estimada: </strong>
                    {formatDateLong(
                      ordenDeServicioHistoricaData?.fechaEntregaEstimada,
                      false
                    )}
                  </p>
                )}
                {ordenDeServicioHistoricaData?.pago?.montoAdelanto && (
                  <p>
                    <strong>Monto adelantado:</strong> S/.
                    {formatMoney(
                      ordenDeServicioHistoricaData?.pago?.montoAdelanto
                    )}
                  </p>
                )}
                {ordenDeServicioHistoricaData?.estado && (
                  <div className="flex items-center gap-2">
                    <strong>Estado:</strong>
                    {ordenDeServicioHistoricaData.estado === "pendiente" && (
                      <Badge variant="secondary">Pendiente</Badge>
                    )}
                    {ordenDeServicioHistoricaData.estado ===
                      "diagnosticando" && (
                      <Badge variant="outline">Diagnosticando</Badge>
                    )}
                    {ordenDeServicioHistoricaData.estado ===
                      "esperando-repuestos" && (
                      <Badge variant="destructive">Esperando repuestos</Badge>
                    )}
                    {ordenDeServicioHistoricaData.estado ===
                      "en-reparacion" && (
                      <Badge variant="default">En reparación</Badge>
                    )}
                    {ordenDeServicioHistoricaData.estado ===
                      "en-mantenimiento" && (
                      <Badge variant="secondary">En mantenimiento</Badge>
                    )}
                    {ordenDeServicioHistoricaData.estado === "finalizado" && (
                      <Badge variant="success">Finalizado</Badge>
                    )}
                    {ordenDeServicioHistoricaData.estado === "entregado" && (
                      <Badge variant="success">Entregado</Badge>
                    )}
                  </div>
                )}
                {ordenDeServicioHistoricaData?.comprobante && (
                  <p>
                    <strong>Comprobante: </strong>
                    {ordenDeServicioHistoricaData?.comprobante}
                  </p>
                )}
                {ordenDeServicioHistoricaData?.counter &&
                  ordenDeServicioHistoricaData?.comprobante && (
                    <p>
                      <strong>Número de comprobante:</strong>{" "}
                      {formatearCodigoCounterBoletaFactura(
                        ordenDeServicioHistoricaData.counter,
                        ordenDeServicioHistoricaData.comprobante === "Boleta Impresa"
                          ? "boleta"
                          : ordenDeServicioHistoricaData.comprobante === "Factura Impresa"
                          ? "factura"
                          : ""
                      )}
                    </p>
                  )}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <RiBikeLine className="mr-2" />
                Información de la Moto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {ordenDeServicioHistoricaData?.moto?.vin && (
                  <p>
                    <strong>VIN:</strong>
                    {ordenDeServicioHistoricaData?.moto?.vin}
                  </p>
                )}
                {ordenDeServicioHistoricaData?.moto?.placa && (
                  <p>
                    <strong>Placa:</strong>
                    {ordenDeServicioHistoricaData?.moto?.placa}
                  </p>
                )}
                {ordenDeServicioHistoricaData?.moto?.nombre && (
                  <p>
                    <strong>Nombre:</strong>
                    {ordenDeServicioHistoricaData?.moto?.nombre}
                  </p>
                )}
                {ordenDeServicioHistoricaData?.moto?.descripcion && (
                  <p>
                    <strong>Descripción:</strong>
                    {ordenDeServicioHistoricaData?.moto?.descripcion}
                  </p>
                )}
                {ordenDeServicioHistoricaData?.moto?.categoria && (
                  <p>
                    <strong>Categoría:</strong>
                    {ordenDeServicioHistoricaData?.moto?.categoria}
                  </p>
                )}
                {ordenDeServicioHistoricaData?.moto?.marca && (
                  <p>
                    <strong>Marca:</strong>
                    {ordenDeServicioHistoricaData?.moto?.marca}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="mr-2" />
                Mecánicos asignados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>DNI</TableHead>
                    <TableHead>Nombre completo</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ordenDeServicioHistoricaData?.mecanicos?.map((mecanico) => {
                    return (
                      <TableRow key={mecanico?.id}>
                        <TableCell className="font-medium">
                          {mecanico?.dni}
                        </TableCell>
                        <TableCell>
                          {mecanico?.nombres + " " + mecanico?.apellidos}
                        </TableCell>
                        <TableCell>
                          <DetailMecanicoOrdenDeServicioDetailSheet
                            mecanico={mecanico}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        {ordenDeServicioHistoricaData?.productos?.length > 0 && (
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
                  {ordenDeServicioHistoricaData?.productos?.map((producto) => {
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
                          <DetailProductOrdenDeServicioDetailSheet
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
                    <TableCell></TableCell>
                    <TableCell>
                      <span className="font-bold text-lg">
                        Total: S/.{formatMoney(precioTotalProductos)}
                      </span>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
        {ordenDeServicioHistoricaData?.servicios?.length > 0 && (
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
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ordenDeServicioHistoricaData?.servicios?.map((servicio) => {
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
                        <TableCell>
                          <DetailServicioOrdenDeServicioDetailSheet
                            servicioOrdenDeServicio={servicio}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      <span className="font-bold text-lg">
                        Total: S/.{formatMoney(precioTotalServicios)}
                      </span>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2" />
                Comentarios
              </CardTitle>
            </CardHeader>
            <CardContent>
              {ordenDeServicioHistoricaData?.comentarios}
            </CardContent>
          </Card>

          {(ordenDeServicioHistoricaData?.productos?.length > 0 ||
            ordenDeServicioHistoricaData?.servicios?.length > 0) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2" />
                  Resumen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p>
                      <strong>Cantidad de productos:</strong>{" "}
                      {ordenDeServicioHistoricaData?.productos?.reduce(
                        (acc, producto) => acc + producto?.cantidad,
                        0
                      )}
                    </p>
                    <p>
                      <strong>Cantidad de servicios:</strong>{" "}
                      {ordenDeServicioHistoricaData?.servicios?.length}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p>
                      <strong>Total productos:</strong> S/.
                      {precioTotalProductos.toFixed(2)}
                    </p>
                    <p>
                      <strong>Total servicios:</strong> S/.
                      {precioTotalServicios.toFixed(2)}
                    </p>
                    <p>
                      <strong>Monto Total:</strong> S/.
                      {(precioTotalProductos + precioTotalServicios).toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
