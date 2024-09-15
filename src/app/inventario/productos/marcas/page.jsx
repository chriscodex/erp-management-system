import { Label } from '@/components/ui/label';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';

function ProductosMarcasPage() {
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
      title: 'Marcas',
      href: '/inventario/productos/todos',
      active: false,
    },
  ];

  return (
    <>
      <NavbarDynamic titles={titles}>
        <Label>Marcas</Label>
      </NavbarDynamic>
    </>
  );
}

export default ProductosMarcasPage;
