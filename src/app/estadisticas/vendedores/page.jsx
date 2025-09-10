import { notFound } from 'next/navigation';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import LeaderboardSalesBarChart from '@/app/estadisticas/_components/LeaderboardSalesBarChart';
import { getAllVentasHistoricasRequestServer } from '@/app/estadisticas/_services/requests';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
export default async function Page({}) {
  const session = await getServerSession(authOptions);

  if (session?.user?.rol !== 'Administrador') {
    notFound();
  }

  //Data para vendedores y productos mas vendidos
  const dataVentasHistoricas = await getAllVentasHistoricasRequestServer();

  const navbarTitles = [
    {
      title: 'Estadísticas',
      href: '/estadisticas',
      active: true,
    },
    {
      title: 'Vendedores',
      href: '/estadisticas/vendedores',
      active: true,
    },
  ];

  return (
    <NavbarDynamic titles={navbarTitles}>
      <LeaderboardSalesBarChart dataVendedores={dataVentasHistoricas} />
    </NavbarDynamic>
  );
}
