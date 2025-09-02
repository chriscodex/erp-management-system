import { User, Package, Hash, FileText, Calendar } from 'lucide-react';
import { RiBikeLine, RiFileListLine } from '@remixicon/react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDateLong, formatDateShort } from '@/lib/formateador';
import { Label } from '@/components/ui/label';

import { DetailOrdenDeServicioButtons } from '@/app/taller/ordenes-servicio/[id]/_components/buttons/detailOrdenDeServicioButtons';
import { formatMoney } from '@/lib/utils';
import { EmitirComprobanteOrdenDeServicioButton } from '@/app/taller/ordenes-servicio/[id]/_components/buttons/emitirComprobanteOrdenDeServicioButton';
import { HomeRepairService } from '@mui/icons-material';
import { DetailProductOrdenDeServicioDetailSheet } from '@/app/taller/ordenes-servicio/[id]/_components/sheets/detailProductOrdenDeServicioDetailSheet';
import { DetailServicioOrdenDeServicioDetailSheet } from '@/app/taller/ordenes-servicio/[id]/_components/sheets/detailServicioOrdenDeServicioDetailSheet';
import { DetailMecanicoOrdenDeServicioDetailSheet } from '@/app/taller/ordenes-servicio/[id]/_components/sheets/detailMecanicoOrdenDeServicioDetailSheet';
import { DetailProductExternoOrdenDeServicioDetailSheet } from '@/app/taller/ordenes-servicio/[id]/_components/sheets/detailProductExternoOrdenDeServicioDetailSheet';
import { ImprimirOrdenDeServicioButton } from '@/app/taller/ordenes-servicio/[id]/_components/buttons/imprimirOrdenDeServicioButton';

export function DetailOrdenDeServicioContent({
  ordenDeServicioData,
  empresas,
}) {
  const precioTotalProductos = ordenDeServicioData?.productos?.reduce(
    (acc, product) => {
      return acc + product.precioVenta;
    },
    0,
  );

  const precioTotalServicios = ordenDeServicioData?.servicios?.reduce(
    (acc, servicio) => {
      return acc + servicio.precio;
    },
    0,
  );

  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardHeader className="flex flex-col gap-2 items-center justify-between space-y-0 pb-4 md:flex-row  ">
        <div className="flex items-center gap-2">
          <RiFileListLine className="h-9 w-9" />
          <Label className="sm:text-4xl text-xl font-bold">
            Detalle de la Orden de Servicio
          </Label>
        </div>
        <div className="flex gap-2">
          <ImprimirOrdenDeServicioButton
            ordenDeServicioData={ordenDeServicioData}
          />
          <EmitirComprobanteOrdenDeServicioButton
            ordenDeServicioData={ordenDeServicioData}
            empresas={empresas}
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
            {ordenDeServicioData?.cliente?.tipo === 'persona' ? (
              <CardContent>
                <div className="space-y-2">
                  <p>
                    <strong>Nombre:</strong>{' '}
                    {ordenDeServicioData?.cliente?.datos?.nombres}{' '}
                    {ordenDeServicioData?.cliente?.datos?.apellidos}
                  </p>
                  <p>
                    <strong>DNI:</strong>{' '}
                    {ordenDeServicioData?.cliente?.datos?.dni}
                  </p>
                  {ordenDeServicioData?.cliente?.datos?.direccion && (
                    <p>
                      <strong>Dirección:</strong>{' '}
                      {ordenDeServicioData?.cliente?.datos?.direccion}
                    </p>
                  )}
                  {ordenDeServicioData?.cliente?.datos?.email && (
                    <p>
                      <strong>Email:</strong>{' '}
                      {ordenDeServicioData?.cliente?.datos?.email}
                    </p>
                  )}
                  {ordenDeServicioData?.cliente?.datos?.celular && (
                    <p>
                      <strong>Celular:</strong>{' '}
                      {ordenDeServicioData?.cliente?.datos?.celular}
                    </p>
                  )}
                </div>
              </CardContent>
            ) : (
              <CardContent>
                <div className="space-y-2">
                  <p>
                    <strong>Razon Social:</strong>{' '}
                    {ordenDeServicioData?.cliente?.datos?.razonSocial}
                  </p>
                  <p>
                    <strong>RUC:</strong>{' '}
                    {ordenDeServicioData?.cliente?.datos?.ruc}
                  </p>
                  <p>
                    <strong>Represante Legal:</strong>{' '}
                    {ordenDeServicioData?.cliente?.datos?.representanteLegal}
                  </p>
                  {ordenDeServicioData?.cliente?.datos?.direccion && (
                    <p>
                      <strong>Dirección:</strong>{' '}
                      {ordenDeServicioData?.cliente?.datos?.direccion}
                    </p>
                  )}
                  {ordenDeServicioData?.cliente?.datos?.email && (
                    <p>
                      <strong>Email:</strong>{' '}
                      {ordenDeServicioData?.cliente?.datos?.email}
                    </p>
                  )}
                  {(ordenDeServicioData?.cliente?.datos?.celular ??
                    ordenDeServicioData?.cliente?.datos?.celular) && (
                    <p>
                      <strong>Celular:</strong>{' '}
                      {ordenDeServicioData?.cliente?.datos?.celular ??
                        ordenDeServicioData?.cliente?.datos?.celular}
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
                  <strong>Código:</strong> {ordenDeServicioData?.code}
                </p>
                <p>
                  <strong>Origen del servicio:</strong>{' '}
                  {ordenDeServicioData?.origenServicio === 'garantia'
                    ? 'Garantía'
                    : ordenDeServicioData?.origenServicio === 'pagado'
                      ? 'Pagado'
                      : 'Interno'}
                </p>
                <p>
                  <strong>Tipo de servicio:</strong>{' '}
                  {ordenDeServicioData?.tipoServicio === 'mantenimiento'
                    ? 'Mantenimiento'
                    : 'Reparación'}
                </p>
                <p>
                  <strong>Fecha de ingreso:</strong>{' '}
                  {formatDateLong(ordenDeServicioData?.fechaIngreso, false)}
                </p>
                {ordenDeServicioData?.fechaEntregaEstimada && (
                  <p>
                    <strong>Fecha de entrega estimada:</strong>
                    {formatDateLong(
                      ordenDeServicioData?.fechaEntregaEstimada,
                      false,
                    )}
                  </p>
                )}
                {ordenDeServicioData?.pago?.montoAdelanto != null && (
                  <p>
                    <strong>Monto adelantado:</strong> S/.
                    {formatMoney(ordenDeServicioData.pago.montoAdelanto)}
                  </p>
                )}
                {ordenDeServicioData?.estado && (
                  <div className="flex items-center gap-2">
                    <strong>Estado:</strong>
                    {ordenDeServicioData.estado === 'pendiente' && (
                      <Badge variant="secondary">Pendiente</Badge>
                    )}
                    {ordenDeServicioData.estado === 'diagnosticando' && (
                      <Badge variant="outline">Diagnosticando</Badge>
                    )}
                    {ordenDeServicioData.estado === 'esperando-repuestos' && (
                      <Badge variant="destructive">Esperando repuestos</Badge>
                    )}
                    {ordenDeServicioData.estado === 'en-reparacion' && (
                      <Badge variant="default">En reparación</Badge>
                    )}
                    {ordenDeServicioData.estado === 'en-mantenimiento' && (
                      <Badge variant="secondary">En mantenimiento</Badge>
                    )}
                    {ordenDeServicioData.estado === 'finalizado' && (
                      <Badge variant="success">Finalizado</Badge>
                    )}
                    {ordenDeServicioData.estado === 'entregado' && (
                      <Badge variant="success">Entregado</Badge>
                    )}
                  </div>
                )}
                {ordenDeServicioData?.comprobante && (
                  <p>
                    <strong>Comprobante:</strong>{' '}
                    {ordenDeServicioData?.comprobante}
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
                {ordenDeServicioData?.moto?.vin && (
                  <p>
                    <strong>VIN: </strong>
                    {ordenDeServicioData?.moto?.vin}
                  </p>
                )}
                {ordenDeServicioData?.moto?.placa && (
                  <p>
                    <strong>Placa: </strong>
                    {ordenDeServicioData?.moto?.placa}
                  </p>
                )}
                {ordenDeServicioData?.moto?.nombre && (
                  <p>
                    <strong>Nombre: </strong>
                    {ordenDeServicioData?.moto?.nombre}
                  </p>
                )}
                {ordenDeServicioData?.moto?.descripcion && (
                  <p>
                    <strong>Descripción: </strong>
                    {ordenDeServicioData?.moto?.descripcion}
                  </p>
                )}
                {ordenDeServicioData?.moto?.categoria && (
                  <p>
                    <strong>Categoría: </strong>
                    {ordenDeServicioData?.moto?.categoria}
                  </p>
                )}
                {ordenDeServicioData?.moto?.marca && (
                  <p>
                    <strong>Marca: </strong>
                    {ordenDeServicioData?.moto?.marca}
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
                  {ordenDeServicioData?.mecanicos?.map((mecanico) => {
                    return (
                      <TableRow key={mecanico?.id}>
                        <TableCell className="font-medium">
                          {mecanico?.dni}
                        </TableCell>
                        <TableCell>
                          {mecanico?.nombres + ' ' + mecanico?.apellidos}
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
        {ordenDeServicioData?.productos?.length > 0 && (
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
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ordenDeServicioData?.productos?.map((producto) => {
                    return (
                      <TableRow key={producto?.code}>
                        <TableCell className="font-medium">
                          {producto?.code}
                        </TableCell>
                        <TableCell>{producto?.nombre}</TableCell>
                        <TableCell>{producto?.descripcion}</TableCell>
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
        {ordenDeServicioData?.productosExternos?.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="mr-2" />
                Productos Externos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ordenDeServicioData?.productosExternos?.map(
                    (productoExterno) => {
                      return (
                        <TableRow key={productoExterno?.code}>
                          <TableCell>{productoExterno?.nombre}</TableCell>
                          <TableCell>{productoExterno?.descripcion}</TableCell>
                          <TableCell>{productoExterno?.cantidad}</TableCell>
                          <TableCell>
                            {formatDateShort(productoExterno?.fecha, false)}
                          </TableCell>
                          <TableCell>
                            <DetailProductExternoOrdenDeServicioDetailSheet
                              productoExternoOrdenDeServicio={productoExterno}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    },
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
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
                    <TableHead>Acciones</TableHead>
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
            <CardContent>{ordenDeServicioData?.comentarios}</CardContent>
          </Card>

          {(ordenDeServicioData?.productos?.length > 0 ||
            ordenDeServicioData?.servicios?.length > 0) && (
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
                      <strong>Cantidad de productos:</strong>{' '}
                      {ordenDeServicioData?.productos?.reduce(
                        (acc, producto) => acc + producto?.cantidad,
                        0,
                      )}
                    </p>
                    <p>
                      <strong>Cantidad de servicios:</strong>{' '}
                      {ordenDeServicioData?.servicios?.length}
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
        <div className="mt-4">
          <DetailOrdenDeServicioButtons
            ordenDeServicioId={ordenDeServicioData._id}
            disabled={
              ordenDeServicioData?.comprobante === 'Boleta Impresa' ||
              ordenDeServicioData?.comprobante === 'Factura Impresa'
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}
