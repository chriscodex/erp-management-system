import { RiTeamFill } from '@remixicon/react';

import { sortByUpdateDateDesc } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { DataTableCategory } from '@/app/inventario/categorias/_components/categoriesTable/data-table';
import {
  getAllCategoriesRequestServer,
  getAllSegmentsRequestServer,
} from '@/app/inventario/categorias/_services/requests';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { SheetAddProveedorWrapper } from '@/app/contactos/proveedores/_components/sheets/addProveedor/sheetAddProveedorWrapper';

export default async function ProveedoresPage() {
  const titles = [
    {
      title: 'Contactos',
      href: '',
      active: false,
    },
    {
      title: 'Proveedores',
      href: '',
      active: false,
    },
  ];

  // eslint-disable-next-line no-undef
  const [categoriesResponse, segmentsResponse] = await Promise.all([
    getAllCategoriesRequestServer(),
    getAllSegmentsRequestServer(),
  ]);

  const { categories, status } = categoriesResponse;

  const { segments } = segmentsResponse;

  const categoriesSorted = sortByUpdateDateDesc(categories);

  return (
    <>
      <NavbarDynamic titles={titles}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <RiTeamFill className="h-9 w-9" />
              <Label className="sm:text-4xl text-xl font-bold">
                Proveedores
              </Label>
            </div>
            <SheetAddProveedorWrapper />
          </CardHeader>
          <CardContent>
            <DataTableCategory
              data={categoriesSorted}
              segments={segments}
              status={status}
            />
          </CardContent>
        </Card>
      </NavbarDynamic>
    </>
  );
}
