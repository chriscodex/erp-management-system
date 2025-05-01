import { RiGroup3Line} from '@remixicon/react';

import { sortByUpdateDateDesc } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { SheetAddClienteWrapper } from '@/app/contactos/clientes/_components/sheets/addCliente/sheetAddClienteWrapper';
import { getAllClientesRequestServer } from '@/app/contactos/clientes/_services/requests';
import { DataTableClientes } from '@/app/contactos/clientes/_components/clientesTable/data-table';

export default async function ClientesPage() {
  const titles = [
    {
      title: 'Contactos',
      href: '',
      active: false,
    },
    {
      title: 'Clientes',
      href: '',
      active: false,
    },
  ];

  // eslint-disable-next-line no-undef
  const [clientesResponse] = await Promise.all([
    getAllClientesRequestServer(),
  ]);

  const { clientes, status } = clientesResponse;

  const clientesSorted = sortByUpdateDateDesc(clientes);

  return (
    <>
      <NavbarDynamic titles={titles}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <RiGroup3Line className="h-9 w-9" />
              <Label className="sm:text-4xl text-xl font-bold">
                Clientes
              </Label>
            </div>
            <SheetAddClienteWrapper />
          </CardHeader>
          <CardContent>
            <DataTableClientes data={clientesSorted} status={status} />
          </CardContent>
        </Card>
      </NavbarDynamic>
    </>
  );
}
