import { User, Package, Gift, Hash } from 'lucide-react';
import { RiInfoCardFill } from '@remixicon/react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDateLong } from '@/lib/formateador';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

import { DetailBoletaButtons } from '@/app/ventas/[ventaId]/boleta/_components/buttons/detailBoletaButtons';
import { ImprimirBoletaButton } from '@/app/ventas/[ventaId]/boleta/_components/buttons/imprimirButton';

export function DetailBoletaContent({ ventaData, empresas }) {
  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-2">
          <RiInfoCardFill className="h-9 w-9" />
          <Label className="sm:text-4xl text-xl font-bold">Boleta</Label>
        </div>
        <ImprimirBoletaButton ventaData={ventaData} empresas={empresas} />
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
              {ventaData?.cliente?.tipo === 'persona' ? (
                <div className="space-y-2">
                  <p>
                    <strong>Nombre:</strong>{' '}
                    {ventaData?.cliente?.datos?.nombres}{' '}
                    {ventaData?.cliente?.datos?.apellidos}
                  </p>
                  <p>
                    <strong>DNI:</strong> {ventaData?.cliente?.datos?.dni}
                  </p>
                  <p>
                    <strong>Celular:</strong>{' '}
                    {ventaData?.cliente?.datos?.celular}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p>
                    <strong>Razon Social:</strong>{' '}
                    {ventaData?.cliente?.datos?.razonSocial}
                  </p>
                  <p>
                    <strong>RUC:</strong> {ventaData?.cliente?.datos?.ruc}
                  </p>
                  <p>
                    <strong>Celular:</strong>{' '}
                    {ventaData?.cliente?.datos?.celular}
                  </p>
                </div>
              )}
            </CardContent>
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
                  <strong>Fecha:</strong>{' '}
                  {formatDateLong(ventaData?.fecha, true)}
                </p>
                <p>
                  <strong>Vendedor:</strong>{' '}
                  {ventaData?.usuario?.nombres +
                    ' ' +
                    ventaData?.usuario?.apellidos}{' '}
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
                  <TableHead>Precio</TableHead>
                  <TableHead>Cantidad</TableHead>
                  <TableHead>Total</TableHead>
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
                        S/. {producto?.precioVenta.toFixed(2)}
                      </TableCell>
                      <TableCell>{producto?.cantidad}</TableCell>
                      <TableCell>
                        S/.{' '}
                        {(producto?.precioVenta * producto?.cantidad).toFixed(
                          2
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <Separator className="my-4" />
            <div className="text-right">
              <strong>Subtotal:</strong> S/.
              {(
                0.82 *
                ventaData?.productos.reduce(
                  (acc, producto) =>
                    acc + producto?.precioVenta * producto?.cantidad,
                  0
                )
              ).toFixed(2)}
            </div>
            <div className="mt-2 text-right">
              <strong>IGV:</strong> S/.
              {(
                0.18 *
                ventaData?.productos.reduce(
                  (acc, producto) =>
                    acc + producto?.precioVenta * producto?.cantidad,
                  0
                )
              ).toFixed(2)}
            </div>
            <div className="mt-2 text-right">
              <strong>Total a Pagar:</strong> S/.
              {ventaData?.productos
                .reduce(
                  (acc, producto) =>
                    acc + producto?.precioVenta * producto?.cantidad,
                  0
                )
                .toFixed(2)}
            </div>
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
                    <TableCell>{obsequio?.cantidad}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <div className="mt-4">
          <DetailBoletaButtons ventaId={ventaData._id} ventaData={ventaData} />
        </div>
      </CardContent>
    </Card>
  );
}
