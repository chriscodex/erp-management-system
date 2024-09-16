import { Label } from '@/components/ui/label';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';

function MotosMarcasPage() {
  const titles = [
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
      <NavbarDynamic titles={titles}>
        <Label>Motos Marcas</Label>
      </NavbarDynamic>
    </>
  );
}

export default MotosMarcasPage