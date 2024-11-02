import { notFound } from 'next/navigation';

import { getProductByIdRequest } from './_services/requests';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import DetailContent from '@/app/inventario/marcas/[id]/_components/detailContent';
import { formatDateLong } from '@/lib/formateador';

export default async function Page({ params }) {
  const { product } = await getProductByIdRequest(params.id);

  if (!product) {
    notFound();
  }

  const { nombre: productName, updatedAt } = product;

  const updatedAtFormated = formatDateLong(updatedAt);

  const titles = [
    {
      title: 'Inventario',
      href: '/inventario/todos',
      active: false,
    },
    {
      title: 'Productos',
      href: '/inventario/productos',
      active: true,
    },
    {
      title: productName,
      href: `/inventario/productos/${productName}`,
      active: false,
    },
  ];

  return (
    <NavbarDynamic titles={titles}>
      {/* <DetailContent marcaData={product} updatedAt={updatedAtFormated} /> */}
    </NavbarDynamic>
  );
}
