import { notFound } from 'next/navigation';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { getModeloByIdRequestServer } from '@/app/inventario/motos/modelos/[modeloId]/_services/requests';
import { UpdateFormModelo } from '@/app/inventario/motos/modelos/[modeloId]/edit/_components/updateFormModelo';

export const dynamic = 'force-dynamic';

export default async function Page({ params }) {
  const { modelo } = await getModeloByIdRequestServer(params.modeloId);

  console.log('modelo', modelo);

  if (!modelo) {
    notFound();
  }

  const { nombre: modeloName, _id: modeloId } = modelo;

  const titles = [
    {
      title: 'Inventario',
      href: '/inventario/todos',
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
      title: 'Editar',
      href: '',
      active: false,
    },
  ];

  return (
    <NavbarDynamic titles={titles}>
      <Card className="w-full max-w-7xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Editar</CardTitle>
        </CardHeader>
        <CardContent>
          <UpdateFormModelo modeloData={modelo} marcas={[]} categories={[]} />
        </CardContent>
      </Card>
    </NavbarDynamic>
  );
}
