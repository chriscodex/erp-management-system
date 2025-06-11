import { notFound } from 'next/navigation';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import {
  getCategoriesBySegmentDataForModelosRequestServer,
  getMarcasBySegmentDataForModelosRequestServer,
} from '@/app/inventario/motos/modelos/_services/requests';
import { getProductByIdRequestServer } from '@/app/inventario/productos/[id]/_services/requests';
import { UpdateFormProduct } from '@/app/inventario/productos/[id]/edit/_components/updateFormProduct';
import {
  getAllAlmacenesByDataForProductsRequestServer,
  getAllProveedoresByDataForProductsRequestServer,
} from '@/app/inventario/productos/_services/requests';
import { sortByUpdateDateAsc } from '@/lib/utils';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const dynamic = 'force-dynamic';

export default async function Page({ params }) {
  const session = await getServerSession(authOptions);
  const { product } = await getProductByIdRequestServer(params.id);

  if (!product || session?.user?.rol !== "Administrador") {
    notFound();
  }

  const { nombre: productName } = product;

  const [
    categoriesProductResponse,
    marcasProductResponse,
    proveedoresResponse,
    almacenesResponse,
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
    getAllProveedoresByDataForProductsRequestServer({ estado: 'activo' }),
    getAllAlmacenesByDataForProductsRequestServer({ estado: 'activo' }),
  ]);

  const { categories } = categoriesProductResponse;
  const { marcas } = marcasProductResponse;
  const { proveedores } = proveedoresResponse;
  const { almacenes } = almacenesResponse;

  const almacenesOrderedByCreation = sortByUpdateDateAsc(almacenes);

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
            proveedores={proveedores}
            almacenes={almacenesOrderedByCreation}
          />
        </CardContent>
      </Card>
    </NavbarDynamic>
  );
}
