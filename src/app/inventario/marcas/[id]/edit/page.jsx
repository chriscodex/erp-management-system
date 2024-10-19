import { notFound } from 'next/navigation';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getMarca } from '@/app/inventario/marcas/[id]/_services/requests.js';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { UpdateFormMarca } from '@/app/inventario/marcas/[id]/edit/_components/updateFormMarca';

export default async function Page({ params }) {
  const { marca } = await getMarca(params.id);

  if (!marca) {
    notFound();
  }

  const {
    // _id: marcaId,
    nombre: marcaName,
  } = marca;

  const titles = [
    {
      title: 'Inventario',
      href: '/inventario/todos',
      active: false,
    },
    {
      title: 'Marcas',
      href: '/inventario/marcas',
      active: true,
    },
    {
      title: marcaName,
      href: `/inventario/marcas/${params.id}`,
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
      <div className="container mx-auto p-4">
        <Card className="w-full max-w-7xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Editar</CardTitle>
          </CardHeader>
          <CardContent>
            <UpdateFormMarca marcaData={marca} />
          </CardContent>
        </Card>
      </div>
    </NavbarDynamic>
  );
}
