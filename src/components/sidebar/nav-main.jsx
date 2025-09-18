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

import { useSession } from 'next-auth/react';

export function NavMain({ navTitle, items }) {
  const { open } = useSidebar();
  const { data: session } = useSession();

  const filteredItems = items
    .map((item) => {
      // Filtro especial para "Contactos"
      if (item.title === 'Contactos') {
        if (session?.user?.rol === 'Administrador') return item;
        if (
          session?.user?.rol === 'Vendedor' ||
          session?.user?.rol === 'Tecnico'
        ) {
          const soloClientes = item.items.filter(
            (subItem) => subItem.title === 'Clientes',
          );
          return soloClientes.length ? { ...item, items: soloClientes } : null;
        }
        return null;
      }

      // Filtro especial para "Inventario" -> ocultar "Almacenes, Reservaciones y Pedidos" a no administradores

      if (item.title === 'Inventario') {
        const filteredSubItems = item.items
          .map((subItem) => {
            // Filtrar "Reservaciones" y "Pedidos" dentro de "Motos"
            if (subItem.title === 'Motos' && Array.isArray(subItem.items)) {
              const filteredMotoSubItems = subItem.items.filter((motoItem) => {
                if (
                  motoItem.title === 'Reservaciones' ||
                  motoItem.title === 'Pedidos'
                ) {
                  return session?.user?.rol === 'Administrador';
                }
                return true;
              });

              return { ...subItem, items: filteredMotoSubItems };
            }

            // Filtrar "Almacenes"
            if (subItem.title === 'Almacenes') {
              return session?.user?.rol === 'Administrador' ? subItem : null;
            }

            return subItem;
          })
          .filter(Boolean);

        return { ...item, items: filteredSubItems };
      }

      return item; // todo lo demás sin cambios
    })
    .filter(Boolean);

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="select-none">{navTitle}</SidebarGroupLabel>
      <SidebarMenu>
        {filteredItems.map((item) => (
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
