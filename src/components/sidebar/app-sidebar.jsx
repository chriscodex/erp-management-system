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
  RiArchiveLine
} from '@remixicon/react';

import { NavMain } from '@/components/sidebar/nav-main';
import { NavProjects } from '@/components/sidebar/nav-projects';
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
            {
              title: 'Marcas',
              url: '/inventario/motos/marcas',
              icon: RiInstanceFill,
            },
            {
              title: 'Categorías',
              url: '/inventario/motos/categorias',
              icon: RiAppsLine,
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
            {
              title: 'Marcas',
              url: '/inventario/productos/marcas',
              icon: RiInstanceFill,
            },
            {
              title: 'Categorías',
              url: '/inventario/productos/categorias',
              icon: RiAppsLine,
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
            <NavMain navTitle={'Plataforma'} items={data.navMain} />
            <NavProjects projects={data.projects} />
          </SidebarContent>

          <SidebarFooter>
            <NavUser />
          </SidebarFooter>
        </Sidebar>
      )}
    </>
  );
}
