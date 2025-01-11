import { RiShoppingCartLine } from '@remixicon/react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';

import { getPreventaRequestServer } from '@/app/ventas/_services/requests';
import { RegistrarVentaForm } from '@/app/ventas/registrar/[preventaId]/_components/registrarVentaForm';

export default async function RegistrarVentaPage({ params }) {
  const { preventa } = await getPreventaRequestServer(params.preventaId);

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
            <RiShoppingCartLine className="md:h-7 h-5 md:w-7 w-5" />
            Registrar Venta
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RegistrarVentaForm preventaData={preventa} />
        </CardContent>
      </Card>
    </NavbarDynamic>
  );
}
