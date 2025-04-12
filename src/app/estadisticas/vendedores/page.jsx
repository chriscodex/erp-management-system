

import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import LeaderboardSalesBarChart  from "@/app/estadisticas/_components/LeaderboardSalesBarChart";
import { getAllVentasHistoricasRequestServer } from "@/app/estadisticas/_services/requests";

export default async function Page({ }) {

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
      <LeaderboardSalesBarChart dataVendedores={dataVentasHistoricas}/>
    </NavbarDynamic>
  );
}