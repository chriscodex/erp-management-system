import { RiMotorbikeFill } from '@remixicon/react';

import { Label } from '@/components/ui/label';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { DataTableProducts } from '../../productos/_components/ProductsTable/data-table';


function MotosModelosPage() {
  const titles = [
    {
      title: 'Inventario',
      href: '',
      active: false,
    },
    {
      title: 'Motos',
      href: '',
      active: false,
    },
    {
      title: 'Modelos',
      href: '',
      active: false,
    },
  ];

  return (
    <>
      <NavbarDynamic titles={titles}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-2">
            <div className="flex items-center gap-2">
              <RiMotorbikeFill className="md:h-9 h-5 md:w-9 w-5" />
              <Label className="sm:text-4xl text-xl font-bold">Modelos</Label>
            </div>
            <Button asChild>
              <Link href="/inventario/motos/modelos/nuevo">
                <Plus className="h-4 w-4" /> Agregar Modelo
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {/* <DataTableProducts columns={columnsProducts} data={products} /> */}
          </CardContent>
        </Card>
      </NavbarDynamic>
    </>
  );
}

export default MotosModelosPage;
