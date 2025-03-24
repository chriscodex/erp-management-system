import { Building, Plus } from 'lucide-react';
import Link from 'next/link';

import { Label } from '@/components/ui/label';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { Button } from '@/components/ui/button';
import { DataTableMarcas } from '@/app/empresas/_components/empresasTable/data-table.jsx';
import { columnsEmpresas } from '@/app/empresas/_components/empresasTable/columns.jsx';
import { sortByUpdateDateDesc } from '@/lib/utils';
import { getAllEmpresasRequestServer } from '@/app/empresas/_services/requests';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default async function EmpresasPage() {
  const { empresas, status } = await getAllEmpresasRequestServer();

  const empresasSorted = sortByUpdateDateDesc(empresas);

  /* Secciones del navbar */
  const navbarTitles = [
    {
      title: 'Empresas',
      href: '',
      active: false,
    },
  ];

  return (
    <>
      <NavbarDynamic titles={navbarTitles}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <Building className="h-9 w-9" />
              <Label className="sm:text-4xl text-xl font-bold">Empresas</Label>
            </div>
            <Button>
              <Link
                href="/empresas/nuevo"
                className="flex justify-end items-center gap-2"
              >
                <Plus />
                <span>Agregar Empresa</span>
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <DataTableMarcas
              columns={columnsEmpresas}
              data={empresasSorted}
              status={status}
            />
          </CardContent>
        </Card>
      </NavbarDynamic>
    </>
  );
}
