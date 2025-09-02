import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { CreateFormSucursal } from '@/app/sucursales/nuevo/_components/createFormSucursal';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session?.user?.rol !== 'Administrador') {
    notFound();
  }
  const titles = [
    {
      title: 'Sucursales',
      href: '/sucursales',
      active: true,
    },
    {
      title: 'Agregar Sucursal',
      href: '',
      active: false,
    },
  ];
  return (
    <NavbarDynamic titles={titles}>
      <Card className="w-full max-w-7xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Agregar Sucursal</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateFormSucursal />
        </CardContent>
      </Card>
    </NavbarDynamic>
  );
}
