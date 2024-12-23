'use client';

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
  ExternalLink,
  Trash,
  Edit2,
} from 'lucide-react';
import Link from 'next/link';
import { DeleteProductAlert } from '@/app/inventario/productos/_components/Dialogs/DeleteProductAlert';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RiImportFill } from '@remixicon/react';

export default function ProductCard({ product }) {
  const router = useRouter();

  /* Manejar estado de eliminar el producto */
  const [isOpenDialogDeleteProduct, setIsOpenDialogDeleteProduct] =
    useState(false);

  return (
    <Card className="w-full max-w-7xl">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold">
              {product?.nombre}
            </CardTitle>
            {product?.descripcion && (
              <CardDescription>{product?.descripcion}</CardDescription>
            )}
          </div>
          {/* Estado */}
          <div className="flex items-center space-x-2">
            <div
              className={`h-2 w-2 rounded-full ${
                product?.estado === 'activo' ? 'bg-green-500' : 'bg-red-500'
              }`}
            />
            <span
              className={`text-sm ${
                product?.estado === 'activo' ? 'text-green-600' : 'text-red-500'
              }`}
            >
              {product?.estado === 'activo' ? 'Activo' : 'Inactivo'}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 max-w-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <Package className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm">Marca: {product?.marcaId?.nombre}</span>
          </div>
          <div className="flex items-center">
            <Package className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm">
              Categoría: {product?.categoryId?.nombre}
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
            <span className="text-sm">
              Obsequio: {product?.obsequio === 'si' ? 'Si' : 'No'}
            </span>
          </div>
          <div className="flex items-center">
            <RiImportFill className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm">
              Importado: {product?.importado === 'si' ? 'Si' : 'No'}
            </span>
          </div>
          <div className="flex items-center col-span-2">
            <Truck className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm">
              Proveedor: {product?.proveedorId?.nombre || 'Proveedor'}
            </span>
          </div>
        </div>
        <Separator />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm">
              Compra: S/. {product.precioCompra.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center">
            <ShoppingCart className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm">
              Venta: S/. {product.precioVenta.toFixed(2)}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-4">
        <Button
          className="w-full col-span-1 bg-destructive text-destructive-foreground hover:bg-destructive/90"
          onClick={() => setIsOpenDialogDeleteProduct(true)}
        >
          <Trash className="h-4 w-4" />
          Eliminar
        </Button>
        <Button
          className="w-full col-span-1"
          variant="outline"
          onClick={() =>
            router.push(`/inventario/productos/${product?._id}/edit`)
          }
        >
          <Edit2 className="h-4 w-4 mr-2" />
          Editar
        </Button>
        <Link
          className="col-span-2 w-full"
          href={`/inventario/productos/${product?._id}/gastos`}
        >
          <Button className="w-full">
            Ver Gastos <ExternalLink className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
      {/* Dialog Delete */}
      <DeleteProductAlert
        isOpen={isOpenDialogDeleteProduct}
        setIsOpen={setIsOpenDialogDeleteProduct}
        id={product?._id}
        actionAfterComplete="push"
      />
    </Card>
  );
}
