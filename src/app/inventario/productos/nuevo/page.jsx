import { FormAddProduct } from '@/app/inventario/productos/nuevo/_components/FormAddProduct';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { sortByUpdateDateAsc } from '@/lib/utils';
import { getAllAlmacenesByDataForProductsRequestServer, getAllProveedoresByDataForProductsRequestServer, getCategoriesBySegmentDataForProductsRequestServer, getMarcasBySegmentDataForProductsRequestServer } from '@/app/inventario/productos/_services/requests';

export default async function AddProductPage() {
  /* Secciones del navbar */
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
      title: 'Agregar Producto',
      href: '',
      active: false,
    },
  ];

  const [
    categoriesProductResponse,
    marcasProductResponse,
    proveedoresResponse,
    almacenesResponse,
    // eslint-disable-next-line no-undef
  ] = await Promise.all([
    getCategoriesBySegmentDataForProductsRequestServer({
      segmentName: 'Productos',
      categoryEstado: 'activo',
    }),
    getMarcasBySegmentDataForProductsRequestServer({
      nombre: 'Productos',
      marcaEstado: 'activo',
    }),
    getAllProveedoresByDataForProductsRequestServer({ estado: 'activo' }),
    getAllAlmacenesByDataForProductsRequestServer({ estado: 'activo' })
  ]);

  const { categories = [] } = categoriesProductResponse || {};
  const { marcas = [] } = marcasProductResponse || {};
  const { proveedores = [] } = proveedoresResponse || {};
  const { almacenes = [] } = almacenesResponse || {};

  const almacenesOrderedByCreation = sortByUpdateDateAsc(almacenes);

  return (
    <NavbarDynamic titles={navbarTitles}>
      <Card className="w-full max-w-7xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Agregar Producto</CardTitle>
          <CardDescription>
            Complete los detalles del nuevo producto a continuación.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormAddProduct
            categories={categories}
            marcas={marcas}
            proveedores={proveedores}
            almacenes={almacenesOrderedByCreation}
          />
        </CardContent>
      </Card>
    </NavbarDynamic>
  );
}
