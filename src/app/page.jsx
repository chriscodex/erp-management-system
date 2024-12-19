import { Bike, DollarSign, Package, List, User2Icon } from 'lucide-react';
import {
  RiArchiveLine,
  RiGalleryView2,
  RiHome2Line,
  RiMotorbikeFill,
  RiTeamFill,
} from '@remixicon/react';

import { NavbarSimple } from '@/components/navbar/NavbarSimple';
import { Label } from '@/components/ui/label';
import { QuickAccessCard } from '@/app/home/_components/quickAccesCard';
import { StatHomeCard } from '@/app/home/_components/statCard';
import { Card, CardContent } from '@/components/ui/card';
import {
  getTotalMotosRequestServer,
  getTotalTiposProductosRequestServer,
} from '@/app/home/_services/requests';

export default async function HomePage() {
  const { totalMotos } = await getTotalMotosRequestServer();
  const { totalTiposProductos } = await getTotalTiposProductosRequestServer();

  return (
    <NavbarSimple title="Inicio">
      <div className="container mx-auto p-4">
        <div className="flex items-center gap-2 my-4">
          <RiHome2Line className="h-9 w-9" />
          <Label className="sm:text-4xl text-xl font-bold">Inicio</Label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <StatHomeCard
            title="Total Motos"
            value={totalMotos}
            icon={<Bike />}
          />
          <StatHomeCard
            title="Productos en Stock"
            value="5,678"
            icon={<Package />}
          />
          <StatHomeCard
            title="Tipos Productos"
            value={totalTiposProductos}
            icon={<RiGalleryView2 />}
          />
          <Card className="col-span-1 md:col-span-2">
            <CardContent className="h-full flex items-center p-6">
              <div className="text-primary p-3 bg-primary/10 rounded-full mr-4">
                <DollarSign />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Valor Total de Inventario
                </p>
                <h3 className="text-2xl font-bold">S/. 123,456.00</h3>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <QuickAccessCard
            title="Inventario de Motos"
            description="Gestiona el inventario de motos"
            icon={<RiMotorbikeFill className="h-6 w-6" />}
            linkText="Ver Inventario"
            linkHref="/inventario/motos"
          />
          <QuickAccessCard
            title="Gestión de Usuarios"
            description="Administra usuarios y permisos"
            icon={<User2Icon className="h-6 w-6" />}
            linkText="Ver Usuarios"
            linkHref="/usuarios"
          />
          <QuickAccessCard
            title="Almacenes"
            description="Gestiona los almacenes"
            icon={<RiArchiveLine className="h-6 w-6" />}
            linkText="Ver Almacenes"
            linkHref="/inventario/almacenes"
          />
          <QuickAccessCard
            title="Inventario de Productos Generales"
            description="Administra otros productos y accesorios"
            icon={<Package className="h-6 w-6" />}
            linkText="Ver Productos"
            linkHref="/inventario/productos"
          />
          <QuickAccessCard
            title="Proveedores"
            description="Administra los proveedores"
            icon={<RiTeamFill className="h-6 w-6" />}
            linkText="Ver Proveedores"
            linkHref="/inventario/marcas"
          />
          <QuickAccessCard
            title="Salidas de Inventario"
            description="Registra salidas de productos y motos"
            icon={<List className="h-6 w-6" />}
            linkText="Registrar"
            linkHref="/movimientos"
          />
        </div>
      </div>
    </NavbarSimple>
  );
}
