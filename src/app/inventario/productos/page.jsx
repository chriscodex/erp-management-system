import Link from 'next/link';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { DataTableProducts } from '@/app/inventario/productos/_components/ProductsTable/data-table';
import { columnsProducts } from '@/app/inventario/productos/_components/ProductsTable/columns';
import { getAllProductsRequest } from '@/app/inventario/productos/_services/requests';

export default async function ProductsPage() {
  const { products, status } = await getAllProductsRequest();

  /* Secciones del navbar */
  const navbarTitles = [
    {
      title: 'Inventario',
      href: '',
      active: false,
    },
    {
      title: 'Productos',
      href: '',
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
            <DataTableProducts columns={columnsProducts} data={products} />
          </CardContent>
        </Card>
      </div>
    </NavbarDynamic>
  );
}
