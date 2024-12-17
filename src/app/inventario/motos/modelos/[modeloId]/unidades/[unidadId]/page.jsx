import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BikeIcon as Motorcycle,
  Package,
  DollarSign,
  TrendingUp,
  Trash2,
  Pencil,
  FileText,
  Receipt,
} from 'lucide-react';
import Link from 'next/link';
import { getMotoByIdRequestServer } from '@/app/inventario/motos/modelos/[modeloId]/unidades/[unidadId]/_services/requests';

export default async function MotoDetailPage({ params }) {
  const { moto } = await getMotoByIdRequestServer(params.unidadId);

  const margenValue =
    ((moto?.precioVenta - moto?.precioCompra) / moto?.precioCompra) * 100;

  const totalGastos = moto?.gastos?.reduce(
    (total, gasto) => total + gasto.monto,
    0
  );

  const cantidadGastos = moto?.gastos?.length;

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
      title: moto?.modeloId?.nombre,
      href: `/inventario/motos/modelos/${moto?.modeloId?._id}`,
      active: true,
    },
    {
      title: `Moto ${moto?.nombre}`,
      href: '',
      active: false,
    },
  ];

  console.log(moto);

  return (
    <NavbarDynamic titles={navbarTitles}>
      <div className="w-full">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {moto?.nombre}
            </h1>
            <Badge variant="outline" className="text-lg px-3 py-1">
              {moto?.code}
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
                    <span className="font-medium">
                      {moto?.modeloId?.marcaId?.nombre}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Categoría:
                    </span>
                    <span className="font-medium">
                      {moto?.modeloId?.categoryId?.nombre}
                    </span>
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
                  {moto?.descripcion}
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
                    <span className="font-medium">
                      {moto?.almacenId?.nombre}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Importado:
                    </span>
                    <Badge variant="default">
                      {moto?.importado === 'si' ? 'Sí' : 'No'}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Proveedor:
                    </span>
                    <span className="font-medium">
                      {moto?.proveedorId?.nombre}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="mr-2" />
                  Información de Precios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">
                      Precio de Compra
                    </p>
                    <p className="text-2xl font-bold">
                      S/.{' '}
                      {parseFloat(moto?.precioCompra)
                        .toFixed(2)
                        .toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">
                      Precio de Venta
                    </p>
                    <p className="text-2xl font-bold">
                      S/.{' '}
                      {parseFloat(moto?.precioVenta)
                        .toFixed(2)
                        .toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Margen</p>
                    <p
                      className={`text-2xl font-bold ${
                        margenValue.toFixed(2) >= 0
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {margenValue >= 0
                        ? `+${margenValue.toFixed(2)}`
                        : `-${margenValue.toFixed(2)}`}
                      %
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Receipt className="mr-2" />
                  Resumen de Gastos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">
                      Total de Gastos
                    </p>
                    <p className="text-2xl font-bold">
                      S/. {totalGastos?.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">
                      Cantidad de Gastos
                    </p>
                    <p className="text-2xl font-bold">
                      {cantidadGastos?.toLocaleString()}
                    </p>
                  </div>
                </div>
                <Link
                  className="flex justify-end"
                  href={`/inventario/motos/modelos/${moto?.modeloId?._id}/unidades/${moto?._id}/gastos`}
                  passHref
                >
                  <Button className="flex items-center">
                    <TrendingUp className="mr-2" />
                    Ver Gastos
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 flex justify-between">
            <div className="flex space-x-4">
              <Link href={`/motorcycle/edit`} passHref>
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
          </div>
        </div>
      </div>
    </NavbarDynamic>
  );
}
