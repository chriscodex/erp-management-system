'use client';

import * as React from 'react';
import {
  AudioWaveform,
  BookOpen,
  Bot,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
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
    avatar: '/avatars/shadcn.jpg',
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
      title: 'Usuarios',
      url: '#',
      icon: SquareTerminal,
      isActive: false,
      items: [
        {
          title: 'Vendedores',
          url: '/usuarios',
        },
        {
          title: 'Starred',
          url: '#',
        },
        {
          title: 'Settings',
          url: '#',
        },
      ],
    },
    {
      title: 'Models',
      url: '#',
      icon: Bot,
      items: [
        {
          title: 'Genesis',
          url: '#',
        },
        {
          title: 'Explorer',
          url: '#',
        },
        {
          title: 'Quantum',
          url: '#',
        },
      ],
    },
    {
      title: 'Documentation',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'Introduction',
          url: '#',
        },
        {
          title: 'Get Started',
          url: '#',
        },
        {
          title: 'Tutorials',
          url: '#',
        },
        {
          title: 'Changelog',
          url: '#',
        },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Team',
          url: '#',
        },
        {
          title: 'Billing',
          url: '#',
        },
        {
          title: 'Limits',
          url: '#',
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
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }) {
  const pathname = usePathname();

  const isLoginPage = pathname === '/login';

  return (
    <>
      {!isLoginPage && (
        <Sidebar
          collapsible="icon"
          {...props}
        >
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
