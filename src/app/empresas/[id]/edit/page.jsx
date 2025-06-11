import { notFound } from 'next/navigation';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getEmpresaRequestServer } from '@/app/empresas/[id]/_services/requests.js';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { UpdateFormEmpresa } from '@/app/empresas/[id]/edit/_components/updateFormEmpresa';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export const dynamic = 'force-dynamic';

export default async function Page({ params }) {
  const session = await getServerSession(authOptions);
  const { empresa } = await getEmpresaRequestServer(params.id);

  if (!empresa || session?.user?.rol !== "Administrador") {
    notFound();
  }

  const { nombre: empresaName } = empresa;

  const titles = [
    {
      title: 'Empresas',
      href: '/empresas',
      active: true,
    },
    {
      title: empresaName,
      href: `/empresas/${params.id}`,
      active: true,
    },
    {
      title: 'Editar',
      href: '',
      active: false,
    },
  ];

  return (
    <NavbarDynamic titles={titles}>
      <Card className="w-full max-w-7xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Editar</CardTitle>
        </CardHeader>
        <CardContent>
          <UpdateFormEmpresa empresaData={empresa} />
        </CardContent>
      </Card>
    </NavbarDynamic>
  );
}
