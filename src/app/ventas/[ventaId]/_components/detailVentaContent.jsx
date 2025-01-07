import {
  User,
  Package,
  Gift,
  Calendar,
  Hash,
  FileText,
} from 'lucide-react';
import { RiFileList2Fill, RiFileList3Line, RiFileListLine } from '@remixicon/react';

import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { Button } from '@/components/ui/button';
import { DetailVentaButtons } from '@/app/ventas/[ventaId]/_components/buttons/detailVentaButtons';

export function DetailVentaContent({ ventaData }) {
  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-2">
          <RiFileListLine className="h-9 w-9" />
          <Label className="sm:text-4xl text-xl font-bold">
            Detalle de la Venta
          </Label>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="px-2">
              <RiFileList2Fill className="h-4 w-4" />
              <span>Emitir Comprobante</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuItem className="cursor-pointer">
              <RiFileListLine />
              Boleta
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <RiFileList2Fill />
              Factura
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <RiFileList3Line />
              Nota de Venta
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
            {ventaData?.cliente?.tipo === 'persona' ? (
              <CardContent>
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
              </CardContent>
            ) : (
              <CardContent>
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
                  <strong>Fecha:</strong>{' '}
                  {formatDateLong(ventaData?.fecha, true)}
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
                {ventaData?.productosPreventa.map((producto) => {
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
                {ventaData?.obsequiosPreventa.map((obsequio) => (
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
                  <strong>Total de Productos:</strong>{' '}
                  {ventaData?.productosPreventa?.reduce(
                    (acc, producto) => acc + producto?.cantidad,
                    0
                  )}
                </p>
                <p>
                  <strong>Total de Obsequios:</strong>{' '}
                  {ventaData?.obsequiosPreventa?.reduce(
                    (acc, obsequio) => acc + obsequio?.cantidad,
                    0
                  )}
                </p>
                <p>
                  <strong>Monto Total:</strong> S/.
                  {ventaData?.productosPreventa
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
