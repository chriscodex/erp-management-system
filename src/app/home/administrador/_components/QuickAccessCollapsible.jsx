"use client";

import {
  Package,
  User2Icon,
  ChevronDown,
} from "lucide-react";
import {
  RiBox2Fill,
  RiCalendarScheduleLine,
  RiFileCopy2Line,
  RiFolderHistoryLine,
  RiGroup3Line,
  RiMotorbikeFill,
  RiShoppingBag3Line,
  RiTeamFill,
  RiVipDiamondLine,
} from "@remixicon/react";

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

import { QuickAccessCard } from "@/app/home/_components/quickAccesCard";

import { useState } from "react";

export default function QuickAccessCollapsible() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Accesos rápidos</h2>
      <Collapsible open={open} onOpenChange={setOpen}>
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
            description="Gestiona las ventas"
            icon={<RiVipDiamondLine className="h-6 w-6" />}
            linkText="Ver Ventas"
            linkHref="/ventas"
          />
          <QuickAccessCard
            title="Órdenes de servicio"
            description="Gestiona las órdenes de servicio"
            icon={<RiFileCopy2Line className="h-6 w-6" />}
            linkText="Ver Órdenes de Servicio"
            linkHref="/taller/ordenes-servicio"
          />
          <QuickAccessCard
            title="Inventario de Motos"
            description="Gestiona el inventario de motos"
            icon={<RiMotorbikeFill className="h-6 w-6" />}
            linkText="Ver Inventario"
            linkHref="/inventario/motos/todas"
          />
          <QuickAccessCard
            title="Inventario de Productos"
            description="Gestiona el inventario de productos"
            icon={<Package className="h-6 w-6" />}
            linkText="Ver Productos"
            linkHref="/inventario/productos"
          />
          <QuickAccessCard
            title="Clientes"
            description="Administra los clientes"
            icon={<RiGroup3Line className="h-6 w-6" />}
            linkText="Ver Clientes"
            linkHref="/contactos/clientes"
          />
        </div>
        {/* Tarjetas colapsables */}
        <CollapsibleContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <QuickAccessCard
              title="Historial de Ventas"
              description="Revisa el historial de las ventas"
              icon={<RiFolderHistoryLine className="h-6 w-6" />}
              linkText="Ver Historial de Ventas"
              linkHref="/ventas/ventas-historicas"
            />
            <QuickAccessCard
              title="Historial de Órdenes de servicio"
              description="Revisa el historial de las órdenes de servicio"
              icon={<RiFileCopy2Line className="h-6 w-6" />}
              linkText="Ver Historial de Órdenes de Servicio"
              linkHref="/taller/ordenes-servicio-historial"
            />
            <QuickAccessCard
              title="Pedidos"
              description="Gestiona los pedidos"
              icon={<RiBox2Fill className="h-6 w-6" />}
              linkText="Ver Pedidos"
              linkHref="/inventario/motos/pedidos"
            />
            <QuickAccessCard
              title="Reservaciones"
              description="Gestiona las reservaciones"
              icon={<RiCalendarScheduleLine className="h-6 w-6" />}
              linkText="Ver Reservaciones"
              linkHref="/inventario/motos/reservaciones"
            />
            <QuickAccessCard
              title="Proveedores"
              description="Administra los proveedores"
              icon={<RiTeamFill className="h-6 w-6" />}
              linkText="Ver Proveedores"
              linkHref="/contactos/proveedores"
            />
            <QuickAccessCard
              title="Usuarios"
              description="Administra los usuarios"
              icon={<User2Icon className="h-6 w-6" />}
              linkText="Ver Usuarios"
              linkHref="/usuarios"
            />
          </div>
        </CollapsibleContent>
        {/* Botón de colapsado */}
        <CollapsibleTrigger className="mt-4 flex items-center gap-1 text-primary hover:underline text-sm">
          <span>{open ? "Ver menos" : "Ver más"}</span>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </CollapsibleTrigger>
      </Collapsible>
    </div>
  );
}
