import { notFound } from 'next/navigation';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import {
  getAllAlmacenesByDataForProductsRequestServer,
  getAllProveedoresByDataForProductsRequestServer,
} from '@/app/inventario/productos/_services/requests';
import { sortByUpdateDateAsc } from '@/lib/utils';
import { getMotoByIdRequestServer } from '@/app/inventario/motos/modelos/[modeloId]/unidades/[unidadId]/_services/requests';
import { UpdateMotoForm } from '@/app/inventario/motos/modelos/[modeloId]/unidades/[unidadId]/edit/_components/updateMotoForm';

export default async function Page({ params }) {
  const { moto } = await getMotoByIdRequestServer(params?.unidadId);

  console.log(moto);

  if (!moto) {
    notFound();
  }

  const {
    nombre,
    modeloId: modeloData,
  } = moto;

  const [
    proveedoresResponse,
    almacenesResponse,
    // eslint-disable-next-line no-undef
  ] = await Promise.all([
    getAllProveedoresByDataForProductsRequestServer({ estado: 'activo' }),
    getAllAlmacenesByDataForProductsRequestServer({ estado: 'activo' }),
  ]);

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
      title: modeloData?.nombre,
      href: `/inventario/motos/modelos/${modeloData?._id}`,
      active: true,
    },
    {
      title: `Moto ${nombre}`,
      href: `/inventario/motos/modelos/${modeloData?._id}/unidades/${moto?._id}`,
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
          <UpdateMotoForm
            motoData={moto}
            proveedores={proveedores}
            almacenes={almacenesOrderedByCreation}
          />
        </CardContent>
      </Card>
    </NavbarDynamic>
  );
}
