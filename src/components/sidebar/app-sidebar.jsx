'use client';

import * as React from 'react';
import { AudioWaveform, GalleryVerticalEnd, User2Icon } from 'lucide-react';
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
} from '@remixicon/react';

import { NavMain } from '@/components/sidebar/nav-main';
import { NavAdministracion } from '@/components/sidebar/nav-projects';
import { NavHome } from '@/components/sidebar/nav-home';
import { NavUser } from '@/components/sidebar/nav-user';
import { NavVentas } from '@/components/sidebar/nav-ventas';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';

import { usePathname } from 'next/navigation';

// This is sample data.
const data = {
  user: {
    name: 'Josué Rubina',
    email: 'Administrador',
    avatar: '/avatars/avatar-default.jpg',
  },
  teams: [
    {
      name: 'Moto Rock Ruta 33',
      logo: GalleryVerticalEnd,
    },
    {
      name: 'MotoRock Store',
      logo: AudioWaveform,
    },
  ],
  home: {
    name: 'Inicio',
    icon: RiHome2Line,
    url: '/',
  },
  navVentas: [
    {
      title: 'Ventas',
      url: '#',
      icon: RiShoppingCartLine,
      items: [
        {
          title: 'Pre-ventas',
          url: '/ventas/productos/',
          icon: RiGalleryView2,
        },
        {
          title: 'Registrar Pre-venta',
          url: '/ventas/motos',
          icon: RiMotorbikeFill,
        },
      ],
    },
  ],
  navMain: [
    {
      title: 'Inventario',
      url: '#',
      icon: RiBox3Line,
      items: [
        {
          title: 'Motos',
          url: '/inventario/modelos',
          items: [
            {
              title: 'Modelos',
              url: '/inventario/motos/modelos',
              icon: RiMotorbikeFill,
            },
            {
              title: 'Todas',
              url: '/inventario/motos/todas',
              icon: RiRidingLine,
            },
          ],
          icon: RiMotorbikeLine,
        },
        {
          title: 'Productos',
          url: '/inventario/productos/',
          icon: RiGalleryView2,
        },
        {
          title: 'Marcas',
          url: '/inventario/marcas',
          items: [],
          icon: RiInstanceFill,
        },
        {
          title: 'Categorías',
          url: '/inventario/categorias',
          items: [],
          icon: RiAppsLine,
        },
        {
          title: 'Almacenes',
          url: '/inventario/almacenes',
          items: [],
          icon: RiArchiveLine,
        },
      ],
    },
    {
      title: 'Contactos',
      url: '#',
      icon: RiGroupFill,
      items: [
        // {
        //   title: 'Clientes',
        //   url: '/ventas/motos',
        //   icon: RiContactsFill,
        // },
        {
          title: 'Proveedores',
          url: '/contactos/proveedores/',
          icon: RiTeamFill,
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Usuarios',
      url: '/usuarios',
      icon: User2Icon,
    },
    {
      name: 'Empresas',
      url: '/empresas',
      icon: RiBuildingLine,
    },
  ],
};

export function AppSidebar({ ...props }) {
  const pathname = usePathname();

  const isLoginPage = pathname === '/login';

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
            <NavHome home={data.home} />
            {/* <NavVentas navTitle={'Ventas'} items={data.navVentas} /> */}
            <NavMain navTitle={'Plataforma'} items={data.navMain} />
            <NavAdministracion projects={data.projects} />
          </SidebarContent>

          <SidebarFooter>
            <NavUser />
          </SidebarFooter>
        </Sidebar>
      )}
    </>
  );
}
