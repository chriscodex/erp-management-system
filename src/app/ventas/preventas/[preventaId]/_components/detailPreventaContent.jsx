import { format } from 'date-fns';
import { es } from 'date-fns/locale';
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
import { User, Package, Gift, Calendar, Hash } from 'lucide-react';

export default function PreSaleDetail({ preventaData }) {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Detalle de Preventa</h1>

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
              <div>
                <strong>Estado:</strong> <Badge>{preventaData?.estado}</Badge>
              </div>
              <p>
                <strong>Fecha:</strong>{' '}
                {format(new Date(preventaData?.fecha), 'PPpp', { locale: es })}
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {preventaData?.productosPreventa.map((producto) => (
                <TableRow key={producto.code}>
                  <TableCell className="font-medium">{producto.code}</TableCell>
                  <TableCell>{producto.nombre}</TableCell>
                  <TableCell>{producto.descripcion}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{producto.estado}</Badge>
                  </TableCell>
                  <TableCell>S/. {producto.precioVenta.toFixed(2)}</TableCell>
                  <TableCell>{producto.cantidad}</TableCell>
                  <TableCell>
                    S/. {(producto.precioVenta * producto.cantidad).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
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
              {preventaData?.obsequiosPreventa.map((obsequio) => (
                <TableRow key={obsequio.code}>
                  <TableCell className="font-medium">{obsequio.code}</TableCell>
                  <TableCell>{obsequio.nombre}</TableCell>
                  <TableCell>{obsequio.descripcion}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{obsequio.estado}</Badge>
                  </TableCell>
                  <TableCell>{obsequio.cantidad}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
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
              {preventaData?.productosPreventa?.reduce(
                (acc, producto) => acc + producto?.cantidad,
                0
              )}
            </p>
            <p>
              <strong>Total de Obsequios:</strong>{' '}
              {preventaData?.obsequiosPreventa?.reduce(
                (acc, obsequio) => acc + obsequio?.cantidad,
                0
              )}
            </p>
            <p>
              <strong>Monto Total:</strong> S/. 
              {preventaData?.productosPreventa
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
  );
}
