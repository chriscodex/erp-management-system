"use client";

import * as React from "react";
import { User2Icon } from "lucide-react";
import {
  RiBox3Line,
  RiShoppingCartLine,
  RiMotorbikeFill,
  RiMotorbikeLine,
  RiInstanceFill,
  RiGalleryView2,
  RiAppsLine,
  RiArchiveLine,
  RiHome2Line,
  RiBuildingLine,
  RiGroupFill,
  RiTeamFill,
  RiRidingLine,
  RiShoppingBag3Line,
  RiVipDiamondLine,
  RiBarChartLine,
  RiWallet2Fill,
  RiBox2Fill,
  RiFolderHistoryLine,
  RiGroup3Line,
  RiToolsFill,
  RiFileCopy2Line,
  RiFileCopy2Fill,
} from "@remixicon/react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavAdministracion } from "@/components/sidebar/nav-projects";
import { NavHome } from "@/components/sidebar/nav-home";
import { NavUser } from "@/components/sidebar/nav-user";
import { NavVentas } from "@/components/sidebar/nav-ventas";
import { NavTaller } from "@/components/sidebar/nav-taller";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { RiCalendarScheduleLine } from "@remixicon/react";

// This is sample data.
const adminData = {
  home: {
    name: "Inicio",
    icon: RiHome2Line,
    url: "/",
  },
  navVentas: [
    {
      title: "Ventas",
      url: "#",
      icon: RiShoppingCartLine,
      items: [
        {
          title: "Pre-Ventas",
          url: "/ventas/preventas/",
          icon: RiShoppingBag3Line,
        },
        {
          title: "Ventas",
          url: "/ventas/",
          icon: RiVipDiamondLine,
        },
        {
          title: "Historial de Ventas",
          url: "/ventas/ventas-historicas/",
          icon: RiFolderHistoryLine,
        },
      ],
    },
  ],
  navPlataforma: [
    {
      title: "Inventario",
      url: "#",
      icon: RiBox3Line,
      items: [
        {
          title: "Motos",
          url: "/inventario/modelos",
          items: [
            {
              title: "Modelos",
              url: "/inventario/motos/modelos",
              icon: RiMotorbikeFill,
            },
            {
              title: "Todas",
              url: "/inventario/motos/todas",
              icon: RiRidingLine,
            },
            {
              title: "Reservaciones",
              url: "/inventario/motos/reservaciones",
              icon: RiCalendarScheduleLine,
            },
            {
              title: "Pedidos",
              url: "/inventario/motos/pedidos",
              icon: RiBox2Fill,
            },
          ],
          icon: RiMotorbikeLine,
        },
        {
          title: "Productos",
          url: "/inventario/productos/",
          icon: RiGalleryView2,
        },
        {
          title: "Marcas",
          url: "/inventario/marcas",
          items: [],
          icon: RiInstanceFill,
        },
        {
          title: "Categorías",
          url: "/inventario/categorias",
          items: [],
          icon: RiAppsLine,
        },
        {
          title: "Almacenes",
          url: "/inventario/almacenes",
          items: [],
          icon: RiArchiveLine,
        },
      ],
    },
    {
      title: "Contactos",
      url: "#",
      icon: RiGroupFill,
      items: [
        {
          title: "Clientes",
          url: "/contactos/clientes/",
          icon: RiGroup3Line,
        },
        {
          title: "Proveedores",
          url: "/contactos/proveedores/",
          icon: RiTeamFill,
        },
      ],
    },
  ],
  navTaller: [
    {
      title: "Taller",
      url: "#",
      icon: RiToolsFill,
      items: [
        {
          title: "Órdenes de Servicio",
          url: "/taller/ordenes-servicio/",
          icon: RiFileCopy2Line,
        },
        {
          title: "Historial de Órdenes de Servicio",
          url: "/taller/ordenes-servicio-historial",
          icon: RiFileCopy2Fill,
        },
      ],
    },
  ],
  navAdministracion: [
    {
      name: "Estadísticas",
      url: "/estadisticas",
      icon: RiBarChartLine,
    },
    {
      name: "Gastos generales",
      url: "/gastos-generales",
      icon: RiWallet2Fill,
    },
    {
      name: "Usuarios",
      url: "/usuarios",
      icon: User2Icon,
    },
    {
      name: "Empresas",
      url: "/empresas",
      icon: RiBuildingLine,
    },
  ],
};

export function AppSidebar({ ...props }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const isLoginPage = pathname === "/login";

  return (
    <>
      {!isLoginPage && (
        <Sidebar collapsible="icon" {...props}>
          <SidebarHeader>
            <img
              src="/logoB.jpeg"
              alt="logo"
              className="w-full rounded-xl object-contain"
            />
            {/* <TeamSwitcher teams={data.teams} /> */}
          </SidebarHeader>

          <SidebarContent>
            {/* Sección Home */}
            {session?.user?.rol === "Administrador" && (
              <NavHome home={adminData.home} />
            )}

            {/* Sección de Ventas*/}

            {(session?.user?.rol === "Administrador" ||
              session?.user?.rol === "Vendedor") && (
              <NavVentas navTitle={"Ventas"} items={adminData.navVentas} />
            )}

            {/* Sección de Plataforma*/}

            <NavMain navTitle={"Plataforma"} items={adminData.navPlataforma} />

            {/* Solo para Administrador */}

            {(session?.user?.rol === "Administrador" ||
              session?.user?.rol === "Tecnico") && (
              <NavTaller navTitle={"Taller"} items={adminData.navTaller} />
            )}

            {session?.user?.rol === "Administrador" && (
              <NavAdministracion projects={adminData.navAdministracion} />
            )}
            
          </SidebarContent>

          <SidebarFooter>
            <NavUser />
          </SidebarFooter>
        </Sidebar>
      )}
    </>
  );
}
