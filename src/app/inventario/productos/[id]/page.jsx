import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Plus } from 'lucide-react';

import { getProductByIdRequest } from './_services/requests';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDateLong } from '@/lib/formateador';
import { DataTableProduct } from '@/app/inventario/productos/[id]/_components/ProductTable/data-table';
import { columnsProduct } from '@/app/inventario/productos/[id]/_components/ProductTable/columns';
import { agregarNumeracionTable } from '@/lib/utils';

export default async function Page({ params }) {
  const { product, status } = await getProductByIdRequest(params.id);

  if (!product) {
    notFound();
  }

  const { nombre: productName, updatedAt, unidades } = product;

  const unidadesEnumeradas = agregarNumeracionTable(unidades);

  console.log(unidadesEnumeradas);

  const updatedAtFormated = formatDateLong(updatedAt);

  const navbarTitles = [
    {
      title: 'Inventario',
      href: '/inventario/todos',
      active: false,
    },
    {
      title: 'Productos',
      href: '/inventario/productos',
      active: true,
    },
    {
      title: productName,
      href: `/inventario/productos/${productName}`,
      active: false,
    },
  ];

  return (
    <NavbarDynamic titles={navbarTitles}>
      <div className="container mx-auto p-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">
              Inventario de Productos
            </CardTitle>
            <Button asChild>
              <Link href="/inventario/productos/nuevo">
                <Plus className="mr-2 h-4 w-4" /> Agregar Producto
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <DataTableProduct
              columns={columnsProduct}
              data={unidadesEnumeradas}
              status={status}
            />
          </CardContent>
        </Card>
      </div>
    </NavbarDynamic>
  );
}
