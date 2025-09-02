import { Bike, Package } from 'lucide-react';
import { notFound } from 'next/navigation';
import {
  RiHome2Line,
  RiFolderHistoryLine,
  RiGroup3Line,
  RiMotorbikeFill,
  RiShoppingBag3Line,
  RiVipDiamondLine,
} from '@remixicon/react';
import { NavbarSimple } from '@/components/navbar/NavbarSimple';
import { Label } from '@/components/ui/label';
import { StatHomeCard } from '@/app/home/_components/statCard';

import {
  getAllProductsRequestServer,
  getAllMotosRequestServer,
  getAllPreventasRequestServer,
} from '@/app/home/vendedor/_services/requests';

import { QuickAccessCard } from '@/app/home/_components/quickAccesCard';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.rol !== 'Vendedor') {
    notFound();
  }

  // eslint-disable-next-line no-undef
  const results = await Promise.allSettled([
    getAllProductsRequestServer(),
    getAllMotosRequestServer(),
    getAllPreventasRequestServer(),
  ]);

  const { products } = results[0].value;
  const { motos } = results[1].value;
  const { preventas } = results[2].value;

  let totalPreventas = 0;

  if (Array.isArray(preventas)) {
    totalPreventas = preventas?.length;
  }

  let totalMotos = 0;
  let totalProductsStock = 0;

  if (Array.isArray(motos)) {
    totalMotos = motos?.length;
  }

  if (products) {
    totalProductsStock = products?.reduce((acc, product) => {
      return acc + product?.stock;
    }, 0);
  }

  return (
    <>
      <NavbarSimple title="Inicio">
        <div className="container mx-auto p-4">
          <div className="flex items-center gap-2 my-4">
            <RiHome2Line className="h-9 w-9" />
            <Label className="sm:text-4xl text-xl font-bold">Inicio</Label>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-8">
            <StatHomeCard title="Motos" value={totalMotos} icon={<Bike />} />
            <StatHomeCard
              title="Productos en Stock"
              value={totalProductsStock}
              icon={<Package />}
            />
            <StatHomeCard
              title="Preventas Pendientes"
              value={totalPreventas}
              icon={<RiShoppingBag3Line />}
            />
          </div>
          <div className="space-y-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Accesos rápidos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <QuickAccessCard
                title="Realizar una preventa"
                description="Realiza una preventa"
                icon={<RiShoppingBag3Line className="h-6 w-6" />}
                linkText="Registrar Preventa"
                linkHref="/ventas/preventas/registrar"
              />
              <QuickAccessCard
                title="Ventas"
                description="Revisa las ventas"
                icon={<RiVipDiamondLine className="h-6 w-6" />}
                linkText="Ver Ventas"
                linkHref="/ventas"
              />
              <QuickAccessCard
                title="Inventario de Motos"
                description="Revisa el inventario de motos"
                icon={<RiMotorbikeFill className="h-6 w-6" />}
                linkText="Ver Inventario"
                linkHref="/inventario/motos/todas"
              />
              <QuickAccessCard
                title="Inventario de Productos"
                description="Revisa el inventario de productos"
                icon={<Package className="h-6 w-6" />}
                linkText="Ver Productos"
                linkHref="/inventario/productos"
              />
              <QuickAccessCard
                title="Clientes"
                description="Revisa información sobre los clientes"
                icon={<RiGroup3Line className="h-6 w-6" />}
                linkText="Ver Clientes"
                linkHref="/contactos/clientes"
              />
              <QuickAccessCard
                title="Historial de Ventas"
                description="Revisa el historial de las ventas"
                icon={<RiFolderHistoryLine className="h-6 w-6" />}
                linkText="Ver Historial de Ventas"
                linkHref="/ventas/ventas-historicas"
              />
            </div>
          </div>
        </div>
      </NavbarSimple>
    </>
  );
}
