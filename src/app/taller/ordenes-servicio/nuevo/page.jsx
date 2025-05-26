import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { RiFileCopy2Line } from '@remixicon/react';
import { NuevaOrdenDeServicioForm  } from '@/app/taller/ordenes-servicio/nuevo/_components/nuevaOrdenDeServicioForm';
export default async function NuevaOrdenDeServicioPage() {
  const titles = [
    {
      title: 'Taller',
      href: '',
      active: false,
    },
    {
      title: 'Órdenes de Servicio',
      href: '/taller/ordenes-servicio',
      active: true,
    },
    {
      title: 'Nuevo',
      href: '',
      active: false,
    },
  ];
  return (
    <NavbarDynamic titles={titles}>
      <Card className="w-full max-w-7xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <RiFileCopy2Line className="md:h-7 h-5 md:w-7 w-5" />
            Nueva Orden de Servicio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <NuevaOrdenDeServicioForm />
        </CardContent>
      </Card>
    </NavbarDynamic>
  );
}


