import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { CreateFormEmpresa } from '@/app/empresas/nuevo/_components/createFormEmpresa';

export default async function Page() {

  const titles = [
    {
      title: 'Empresas',
      href: '/empresas',
      active: true,
    },
    {
      title: 'Agregar Empresa',
      href: '',
      active: false,
    },
  ];
  return (
    <NavbarDynamic titles={titles}>
      <Card className="w-full max-w-7xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Agregar Marca
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CreateFormEmpresa/>
        </CardContent>
      </Card>
    </NavbarDynamic>
  );
}
