import Link from 'next/link';
import { Label } from '@radix-ui/react-label';
import { User2Icon, Plus } from 'lucide-react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { columns } from '@/app/usuarios/_components/UsersTable/columns';
import { NavbarSimple } from '@/components/navbar/NavbarSimple';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/app/usuarios/_components/UsersTable/data-table';
import {
  simplificadorParaClientComponent,
  sortByUpdateDateDesc,
} from '@/lib/utils';
import { getAllUsersRequest } from '@/app/usuarios/_services/requests';

export default async function Page() {
  const { users, status } = await getAllUsersRequest();

  const usersSimplified = simplificadorParaClientComponent(users);

  const usersSorted = sortByUpdateDateDesc(usersSimplified);

  return (
    <>
      <NavbarSimple title="Usuarios">
        <div className="container mx-auto p-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-2">
                <User2Icon className="h-9 w-9" />
                <Label className="sm:text-4xl text-xl font-bold">
                  Usuarios
                </Label>
              </div>
              <Link href="/usuarios/nuevo" className="flex justify-end">
                <Button>
                  <Plus />
                  Agregar Usuario
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={usersSorted} status={status} />
            </CardContent>
          </Card>
        </div>
      </NavbarSimple>
    </>
  );
}
