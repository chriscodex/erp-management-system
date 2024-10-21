import { NavbarSimple } from '@/components/navbar/NavbarSimple';
import { Plus } from 'lucide-react';
import { Label } from '@radix-ui/react-label';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RiHome2Line } from '@remixicon/react';

export default function Home() {
  return (
    <>
      <NavbarSimple title="Inicio">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <RiHome2Line className="h-9 w-9" />
            <Label className="sm:text-4xl text-xl font-bold">Inicio</Label>
          </div>
          <Link href="/usuarios/nuevo" className="flex justify-end">
            <Button>
              <Plus />
              Agregar Nuevo Usuario
            </Button>
          </Link>
        </div>
        {/* <DataTable columns={columns} data={usersSorted} status={status} /> */}
      </NavbarSimple>
    </>
  );
}
