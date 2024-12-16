import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  BikeIcon as Motorcycle,
  Package,
  Warehouse,
  DollarSign,
  TrendingUp,
  Truck,
  Trash2,
  Pencil,
  FileText,
} from 'lucide-react';
import Link from 'next/link';

export default function MotorcycleDetail() {
  // Esta información vendría de tu base de datos o API
  const motorcycle = {
    name: 'Yamaha YZF-R6',
    code: 'YAM-R6-2023',
    brand: 'Yamaha',
    category: 'Deportiva',
    warehouse: 'Almacén Central',
    imported: true,
    supplier: 'Yamaha Motor Co., Ltd.',
    purchasePrice: 12000,
    salePrice: 15999,
    description:
      'La Yamaha YZF-R6 es una motocicleta deportiva de alto rendimiento diseñada para ofrecer una experiencia de conducción emocionante tanto en la calle como en la pista. Con su motor de 599cc y su chasis ligero, la R6 ofrece una combinación perfecta de potencia y agilidad.',
  };

  const navbarTitles = [
    {
      title: 'Inventario',
      href: '',
      active: false,
    },
    {
      title: 'Motos',
      href: '',
      active: false,
    },
    {
      title: 'Modelos',
      href: '/inventario/motos/modelos',
      active: true,
    },
    {
      title: 'xd',
      href: '',
      active: false,
    },
  ];

  return (
    <NavbarDynamic titles={navbarTitles}>
      <div className="w-full">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {motorcycle.name}
            </h1>
            <Badge variant="outline" className="text-lg px-3 py-1">
              {motorcycle.code}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Motorcycle className="mr-2" />
                  Detalles del Modelo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Marca:
                    </span>
                    <span className="font-medium">{motorcycle.brand}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Categoría:
                    </span>
                    <span className="font-medium">{motorcycle.category}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2" />
                  Descripción
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">
                  {motorcycle.description}
                </p>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="mr-2" />
                  Información de Inventario
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Almacén:
                    </span>
                    <span className="font-medium">{motorcycle.warehouse}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Importado:
                    </span>
                    <Badge
                      variant={motorcycle.imported ? 'default' : 'secondary'}
                    >
                      {motorcycle.imported ? 'Sí' : 'No'}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Proveedor:
                    </span>
                    <span className="font-medium">{motorcycle.supplier}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="mr-2" />
                Información de Precios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 dark:text-gray-400">
                    Precio de Compra
                  </p>
                  <p className="text-2xl font-bold">
                    ${motorcycle.purchasePrice.toLocaleString()}
                  </p>
                </div>
                <Separator orientation="vertical" className="h-12" />
                <div>
                  <p className="text-gray-500 dark:text-gray-400">
                    Precio de Venta
                  </p>
                  <p className="text-2xl font-bold">
                    ${motorcycle.salePrice.toLocaleString()}
                  </p>
                </div>
                <Separator orientation="vertical" className="h-12" />
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Margen</p>
                  <p className="text-2xl font-bold text-green-600">
                    {(
                      ((motorcycle.salePrice - motorcycle.purchasePrice) /
                        motorcycle.purchasePrice) *
                      100
                    ).toFixed(2)}
                    %
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 flex justify-between">
            <div className="flex space-x-4">
              <Link href={`/motorcycle/${motorcycle.id}/edit`} passHref>
                <Button variant="outline" className="flex items-center">
                  <Pencil className="mr-2 h-4 w-4" />
                  Editar
                </Button>
              </Link>
              <Button variant="destructive" className="flex items-center">
                <Trash2 className="mr-2 h-4 w-4" />
                Eliminar
              </Button>
            </div>
            <Link href={`/motorcycle/${motorcycle.code}/expenses`} passHref>
              <Button className="flex items-center">
                <TrendingUp className="mr-2" />
                Ver Gastos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </NavbarDynamic>
  );
}
