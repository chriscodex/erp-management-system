import { Label } from '@/components/ui/label';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';

function MotosModelosPage() {
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
      title: 'Modelos',
      href: '/inventario/productos/todos',
      active: false,
    },
  ];

  return (
    <>
      <NavbarDynamic titles={titles}>
        <Label>Motos Modelos</Label>
      </NavbarDynamic>
    </>
  );
}

export default MotosModelosPage