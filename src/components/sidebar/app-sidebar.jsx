'use client';

import * as React from 'react';
import { AudioWaveform, GalleryVerticalEnd, User2Icon } from 'lucide-react';
import {
  RiBox3Line,
  RiDropboxFill,
  RiMotorbikeFill,
  RiMotorbikeLine,
  RiInstanceFill,
  RiGalleryView2,
  RiAppsLine,
  RiFundsBoxFill,
  RiArchiveLine,
  RiHome2Line,
  RiBuildingLine,
} from '@remixicon/react';

import { NavMain } from '@/components/sidebar/nav-main';
import { NavAdministracion } from '@/components/sidebar/nav-projects';
import { NavHome } from '@/components/sidebar/nav-home';
import { NavUser } from '@/components/sidebar/nav-user';
import { TeamSwitcher } from '@/components/sidebar/team-switcher';
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
      name: 'MotoRock Ruta 33',
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
    url: '/inicio',
  },
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
              icon: RiMotorbikeLine,
            },
          ],
          icon: RiMotorbikeFill,
        },
        {
          title: 'Productos',
          url: '/inventario/productos/todos',
          items: [
            {
              title: 'Todos',
              url: '/inventario/productos/todos',
              icon: RiDropboxFill,
            },
          ],
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
          title: 'Almacen',
          url: '/inventario/productos/todos',
          items: [],
          icon: RiArchiveLine,
        },
        {
          title: 'Movimientos',
          url: '/inventario/modelos',
          items: [],
          icon: RiFundsBoxFill,
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
            <TeamSwitcher teams={data.teams} />
          </SidebarHeader>

          <SidebarContent>
            <NavHome home={data.home} />
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
