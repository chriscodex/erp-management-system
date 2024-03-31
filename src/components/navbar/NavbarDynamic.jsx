import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { Fragment } from 'react';

function NavbarDynamic({ children, titles = [] }) {
  return (
    <>
      <SidebarInset className="min-w-0">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 h-4 dark:bg-white bg-muted-foreground"
            />
            <Breadcrumb>
              <BreadcrumbList>
                {titles.map((item, index) => (
                  <Fragment key={index}>
                    <BreadcrumbItem
                      className={`${item.active ? '' : 'pointer-events-none'}`}
                    >
                      {index < titles.length - 1 ? (
                        <Link
                          href={item.href}
                          className="text-muted-foreground transition-colors hover:text-foreground hidden md:block"
                        >
                          {item.title}
                        </Link>
                      ) : (
                        <BreadcrumbPage className="pointer-events-none">
                          {item.title}
                        </BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                    {index < titles.length - 1 && (
                      <BreadcrumbSeparator className="hidden md:block" />
                    )}
                  </Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 container mx-auto">
          {children}
        </div>
      </SidebarInset>
    </>
  );
}

export { NavbarDynamic };
