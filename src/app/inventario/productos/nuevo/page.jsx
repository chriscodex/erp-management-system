import {
  getSegmentByDataRequest,
  getAllProveedoresRequest,
  getMarcasBySegmentDataRequest,
  getCategoriesBySegmentDataRequest,
  getAllAlmacenesRequest,
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

import { simplificadorParaClientComponent } from '@/lib/utils';

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
    categoriesResponse,
    marcasResponse,
    proveedoresResponse,
    almacenesResponse,
    segmentResponse,
    // eslint-disable-next-line no-undef
  ] = await Promise.all([
    getCategoriesBySegmentDataRequest({ segmentName: 'Productos' }),
    getMarcasBySegmentDataRequest({ segmentName: 'Productos' }),
    getAllProveedoresRequest(),
    getAllAlmacenesRequest(),
    getSegmentByDataRequest('Productos'),
  ]);

  const { categories } = categoriesResponse;
  const { marcas } = marcasResponse;
  const { proveedores } = proveedoresResponse;
  const { almacenes } = almacenesResponse;
  const { segment } = segmentResponse;

  const marcasSimplificadas = simplificadorParaClientComponent(marcas);
  const almacenesSimplificados = simplificadorParaClientComponent(almacenes);
  const proveedoresSimplificados =
    simplificadorParaClientComponent(proveedores);
  const segmentoSimplificado = simplificadorParaClientComponent(segment);
  const categoriesSimplificadas = simplificadorParaClientComponent(categories);

  return (
    <NavbarDynamic titles={navbarTitles}>
      <div className="container mx-auto p-6">
        <Card className="w-full max-w-7xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Agregar Producto</CardTitle>
            <CardDescription>
              Complete los detalles del nuevo producto a continuación.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormAddProduct
              segment={segmentoSimplificado}
              categories={categoriesSimplificadas}
              marcas={marcasSimplificadas}
              proveedores={proveedoresSimplificados}
              almacenes={almacenesSimplificados}
            />
          </CardContent>
        </Card>
      </div>
    </NavbarDynamic>
  );
}
