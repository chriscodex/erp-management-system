import { Label } from '@/components/ui/label';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RiAppsLine } from '@remixicon/react';

export default function CategoriasPage() {
  const titles = [
    {
      title: 'Inventario',
      href: '/inventario/todos',
      active: false,
    },
    {
      title: 'Categorías',
      href: '/inventario/categorias',
      active: false,
    },
  ];

  return (
    <>
      <NavbarDynamic titles={titles}>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <RiAppsLine className="h-9 w-9" />
            <Label className="sm:text-4xl text-xl font-bold">Categorías</Label>
          </div>
          <Link href="/usuarios/nuevo" className="flex justify-end">
            <Button>
              <Plus />
              Agregar Nueva Categoría
            </Button>
          </Link>
        </div>
      </NavbarDynamic>
    </>
  );
}
