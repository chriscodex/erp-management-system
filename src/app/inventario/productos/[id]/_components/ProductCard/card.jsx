import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Package,
  DollarSign,
  ShoppingCart,
  Gift,
  Truck,
  BarChart2,
} from 'lucide-react';

export default function ProductCard({ product }) {
  const availableUnits = product.unidades.filter(
    (unit) => unit.estado === 'disponible'
  ).length;
  const stockStatus = product.stock < product.stockMinimo ? 'low' : 'normal';

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold">
              {product.nombre}
            </CardTitle>
            <CardDescription>{product.code}</CardDescription>
          </div>
          <Badge variant={stockStatus === 'low' ? 'destructive' : 'secondary'}>
            Stock: {product.stock}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {product.descripcion && (
          <p className="text-sm text-muted-foreground">{product.descripcion}</p>
        )}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <Package className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm">Disponibles: {availableUnits}</span>
          </div>
          <div className="flex items-center">
            <BarChart2 className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm">Mínimo: {product.stockMinimo}</span>
          </div>
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm">
              Compra: ${product.precioCompra.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center">
            <ShoppingCart className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm">
              Venta: ${product.precioVenta.toFixed(2)}
            </span>
          </div>
        </div>
        <Separator />
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <Gift className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm">Obsequio: {product.obsequio}</span>
          </div>
          <div className="flex items-center">
            <Truck className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm">
              {product.proveedor?.nombre || 'Proveedor'}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.segment && (
            <Badge variant="outline">{product.segment.nombre}</Badge>
          )}
          {product.marca && (
            <Badge variant="outline">{product.marca.nombre}</Badge>
          )}
          {product.categoria && (
            <Badge variant="outline">{product.categoria.nombre}</Badge>
          )}
          {product.almacen && (
            <Badge variant="outline">{product.almacen.nombre}</Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Editar</Button>
        <Button>Ver Detalles</Button>
      </CardFooter>
    </Card>
  );
}
