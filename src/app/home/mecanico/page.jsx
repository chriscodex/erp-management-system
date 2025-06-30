import { Bike, Package, Plus } from "lucide-react";
import { notFound } from "next/navigation";
import {
  RiHome2Line,
  RiGroup3Line,
  RiMotorbikeFill,
  RiFileCopy2Line,
} from "@remixicon/react";
import { NavbarSimple } from "@/components/navbar/NavbarSimple";
import { Label } from "@/components/ui/label";
import { StatHomeCard } from "@/app/home/_components/statCard";

import {
  getAllProductsRequestServer,
  getAllMotosRequestServer,
  getAllOrdenesDeServicioRequestServer,
} from "@/app/home/mecanico/_services/requests";

import { QuickAccessCard } from "@/app/home/_components/quickAccesCard";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.rol !== "Tecnico") {
    notFound();
  }
  const [
    productsResponse = {},
    motosResponse = {},
    ordenesDeServicioResponse,
    // eslint-disable-next-line no-undef
  ] = await Promise.all([
    getAllProductsRequestServer(),
    getAllMotosRequestServer(),
    getAllOrdenesDeServicioRequestServer(),
  ]);

  const { products } = productsResponse;
  const { motos } = motosResponse;
  const { ordenesDeServicio } = ordenesDeServicioResponse;

  let totalOrdenesDeServicio = 0,
    totalMotos = 0,
    totalProductsStock = 0;

  if (Array.isArray(ordenesDeServicio)) {
    totalOrdenesDeServicio = ordenesDeServicio?.length;
  }

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
              title="Ordenes de Servicio Pendientes"
              value={totalOrdenesDeServicio}
              icon={<RiFileCopy2Line />}
            />
          </div>
          <div className="space-y-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Accesos rápidos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <QuickAccessCard
                title="Registrar Orden de Servicio"
                description="Registra una orden de servicio"
                icon={<Plus className="h-6 w-6" />}
                linkText="Registrar Orden de Servicio"
                linkHref="/taller/ordenes-servicio/nuevo"
              />
              <QuickAccessCard
                title="Ordenes de Servicio"
                description="Gestiona las órdenes de servicio"
                icon={<RiFileCopy2Line className="h-6 w-6" />}
                linkText="Ver Órdenes de Servicio"
                linkHref="/taller/ordenes-servicio"
              />
              <QuickAccessCard
                title="Inventario de Motos"
                description="Revisa información sobre las motos"
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
                title="Historial de Órdenes de Servicio"
                description="Revisa el historial de las órdenes de servicio"
                icon={<RiFileCopy2Line className="h-6 w-6" />}
                linkText="Ver Historial de Órdenes de Servicio"
                linkHref="/taller/ordenes-servicio-historial"
              />
            </div>
          </div>
        </div>
      </NavbarSimple>
    </>
  );
}
