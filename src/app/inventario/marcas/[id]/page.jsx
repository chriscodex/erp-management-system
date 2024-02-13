import { notFound } from 'next/navigation';

import { getMarcaRequest } from '@/app/inventario/marcas/[id]/_services/requests.js';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import DetailContent from '@/app/inventario/marcas/[id]/_components/detailContent';
import { formatDateLong } from '@/lib/formateador';
import { simplificadorParaClientComponent } from '@/lib/utils';

export default async function Page({ params }) {
  const { marca } = await getMarcaRequest(params.id);

  if (!marca) {
    notFound();
  }

  const marcaSimplified = simplificadorParaClientComponent(marca);

  const { nombre: marcaName, updatedAt } = marcaSimplified;

  const updatedAtFormated = formatDateLong(updatedAt);

  const navbarTitles = [
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
      href: '/inventario/marcas',
      active: false,
    },
  ];

  return (
    <NavbarDynamic titles={navbarTitles}>
      <DetailContent
        marcaData={marcaSimplified}
        updatedAt={updatedAtFormated}
      />
    </NavbarDynamic>
  );
}
