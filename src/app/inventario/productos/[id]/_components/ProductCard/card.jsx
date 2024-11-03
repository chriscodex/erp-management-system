import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Package,
  DollarSign,
  ShoppingCart,
  Gift,
  Truck,
} from 'lucide-react';

export default function ProductCard({ product }) {
  const availableUnits = product.unidades.filter(
    (unit) => unit.estado === 'disponible'
  ).length;
  const stockStatus = product.stock < product.stockMinimo ? 'low' : 'normal';

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <div className="flex justify-start items-start">
          <div>
            <CardTitle className="text-xl font-bold">
              {product.nombre}
            </CardTitle>
            <CardDescription>{product.code}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {product.descripcion && (
          <p className="text-sm text-muted-foreground">{product.descripcion}</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <Package className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm">Marca: {product?.marcaId?.nombre}</span>
          </div>
          <div className="flex items-center">
            <Package className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm">
              Categoría: {product?.categoriaId?.nombre}
            </span>
          </div>
          <div className="flex items-center">
            <Package className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm">
              Almacen: {product?.almacenId?.nombre}
            </span>
          </div>
        </div>
        <Separator />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <Gift className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm">Obsequio: {product.obsequio}</span>
          </div>
          <div className="flex items-center">
            <Truck className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm">
              Proveedor: {product.proveedorId?.nombre || 'Proveedor'}
            </span>
          </div>
        </div>
        <Separator />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Editar</Button>
        <Button>Ver Detalles</Button>
      </CardFooter>
    </Card>
  );
}
