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
import { getAllModelosForUpdateMotoFormRequestServer } from '@/app/inventario/motos/modelos/[modeloId]/unidades/[unidadId]/edit/_services/requests';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function Page({ params }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.rol !== 'Administrador') {
    notFound();
  }
  // eslint-disable-next-line no-undef
  const results = await Promise.allSettled([
    getServerSession(authOptions),
    getMotoByIdRequestServer(params?.unidadId),
    getAllModelosForUpdateMotoFormRequestServer(),
    getAllProveedoresByDataForProductsRequestServer({ estado: 'activo' }),
    getAllAlmacenesByDataForProductsRequestServer({ estado: 'activo' }),
  ]);
  const { moto } = results[1].value;
  const { modelos } = results[2].value ?? [];
  const { proveedores } = results[3].value ?? [];
  const { almacenes } = results[4].value ?? [];

  const { nombre, modeloId: modeloData } = moto;
  const almacenesOrderedByCreation = sortByUpdateDateAsc(almacenes);

  if (!moto) {
    notFound();
  }

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
            modelos={modelos}
            proveedores={proveedores}
            almacenes={almacenesOrderedByCreation}
          />
        </CardContent>
      </Card>
    </NavbarDynamic>
  );
}
