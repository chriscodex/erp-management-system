import { User, Package, Gift, Calendar, Hash, FileText } from 'lucide-react';
import { RiFileListLine } from '@remixicon/react';

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
import {
  formatDateLong,
  formatearCodigoCounterBoletaFactura,
} from '@/lib/formateador';
import { Label } from '@/components/ui/label';

import { DetailProductPreventaDetailSheet } from '@/app/ventas/preventas/[preventaId]/_components/sheets/detailProductPreventaDetailSheet';
import { ImprimirComprobanteVentaHistoricaButton } from '@/app/ventas/ventas-historicas/[id]/_components/buttons/imprimirComprobanteVentaHistoricaButton';
import { DetailObsequioPreventaDetailSheet } from '@/app/ventas/preventas/[preventaId]/_components/sheets/detailObsequioPreventaDetailSheet';

export function DetailVentaHistoricaContent({ ventaHistoricaData }) {
  const isBoletaEmitida = ventaHistoricaData?.comprobante
    .toLowerCase()
    .includes('boleta');

  const isFacturaEmitida = ventaHistoricaData?.comprobante
    .toLowerCase()
    .includes('factura');

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
          <Badge
            variant="error"
            className="text-sm h-9 px-4 flex items-center justify-center"
          >
            <span className="font-bold mr-1">Estado:</span> Finalizado
          </Badge>
          <ImprimirComprobanteVentaHistoricaButton
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
            {ventaHistoricaData?.clienteId?.tipo === 'persona' ? (
              <CardContent>
                <div className="space-y-2">
                  <p>
                    <strong>Nombre:</strong>{' '}
                    {ventaHistoricaData?.clienteId?.datos?.nombres}{' '}
                    {ventaHistoricaData?.clienteId?.datos?.apellidos}
                  </p>
                  <p>
                    <strong>DNI:</strong>{' '}
                    {ventaHistoricaData?.clienteId?.datos?.dni}
                  </p>
                  {ventaHistoricaData?.clienteId?.datos?.direccion && (
                    <p>
                      <strong>Dirección:</strong>{' '}
                      {ventaHistoricaData?.clienteId?.datos?.direccion}
                    </p>
                  )}
                  {ventaHistoricaData?.clienteId?.datos?.email && (
                    <p>
                      <strong>Email:</strong>{' '}
                      {ventaHistoricaData?.clienteId?.datos?.email}
                    </p>
                  )}
                  {ventaHistoricaData?.clienteId?.datos?.celular && (
                    <p>
                      <strong>Celular:</strong>{' '}
                      {ventaHistoricaData?.clienteId?.datos?.celular}
                    </p>
                  )}
                  {ventaHistoricaData?.clienteRuc && (
                    <p>
                      <strong>RUC:</strong> {ventaHistoricaData?.clienteRuc}
                    </p>
                  )}
                </div>
              </CardContent>
            ) : (
              <CardContent>
                <div className="space-y-2">
                  <p>
                    <strong>Razon Social:</strong>{' '}
                    {ventaHistoricaData?.clienteId?.datos?.razonSocial}
                  </p>
                  <p>
                    <strong>RUC:</strong>{' '}
                    {ventaHistoricaData?.clienteId?.datos?.ruc}
                  </p>
                  <p>
                    <strong>Representante Legal:</strong>{' '}
                    {ventaHistoricaData?.clienteId?.datos?.representanteLegal}
                  </p>
                  <p>
                    <strong>Direccion:</strong>{' '}
                    {ventaHistoricaData?.clienteId?.datos?.direccion}
                  </p>
                  {ventaHistoricaData?.clienteId?.datos?.email && (
                    <p>
                      <strong>Email:</strong>{' '}
                      {ventaHistoricaData?.clienteId?.datos?.email}
                    </p>
                  )}
                  {ventaHistoricaData?.clienteId?.datos?.celular && (
                    <p>
                      <strong>Celular:</strong>{' '}
                      {ventaHistoricaData?.clienteId?.datos?.celular}
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
                  <strong>Fecha:</strong>{' '}
                  {formatDateLong(ventaHistoricaData?.fecha, true)}
                </p>
                <p>
                  <strong>Vendedor:</strong>{' '}
                  {ventaHistoricaData?.usuario?.nombres +
                    ' ' +
                    ventaHistoricaData?.usuario?.apellidos}{' '}
                </p>
                {ventaHistoricaData?.sucursalId?.nombre && (
                  <p>
                    <strong>Sucursal:</strong>{' '}
                    {ventaHistoricaData?.sucursalId?.nombre}
                  </p>
                )}
                {ventaHistoricaData?.comprobante && (
                  <p>
                    <strong>Comprobante: </strong>
                    {ventaHistoricaData?.comprobante}
                  </p>
                )}
                {ventaHistoricaData?.counter &&
                  ventaHistoricaData?.comprobante && (
                    <p>
                      <strong>Número de comprobante:</strong>{' '}
                      {isBoletaEmitida || isFacturaEmitida
                        ? formatearCodigoCounterBoletaFactura(
                            ventaHistoricaData.counter,
                            ventaHistoricaData.comprobante === 'Boleta Impresa'
                              ? 'boleta'
                              : ventaHistoricaData.comprobante ===
                                'Factura Impresa'
                              ? 'factura'
                              : '',
                          )
                        : ventaHistoricaData?.code}
                    </p>
                  )}
                <p>
                  <strong>Estado SUNAT:</strong>{' '}
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
                          {producto?.tipo === 'moto'
                            ? producto?.estado?.titulo
                            : producto?.estado}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        S/. {producto?.precioVenta.toFixed(2)}
                      </TableCell>
                      <TableCell>{producto?.cantidad}</TableCell>
                      <TableCell>
                        S/.{' '}
                        {(producto?.precioVenta * producto?.cantidad).toFixed(
                          2,
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
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ventaHistoricaData?.obsequios &&
                ventaHistoricaData.obsequios.length > 0 ? (
                  ventaHistoricaData.obsequios.map((obsequio) => (
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
                    <TableCell colSpan={5} className="h-24 text-center">
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
                  <strong>Total de Productos:</strong>{' '}
                  {ventaHistoricaData?.productos?.reduce(
                    (acc, producto) => acc + producto?.cantidad,
                    0,
                  )}
                </p>
                <p>
                  <strong>Total de Obsequios:</strong>{' '}
                  {ventaHistoricaData?.obsequios?.reduce(
                    (acc, obsequio) => acc + obsequio?.cantidad,
                    0,
                  )}
                </p>
                <p>
                  <strong>Monto Total:</strong> S/.
                  {ventaHistoricaData?.productos
                    .reduce(
                      (acc, producto) =>
                        acc + producto?.precioVenta * producto?.cantidad,
                      0,
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
