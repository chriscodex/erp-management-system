import { notFound } from 'next/navigation';

import { getProductByIdRequest } from './_services/requests';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { formatDateLong } from '@/lib/formateador';
import { DataTableProduct } from '@/app/inventario/productos/[id]/_components/ProductTable/data-table';
import { columnsProduct } from '@/app/inventario/productos/[id]/_components/ProductTable/columns';
import { agregarNumeracionTable } from '@/lib/utils';
import ProductCard from '@/app/inventario/productos/[id]/_components/ProductCard/card';
import GraphicSingleProductCard from '@/app/inventario/productos/[id]/_components/ProductCard/graphic';

export default async function Page({ params }) {
  const { product, status } = await getProductByIdRequest(params.id);

  if (!product) {
    notFound();
  }

  const { nombre: productName, updatedAt, unidades } = product;

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

  const unidadesEnumeradas = agregarNumeracionTable(unidades);

  console.log(unidadesEnumeradas);

  const updatedAtFormated = formatDateLong(updatedAt);
  return (
    <NavbarDynamic titles={navbarTitles}>
      <div className="container mx-auto p-4">
        <Card>
          <CardHeader className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 pb-2">
            <ProductCard product={product} />
            <GraphicSingleProductCard />
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
