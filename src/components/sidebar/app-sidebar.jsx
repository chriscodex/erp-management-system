'use client';

import * as React from 'react';
import {
  AudioWaveform,
  GalleryVerticalEnd,
  SquareTerminal,
  User2Icon,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavProjects } from '@/components/nav-projects';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
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
      icon: SquareTerminal,
      isActive: false,
      items: [
        {
          title: 'Motos',
          url: '/usuarios',
          items: [
            { title: 'Modelos', url: '/inventario/motos/modelos' },
            { title: 'Marcas', url: '/inventario/motos/marcas' },
            { title: 'Categorías', url: '/inventario/motos/categorias' },
          ],
        },
        {
          title: 'Productos Generales',
          url: '/usuarios',
          items: [
            { title: 'Marcas', url: '/inventario/productos/marcas' },
            { title: 'Categorías', url: '/inventario/productos/categorias' },
          ],
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
            <NavUser user={data.user} />
          </SidebarFooter>
        </Sidebar>
      )}
    </>
  );
}
