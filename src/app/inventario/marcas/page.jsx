import { Label } from '@/components/ui/label';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { Plus, User2Icon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function MotosMarcasPage() {
  /* Secciones del navbar */
  const navbarTitles = [
    {
      title: 'Inventario',
      href: '/inventario/todos',
      active: false,
    },
    {
      title: 'Motos',
      href: '/inventario/productos/todos',
      active: false,
    },
    {
      title: 'Marcas',
      href: '/inventario/productos/todos',
      active: false,
    },
  ];

  return (
    <>
      <NavbarDynamic titles={navbarTitles}>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <User2Icon className="h-9 w-9" />
            <Label className="sm:text-4xl text-xl font-bold">Marcas</Label>
          </div>
          <Link href="/usuarios/nuevo" className="flex justify-end">
            <Button>
              <Plus />
              Agregar Nuevo Marca
            </Button>
          </Link>
        </div>
      </NavbarDynamic>
    </>
  );
}

export default MotosMarcasPage;
