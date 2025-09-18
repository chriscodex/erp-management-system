import Link from 'next/link';
import { Plus } from 'lucide-react';
import { RiGalleryView2 } from '@remixicon/react';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { DataTableProducts } from '@/app/inventario/productos/_components/ProductsTable/data-table';
import { columnsProducts } from '@/app/inventario/productos/_components/ProductsTable/columns';
import { getAllProductsRequestServer } from '@/app/inventario/productos/_services/requests';
import { Label } from '@/components/ui/label';
import { sortByUpdateDateDesc } from '@/lib/utils';

export default async function ProductsPage() {
  // eslint-disable-next-line no-undef
  const results = await Promise.allSettled([
    getServerSession(authOptions),
    getAllProductsRequestServer(),
  ]);

  const session = results[0].value;
  const { products } = results[1].value;
  const productsSorted = sortByUpdateDateDesc(products);

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
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-2">
          <div className="flex items-center gap-2">
            <RiGalleryView2 className="md:h-9 h-5 md:w-9 w-5" />
            <Label className="sm:text-4xl text-xl font-bold">Productos</Label>
          </div>
          {session?.user?.rol === 'Administrador' && (
            <Button asChild>
              <Link href="/inventario/productos/nuevo">
                <Plus className="h-4 w-4" /> Agregar Producto
              </Link>
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <DataTableProducts columns={columnsProducts} data={productsSorted} />
        </CardContent>
      </Card>
    </NavbarDynamic>
  );
}
