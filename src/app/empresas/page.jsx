import { notFound } from 'next/navigation';
import { Building, Plus, MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

import { Label } from '@/components/ui/label';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { Button } from '@/components/ui/button';
import { getAllEmpresasRequestServer } from '@/app/empresas/_services/requests';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RiFileListLine } from '@remixicon/react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function EmpresasPage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.rol !== 'Administrador') {
    notFound();
  }

  const { empresas } = await getAllEmpresasRequestServer();
  /* Secciones del navbar */
  const navbarTitles = [
    {
      title: 'Empresas',
      href: '',
      active: false,
    },
  ];

  return (
    <>
      <NavbarDynamic titles={navbarTitles}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <Building className="h-9 w-9" />
              <Label className="sm:text-4xl text-xl font-bold">Empresas</Label>
            </div>
            <Button>
              <Link
                href="/empresas/nuevo"
                className="flex justify-end items-center gap-2"
              >
                <Plus />
                <span>Agregar Empresa</span>
              </Link>
            </Button>
          </CardHeader>
          <div className="container mx-auto p-4">
            <header className="mb-8">
              <p className="text-muted-foreground mt-2">
                Administra y supervisa tus empresas desde un solo lugar.
              </p>
            </header>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {empresas.map((empresa) => (
                <Card key={empresa?.ruc} className="flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl mb-2">
                          {empresa?.nombre}
                        </CardTitle>
                        <CardDescription>
                          {empresa?.descripcion}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className="text-sm">
                        RUC: {empresa?.ruc}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
                        <span className="text-sm">{empresa?.direccion}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 mr-2 text-muted-foreground" />
                        <span className="text-sm">{empresa?.telefono}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 mr-2 text-muted-foreground" />
                        <span className="text-sm break-all">
                          {empresa?.email}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button variant="default" asChild>
                      <Link href={`/empresas/${empresa?._id}`}>
                        <RiFileListLine className="h-5 w-5 mr-2 text-muted-foreground" />
                        Ver Detalles
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </Card>
      </NavbarDynamic>
    </>
  );
}
