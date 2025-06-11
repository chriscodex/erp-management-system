import { notFound } from 'next/navigation';
import Link from "next/link";
import { Label } from "@radix-ui/react-label";
import { User2Icon, Plus } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { columns } from "@/app/usuarios/_components/UsersTable/columns";
import { NavbarSimple } from "@/components/navbar/NavbarSimple";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/app/usuarios/_components/UsersTable/data-table";
import { sortByUpdateDateDesc } from "@/lib/utils";
import { getAllUsersRequestServer } from "@/app/usuarios/_services/requests";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Page() {
  const session = await getServerSession(authOptions);

  const { users, status } = await getAllUsersRequestServer();

  const usersSorted = sortByUpdateDateDesc(users);

  if (session?.user?.rol !== "Administrador") {
    notFound();
  }

  return (
    <>
      <NavbarSimple title="Usuarios">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <User2Icon className="h-9 w-9" />
              <Label className="sm:text-4xl text-xl font-bold">Usuarios</Label>
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
      </NavbarSimple>
    </>
  );
}
