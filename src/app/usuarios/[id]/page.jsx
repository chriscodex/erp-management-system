import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getUser } from '@/app/usuarios/[id]/_services/requests';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { FormUserDetail } from '@/app/usuarios/[id]/_components/FormUserDetail';

export default async function Page({ params }) {
  const { user } = await getUser(params.id);
  if (!user) {
    notFound();
  }
  console.log(user);
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 h-4 dark:bg-white bg-muted-foreground"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <Link
                  href="/usuarios"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Usuarios
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="select-none">
                <BreadcrumbPage>
                  {user.nombres + ' ' + user.apellidos}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <FormUserDetail userDetail={user} />
      </div>
    </SidebarInset>
  );
}
