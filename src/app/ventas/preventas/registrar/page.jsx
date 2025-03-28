import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { RiShoppingBag3Line } from '@remixicon/react';
import { RegistrarPreventaForm } from '@/app/ventas/preventas/registrar/_components/registrarPreventaForm';

export default async function RegistrarPreventaPage() {
  const titles = [
    {
      title: 'Ventas',
      href: '',
      active: false,
    },
    {
      title: 'Pre-Ventas',
      href: '/ventas/preventas',
      active: true,
    },
    {
      title: 'Registrar',
      href: '',
      active: false,
    },
  ];
  return (
    <NavbarDynamic titles={titles}>
      <Card className="w-full max-w-7xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <RiShoppingBag3Line className="md:h-7 h-5 md:w-7 w-5" />
            Registrar Pre-Venta
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RegistrarPreventaForm />
        </CardContent>
      </Card>
    </NavbarDynamic>
  );
}
