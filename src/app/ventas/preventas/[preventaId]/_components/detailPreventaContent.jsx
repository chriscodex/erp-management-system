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
import { formatDateLong } from '@/lib/formateador';
import { Label } from '@/components/ui/label';

import { DetailProductPreventaDetailSheet } from '@/app/ventas/preventas/[preventaId]/_components/sheets/detailProductPreventaDetailSheet';
import { DetailPreventaButtons } from '@/app/ventas/preventas/[preventaId]/_components/buttons/detailPreventaButtons';
import { GenerarVentaButton } from '@/app/ventas/preventas/[preventaId]/_components/buttons/generarVentaButton';
import { formatMoney } from '@/lib/utils';

export function DetailPreventaContent({ preventaData }) {
  const precioTotal = preventaData?.productos?.reduce((acc, product) => {
    return acc + product.precioVenta;
  }, 0);
  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-2">
          <RiFileListLine className="h-9 w-9" />
          <Label className="sm:text-4xl text-xl font-bold">
            Detalle de la Pre-Venta
          </Label>
        </div>
        <GenerarVentaButton preventaId={preventaData._id} />
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
            {preventaData?.cliente?.tipo === 'persona' ? (
              <CardContent>
                <div className="space-y-2">
                  <p>
                    <strong>Nombre:</strong>{' '}
                    {preventaData?.cliente?.datos?.nombres}{' '}
                    {preventaData?.cliente?.datos?.apellidos}
                  </p>
                  <p>
                    <strong>DNI:</strong> {preventaData?.cliente?.datos?.dni}
                  </p>
                  <p>
                    <strong>Celular:</strong>{' '}
                    {preventaData?.cliente?.datos?.celular}
                  </p>
                </div>
              </CardContent>
            ) : (
              <CardContent>
                <div className="space-y-2">
                  <p>
                    <strong>Razon Social:</strong>{' '}
                    {preventaData?.cliente?.datos?.razonSocial}
                  </p>
                  <p>
                    <strong>RUC:</strong> {preventaData?.cliente?.datos?.ruc}
                  </p>
                  <p>
                    <strong>Celular:</strong>{' '}
                    {preventaData?.cliente?.datos?.celular}
                  </p>
                </div>
              </CardContent>
            )}
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Hash className="mr-2" />
                Detalles de la Preventa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>
                  <strong>Código:</strong> {preventaData?.code}
                </p>
                <p>
                  <strong>Fecha:</strong>{' '}
                  {formatDateLong(preventaData?.fecha, true)}
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
                          {producto?.tipo === 'moto'
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {preventaData?.obsequios?.map((obsequio) => (
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
                  <strong>Total de Productos:</strong>{' '}
                  {preventaData?.productos?.reduce(
                    (acc, producto) => acc + producto?.cantidad,
                    0
                  )}
                </p>
                <p>
                  <strong>Total de Obsequios:</strong>{' '}
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
