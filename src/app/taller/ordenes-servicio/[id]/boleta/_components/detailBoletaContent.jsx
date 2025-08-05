'use client';

import { User, Package, Hash } from 'lucide-react';
import { RiInfoCardFill } from '@remixicon/react';
import { useState } from 'react';

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
  formatDateShort,
  formatearCodigoCounterBoletaFactura,
} from '@/lib/formateador';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

import { ImprimirBoletaButton } from '@/app/taller/ordenes-servicio/[id]/boleta/_components/buttons/imprimirBoletaButton';
import { FinalizarOrdenDeServicioButton } from '@/app/taller/ordenes-servicio/[id]/_components/buttons/FinalizarOrdenDeServicioButton';
import { HomeRepairService } from '@mui/icons-material';
import { formatMoney } from '@/lib/utils';
import { DeleteProductoFromInventarioButton } from '@/app/taller/ordenes-servicio/[id]/_components/buttons/deleteProductoFromInventarioButton';

export function DetailBoletaContent({ ordenDeServicioData, empresas }) {
  const [loading, setLoading] = useState(false);

  const precioTotalProductos = ordenDeServicioData?.productos?.reduce(
    (acc, product) => {
      return acc + product.precioVenta;
    },
    0
  );

  const precioTotalServicios = ordenDeServicioData?.servicios?.reduce(
    (acc, servicio) => {
      return acc + servicio.precio;
    },
    0
  );

  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardHeader className="flex flex-col lg:flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-2">
          <RiInfoCardFill className="h-9 w-9" />
          <Label className="sm:text-4xl text-xl font-bold">Boleta</Label>
        </div>
        <div className="flex flex-col items-center lg:flex-row gap-4">
          <ImprimirBoletaButton
            ordenDeServicioData={ordenDeServicioData}
            empresas={empresas}
            reimprimir={!!ordenDeServicioData?.counter}
            loading={loading}
            setLoading={setLoading}
          />
          <FinalizarOrdenDeServicioButton
            ordenDeServicioId={ordenDeServicioData?._id}
            disabled={ordenDeServicioData?.comprobante !== 'Boleta Impresa'}
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
              {ordenDeServicioData?.cliente?.tipo === 'persona' ? (
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
              ) : (
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
                    <strong>Representante Legal:</strong>{' '}
                    {ordenDeServicioData?.cliente?.datos?.representanteLegal}
                  </p>
                  <p>
                    <strong>Dirección:</strong>{' '}
                    {ordenDeServicioData?.cliente?.datos?.direccion}
                  </p>
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
                  <strong>Fecha de ingreso:</strong>{' '}
                  {formatDateLong(ordenDeServicioData?.fechaIngreso, true)}
                </p>
                {ordenDeServicioData?.pago?.montoAdelanto != null && (
                  <p>
                    <strong>Monto adelantado:</strong> S/.
                    {formatMoney(ordenDeServicioData.pago.montoAdelanto)}
                  </p>
                )}
                {(ordenDeServicioData?.productos?.length > 0 ||
                  ordenDeServicioData?.servicios?.length > 0) && (
                  <p>
                    <strong>Importe total:</strong>{' '}
                    {(precioTotalProductos + precioTotalServicios).toFixed(2)}
                  </p>
                )}
                {ordenDeServicioData?.pago?.montoAdelanto != null && (
                  <p>
                    <strong>Importe restante:</strong>{' '}
                    <strong>
                      {(
                        precioTotalProductos +
                        precioTotalServicios -
                        ordenDeServicioData?.pago?.montoAdelanto
                      ).toFixed(2)}
                    </strong>
                  </p>
                )}
                <p>
                  <strong>Comprobante:</strong>{' '}
                  {ordenDeServicioData?.comprobante}
                </p>
                {ordenDeServicioData?.counter && (
                  <p>
                    <strong>Número de comprobante:</strong>{' '}
                    {formatearCodigoCounterBoletaFactura(
                      ordenDeServicioData?.counter,
                      'boleta'
                    )}
                  </p>
                )}
                <p>
                  <strong>Estado SUNAT:</strong>{' '}
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
                  <TableHead>Inventario</TableHead>
                  {ordenDeServicioData?.comprobante === 'Boleta Impresa' && (
                    <TableHead>Acciones</TableHead>
                  )}
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
                        S/.{' '}
                        {(producto?.precioVenta * producto?.cantidad).toFixed(
                          2
                        )}
                      </TableCell>
                      <TableCell>
                        {producto.inventario === 'eliminado' ? (
                          <Badge
                            variant="outline"
                            className="text-red-600 border-red-600"
                          >
                            Eliminado
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="text-green-600 border-green-600"
                          >
                            Existente
                          </Badge>
                        )}
                      </TableCell>
                      {ordenDeServicioData?.comprobante ===
                        'Boleta Impresa' && (
                        <TableCell>
                          {producto.inventario !== 'eliminado' &&
                            ordenDeServicioData?.comprobante ===
                              'Boleta Impresa' && (
                              <DeleteProductoFromInventarioButton
                                ordenDeServicioData={ordenDeServicioData}
                                productoOrdenDeServicio={producto}
                              />
                            )}
                        </TableCell>
                      )}
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
