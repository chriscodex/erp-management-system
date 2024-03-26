import Link from 'next/link';
import { RiArchiveLine } from '@remixicon/react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, DollarSign, ExternalLink } from 'lucide-react';
import { NavbarSimple } from '@/components/navbar/NavbarSimple';
import { getAllAlmacenesRequestServer } from '@/app/inventario/almacen/_services/requests.js';

export default async function CompaniesPage() {
  const { almacenes } = await getAllAlmacenesRequestServer();

  return (
    <NavbarSimple title="Almacen">
      <div className="container mx-auto p-4">
        <header className="mb-8">
          <div className="flex items-center space-x-2">
            <RiArchiveLine className="h-9 w-9 text-muted-foreground" />
            <h1 className="text-3xl font-bold">Almacén</h1>
          </div>
          <p className="text-muted-foreground mt-2">
            Administra y supervisa tus almaceness
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {almacenes?.map((almacen) => (
            <Card key={almacen?._id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">
                      {almacen?.nombre}
                    </CardTitle>
                    <CardDescription>{almacen?.descripcion}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-sm">
                    ID: {almacen?._id}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Package className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span className="text-sm">150 productos</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span className="text-sm">$180,000</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href={`/empresas/${almacen?._id}`}>Ver Detalles</Link>
                </Button>
                <Button variant="default" asChild>
                  <Link href={`/empresas/${almacen?._id}/dashboard`}>
                    Ir al Dashboard
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </NavbarSimple>
  );
}
