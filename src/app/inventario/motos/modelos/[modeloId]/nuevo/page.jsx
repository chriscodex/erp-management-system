import { notFound } from 'next/navigation';

import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { getModeloByIdRequestServer } from '@/app/inventario/motos/modelos/[modeloId]/_services/requests';
import { RiMotorbikeFill } from '@remixicon/react';
import { Label } from '@/components/ui/label';
import { ModeloDataCard } from '@/app/inventario/motos/modelos/[modeloId]/nuevo/_components/modeloDataCard/modeloDataCard';
import { FormAddUnidadMoto } from '@/app/inventario/motos/modelos/[modeloId]/nuevo/_components/formAddUnidadMoto';
import { sortByUpdateDateAsc } from '@/lib/utils';
import {
  getAllAlmacenesByDataForMotosRequestServer,
  getAllProveedoresByDataForMotosRequestServer,
} from '@/app/inventario/motos/modelos/[modeloId]/nuevo/_services/requests';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function Page({ params }) {
  const session = await getServerSession(authOptions);

  if (session?.user?.rol !== 'Administrador') {
    notFound();
  }
  // eslint-disable-next-line no-undef
  const results = await Promise.allSettled([
    getModeloByIdRequestServer(params.modeloId),
    getAllProveedoresByDataForMotosRequestServer({ estado: 'activo' }),
    getAllAlmacenesByDataForMotosRequestServer({ estado: 'activo' }),
  ]);
  const { modelo } = results[0].value;
  const proveedores = results[1].value.proveedores ?? [];
  const almacenes = results[2].value.almacenes ?? [];

  const { nombre: modeloName, _id: modeloId } = modelo;
  const almacenesOrderedByCreation = sortByUpdateDateAsc(almacenes);

  if (!modelo) {
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
      title: modeloName,
      href: `/inventario/motos/modelos/${modeloId}`,
      active: true,
    },
    {
      title: 'Agregar Unidad',
      href: '',
      active: false,
    },
  ];

  return (
    <NavbarDynamic titles={navbarTitles}>
      <Card>
        <CardHeader className="w-full grid grid-cols-1 gap-4 pb-2">
          <div className="flex flex-col justify-between items-start gap-2">
            <div className="flex items-center gap-2">
              <RiMotorbikeFill className="md:h-6 h-5 md:w-6 w-5" />
              <Label className="text-2xl font-bold">Agregar Moto</Label>
            </div>
            <CardDescription>
              Complete los detalles de la nueva moto a continuación.
            </CardDescription>
          </div>
          <ModeloDataCard modelo={modelo} />
        </CardHeader>
        <CardContent>
          <FormAddUnidadMoto
            proveedores={proveedores}
            almacenes={almacenesOrderedByCreation}
            modeloId={modeloId}
          />
        </CardContent>
      </Card>
    </NavbarDynamic>
  );
}
