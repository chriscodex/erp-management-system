import { Bike, DollarSign, Package } from 'lucide-react';
import {
  RiBox2Fill,
  RiCalendarScheduleLine,
  RiHome2Line,
} from '@remixicon/react';
import { notFound } from 'next/navigation';
import { NavbarSimple } from '@/components/navbar/NavbarSimple';
import { Notifications } from '@/app/home/_components/notifications';
import { Label } from '@/components/ui/label';
import { StatHomeCard } from '@/app/home/_components/statCard';
import { Card, CardContent } from '@/components/ui/card';
import {
  getAllMotosForHomeRequestServer,
  getAllProductsForHomeRequestServer,
} from '@/app/home/_services/requests';

import {
  getAllProductsRequestServer,
  getAllMotosRequestServer,
  getAllReservacionesRequestServer,
  getAllPedidosRequestServer,
  getAllGastosGeneralesRequestServer,
  getAllVentasHistoricasRequestServer,
} from '@/app/home/administrador/_services/requests';

import IncomeExpenseBarChart from '@/app/home/administrador/_components/IncomeExpenseBarChart';
import VentasTotalesBarChart from '@/app/home/administrador/_components/VentasTotalesBarChart';
import QuickAccessCollapsible from '@/app/home/administrador/_components/QuickAccessCollapsible';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.rol !== 'Administrador') {
    notFound();
  }

  const [
    productsResponse = {},
    motosResponse = {},
    dataProductos,
    dataMotos,
    dataReservaciones,
    dataPedidos,
    dataGastosGenerales,
    dataVentasHistoricas,
    // eslint-disable-next-line no-undef
  ] = await Promise.all([
    getAllProductsForHomeRequestServer(),
    getAllMotosForHomeRequestServer(),
    getAllProductsRequestServer(),
    getAllMotosRequestServer(),
    getAllReservacionesRequestServer(),
    getAllPedidosRequestServer(),
    getAllGastosGeneralesRequestServer(),
    getAllVentasHistoricasRequestServer(),
  ]);

  const { products } = productsResponse;
  const { motos } = motosResponse;

  const { reservaciones } = dataReservaciones;
  const { pedidos } = dataPedidos;

  let totalReservaciones = 0,
    totalPedidos = 0;

  if (Array.isArray(reservaciones)) {
    totalReservaciones = reservaciones?.length;
  }
  if (Array.isArray(pedidos)) {
    totalPedidos = pedidos?.length;
  }

  let totalMotos = 0;
  let totalValorInventarioMotos = 0;

  if (Array.isArray(motos)) {
    totalMotos = motos?.length;
    totalValorInventarioMotos = motos?.reduce((acc, motos) => {
      return acc + motos?.precioCompra;
    }, 0);
  }

  let totalProductsStock = 0;
  let totalValorInventarioProducts = 0;

  let totalValorInventario = 0;
  if (products) {
    totalProductsStock = products?.reduce((acc, product) => {
      return acc + product?.stock;
    }, 0);
    totalValorInventarioProducts = products?.reduce((acc, product) => {
      return acc + product?.stock * product?.precioCompra;
    }, 0);
  }

  totalValorInventario =
    totalValorInventarioProducts + totalValorInventarioMotos;

  return (
    <>
      <NavbarSimple title="Inicio">
        <div className="container mx-auto p-4">
          <div className="flex items-center gap-2 my-4">
            <RiHome2Line className="h-9 w-9" />
            <Label className="sm:text-4xl text-xl font-bold">Inicio</Label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 mb-8">
            <StatHomeCard title="Motos" value={totalMotos} icon={<Bike />} />
            <StatHomeCard
              title="Productos en Stock"
              value={totalProductsStock}
              icon={<Package />}
            />
            <StatHomeCard
              title="Reservaciones"
              value={totalReservaciones}
              icon={<RiCalendarScheduleLine />}
            />
            <StatHomeCard
              title="Pedidos Pendientes"
              value={totalPedidos}
              icon={<RiBox2Fill />}
            />
            <Card className="col-span-1 md:col-span-2 bg-primary/80">
              <CardContent className="h-full flex items-center p-6">
                <div className="p-3 bg-primary/10 rounded-full mr-4 text-white/90 dark:text-black/80">
                  <DollarSign />
                </div>
                <div>
                  <p className="text-sm font-medium text-white/90 dark:text-black/80">
                    Valor de Inventario
                  </p>
                  <h3 className="text-2xl font-bold text-white/80 dark:text-black/80">
                    S/. {parseFloat(totalValorInventario).toFixed(2)}
                  </h3>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Análisis y Estadísticas
            </h2>
            <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">
              <IncomeExpenseBarChart
                dataProductos={dataProductos}
                dataMotos={dataMotos}
                dataGastosGenerales={dataGastosGenerales}
                dataVentasHistoricas={dataVentasHistoricas}
              />
              <VentasTotalesBarChart
                dataVentasHistoricas={dataVentasHistoricas}
              />
            </div>
          </div>
          <QuickAccessCollapsible />
        </div>
      </NavbarSimple>
      <div className="mt-3 mr-4 xl:hidden">
        <Notifications />
      </div>
      <div className="hidden xl:block h-screen w-full max-w-sm bg-white border-l border-b z-40 overflow-y-auto dark:bg-black">
        <Notifications />
      </div>
    </>
  );
}
