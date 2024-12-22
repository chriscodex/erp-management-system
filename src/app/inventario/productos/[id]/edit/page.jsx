import { notFound } from 'next/navigation';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import {
  getCategoriesBySegmentDataForModelosRequestServer,
  getMarcasBySegmentDataForModelosRequestServer,
} from '@/app/inventario/motos/modelos/_services/requests';
import { getProductByIdRequestServer } from '@/app/inventario/productos/[id]/_services/requests';
import { UpdateFormProduct } from '@/app/inventario/productos/[id]/edit/_components/updateFormProduct';

export const dynamic = 'force-dynamic';

export default async function Page({ params }) {
  const { product } = await getProductByIdRequestServer(params.id);

  if (!product) {
    notFound();
  }

  const { nombre: productName } = product;

  const [
    categoriesProductResponse,
    marcasProductResponse,
    // eslint-disable-next-line no-undef
  ] = await Promise.all([
    getCategoriesBySegmentDataForModelosRequestServer({
      segmentName: 'Productos',
      categoryEstado: 'activo',
    }),
    getMarcasBySegmentDataForModelosRequestServer({
      nombre: 'Productos',
      marcaEstado: 'activo',
    }),
  ]);

  const { categories } = categoriesProductResponse;
  const { marcas } = marcasProductResponse;

  const navbarTitles = [
    {
      title: 'Inventario',
      href: '',
      active: false,
    },
    {
      title: 'Productos',
      href: '/inventario/productos',
      active: true,
    },
    {
      title: productName,
      href: `/inventario/productos/${product?._id}`,
      active: true,
    },
    {
      title: 'Editar',
      href: '',
      active: false,
    },
  ];

  return (
    <NavbarDynamic titles={navbarTitles}>
      <Card className="w-full max-w-7xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Editar</CardTitle>
        </CardHeader>
        <CardContent>
          <UpdateFormProduct
            productData={product}
            marcas={marcas}
            categories={categories}
          />
        </CardContent>
      </Card>
    </NavbarDynamic>
  );
}
