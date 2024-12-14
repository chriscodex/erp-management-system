import {
  getSegmentByDataRequestServer,
  getAllProveedoresRequestServer,
  getMarcasBySegmentDataRequestServer,
  getCategoriesBySegmentDataRequestServer,
  getAllAlmacenesRequestServer,
} from '@/app/inventario/productos/nuevo/_services/requests';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { RiMotorbikeFill } from '@remixicon/react';
import { FormAddModel } from '@/app/inventario/motos/modelos/nuevo/_components/FormAddModel';

export default async function AddModeloMotoPage() {
  /* Secciones del navbar */
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
      title: 'Agregar Modelo',
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
    getCategoriesBySegmentDataRequestServer({
      segmentName: 'Productos',
      categoryEstado: 'activo',
    }),
    getMarcasBySegmentDataRequestServer({
      nombre: 'Productos',
      marcaEstado: 'activo',
    }),
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
          <CardTitle className="text-2xl flex items-center gap-2">
            <RiMotorbikeFill className="md:h-7 h-5 md:w-7 w-5" />
            Agregar Modelo
          </CardTitle>
          <CardDescription>
            Complete los detalles del nuevo modelo a continuación.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormAddModel
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
