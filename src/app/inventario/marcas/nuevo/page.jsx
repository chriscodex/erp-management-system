import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { CreateFormMarca } from '@/app/inventario/marcas/nuevo/_components/createFormMarca';
import { getAllSegmentsRequestServer } from '@/app/inventario/marcas/nuevo/_services/requests';

export default async function Page() {
  const { segments } = await getAllSegmentsRequestServer();

  const titles = [
    {
      title: 'Inventario',
      href: '',
      active: false,
    },
    {
      title: 'Marcas',
      href: '/inventario/marcas',
      active: true,
    },
    {
      title: 'Nueva Marca',
      href: '',
      active: false,
    },
  ];
  return (
    <NavbarDynamic titles={titles}>
      <div className="container mx-auto p-4">
        <Card className="w-full max-w-7xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Crear Nueva Marca
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CreateFormMarca segments={segments} />
          </CardContent>
        </Card>
      </div>
    </NavbarDynamic>
  );
}
