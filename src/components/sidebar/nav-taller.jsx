'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useSidebar } from '@/components/ui/sidebar';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';

export function NavTaller({ navTitle, items }) {
  const { open } = useSidebar();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="select-none">{navTitle}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible select-none"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  className={`${open ? '' : 'pointer-events-none'}`}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  {item.items?.length > 0 && (
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 group-data-[state=closed]/collapsible:rotate-0" />
                  )}
                </SidebarMenuButton>
              </CollapsibleTrigger>

              {item.items?.length > 0 && (
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <Collapsible
                        key={subItem.title}
                        asChild
                        defaultOpen={false}
                        className="group/collapsibleSub cursor-pointer"
                      >
                        <SidebarMenuSubItem>
                          {subItem.items?.length > 0 ? (
                            <>
                              <CollapsibleTrigger asChild>
                                <SidebarMenuSubButton>
                                  {subItem.icon && <subItem.icon />}
                                  <span>{subItem.title}</span>
                                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsibleSub:rotate-90 group-data-[state=closed]/collapsibleSub:rotate-0" />
                                </SidebarMenuSubButton>
                              </CollapsibleTrigger>
                              <CollapsibleContent>
                                <SidebarMenuSub className="ml-4">
                                  {subItem.items.map((subSubItem) => (
                                    <SidebarMenuSubItem key={subSubItem.title}>
                                      <SidebarMenuSubButton asChild>
                                        <Link href={subSubItem.url}>
                                          {subSubItem.icon && (
                                            <subSubItem.icon />
                                          )}
                                          <span>{subSubItem.title}</span>
                                        </Link>
                                      </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                  ))}
                                </SidebarMenuSub>
                              </CollapsibleContent>
                            </>
                          ) : (
                            <SidebarMenuSubButton asChild>
                              <Link href={subItem.url}>
                                {subItem.icon && <subItem.icon />}
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          )}
                        </SidebarMenuSubItem>
                      </Collapsible>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
