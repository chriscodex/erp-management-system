import {
  Bike,
  DollarSign,
  Package,
  TrendingUp,
  Users,
  Building,
  Tag,
  List,
} from 'lucide-react';
import { RiHome2Line } from '@remixicon/react';

import { Card, CardContent } from '@/components/ui/card';
import { NavbarSimple } from '@/components/navbar/NavbarSimple';
import { Label } from '@/components/ui/label';
import { QuickAccessCard } from '@/app/home/_components/quickAccesCard';

export default function HomePage() {
  return (
    <NavbarSimple title="Inicio">
      <div className="container mx-auto p-4">
        <div className="flex items-center gap-2 my-4">
          <RiHome2Line className="h-9 w-9" />
          <Label className="sm:text-4xl text-xl font-bold">Inicio</Label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Motos" value="1,234" icon={<Bike />} />
          <StatCard
            title="Ingresos Mensuales"
            value="$123,456"
            icon={<DollarSign />}
          />
          <StatCard
            title="Productos en Stock"
            value="5,678"
            icon={<Package />}
          />
          <StatCard
            title="Crecimiento Anual"
            value="12.3%"
            icon={<TrendingUp />}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <QuickAccessCard
            title="Inventario de Motos"
            description="Gestiona el inventario de motos"
            icon={<Bike className="h-6 w-6" />}
            linkText="Ver Inventario"
            linkHref="/inventario/motos"
          />
          <QuickAccessCard
            title="Gestión de Usuarios"
            description="Administra usuarios y permisos"
            icon={<Users className="h-6 w-6" />}
            linkText="Ver Usuarios"
            linkHref="/usuarios"
          />
          <QuickAccessCard
            title="Almacenes"
            description="Gestiona los almacenes"
            icon={<Building className="h-6 w-6" />}
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
            title="Marcas"
            description="Administra las marcas de los productos"
            icon={<Tag className="h-6 w-6" />}
            linkText="Gestionar"
            linkHref="/inventario/marcas"
          />
          <QuickAccessCard
            title="Movimientos de Inventario"
            description="Registra entradas y salidas de productos"
            icon={<List className="h-6 w-6" />}
            linkText="Ver Movimientos"
            linkHref="/movimientos"
          />
        </div>
      </div>
    </NavbarSimple>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <Card>
      <CardContent className="flex items-center p-6">
        <div className="text-primary p-3 bg-primary/10 rounded-full mr-4">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
      </CardContent>
    </Card>
  );
}
