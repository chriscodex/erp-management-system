import {
  getSegmentByDataRequestServer,
  getAllProveedoresRequestServer,
  getMarcasBySegmentDataRequestServer,
  getCategoriesBySegmentDataRequestServer,
  getAllAlmacenesRequestServer,
} from '@/app/inventario/productos/nuevo/_services/requests';
import { FormAddProduct } from '@/app/inventario/productos/nuevo/_components/FormAddProduct';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';

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
      title: 'Nuevo Producto',
      href: '',
      active: false,
    },
  ];

  const [
    categoriesProductResponse,
    marcasProductResponse,
    proveedoresResponse,
    almacenesResponse,
    segmentResponse,
    // eslint-disable-next-line no-undef
  ] = await Promise.all([
    getCategoriesBySegmentDataRequestServer({ segmentName: 'Productos' }),
    getMarcasBySegmentDataRequestServer({ segmentName: 'Productos' }),
    getAllProveedoresRequestServer(),
    getAllAlmacenesRequestServer(),
    getSegmentByDataRequestServer('Productos'),
  ]);

  const { categories } = categoriesProductResponse;
  const { marcas } = marcasProductResponse;
  const { proveedores } = proveedoresResponse;
  const { almacenes } = almacenesResponse;
  const { segment } = segmentResponse;

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
            segment={segment}
            categories={categories}
            marcas={marcas}
            proveedores={proveedores}
            almacenes={almacenes}
          />
        </CardContent>
      </Card>
    </NavbarDynamic>
  );
}
