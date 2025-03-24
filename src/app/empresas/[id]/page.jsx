import { notFound } from 'next/navigation';

import { getEmpresaRequestServer } from '@/app/empresas/[id]/_services/requests.js';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import DetailContent from '@/app/empresas/[id]/_components/detailContent';
import { formatDateLong } from '@/lib/formateador';

export default async function Page({ params }) {
  const { empresa } = await getEmpresaRequestServer(params.id);

  if (!empresa) {
    notFound();
  }

  const { nombre: empresaName, updatedAt } = empresa;

  const updatedAtFormated = formatDateLong(updatedAt);

  const navbarTitles = [
    {
      title: 'Empresas',
      href: '/empresas',
      active: true,
    },
    {
      title: empresaName,
      href: '/empresas',
      active: false,
    },
  ];

  return (
    <NavbarDynamic titles={navbarTitles}>
      <DetailContent empresaData={empresa} updatedAt={updatedAtFormated} />
    </NavbarDynamic>
  );
}
