'use client';

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import Link from 'next/link';

export function NavHome({ home }) {
  const { name, url } = home;
  const { isMobile } = useSidebar();

  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            {isMobile ? (
              <a href={url}>
                <home.icon />
                <span>{name}</span>
              </a>
            ) : (
              <Link href={url}>
                <home.icon />
                <span>{name}</span>
              </Link>
            )}
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
