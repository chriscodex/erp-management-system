import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { RiCalendarScheduleLine } from '@remixicon/react';
import { NuevaReservacionForm } from '@/app/inventario/motos/reservaciones/nuevo/_components/nuevaReservacionForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function NuevaReservacionPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.rol !== 'Administrador') {
    notFound();
  }
  const titles = [
    {
      title: 'Inventario',
      href: '',
      active: false,
    },
    {
      title: 'Motos',
      href: '',
      active: false,
    },
    {
      title: 'Reservaciones',
      href: '',
      active: false,
    },
    {
      title: 'Nueva Reservacion',
      href: '',
      active: false,
    },
  ];
  return (
    <NavbarDynamic titles={titles}>
      <Card className="w-full max-w-7xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <RiCalendarScheduleLine className="md:h-7 h-5 md:w-7 w-5" />
            Nueva reservación
          </CardTitle>
        </CardHeader>
        <CardContent>
          <NuevaReservacionForm />
        </CardContent>
      </Card>
    </NavbarDynamic>
  );
}
