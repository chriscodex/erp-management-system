import { Label } from '@/components/ui/label';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';

function Loading() {
  const titles = [
    {
      title: 'Inventario',
      href: '/inventario/todos',
      active: false,
    },
    {
      title: 'Productos',
      href: '/inventario/productos/todos',
      active: false,
    },
    {
      title: 'Todos los productos',
      href: '/inventario/productos/todos',
      active: false,
    },
  ];
  return (
    <>
      <NavbarDynamic titles={titles}>
        <Label>Cargando ...</Label>
      </NavbarDynamic>
    </>
  );
}

export default Loading;
