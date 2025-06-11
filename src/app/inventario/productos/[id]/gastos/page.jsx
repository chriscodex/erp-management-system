import { notFound } from 'next/navigation';
import { RiAuctionFill } from '@remixicon/react';

import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { getProductByIdRequestServer } from '@/app/inventario/productos/[id]/_services/requests';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { DataTableGastos } from '@/app/inventario/productos/[id]/gastos/_components/gastosTable/data-table';
import { agregarNumeracionTable, sortByUpdateDateDesc } from '@/lib/utils';
import { SheetAddGastoWrapper } from '@/app/inventario/productos/[id]/gastos/_components/sheets/addGasto/sheetAddGastoWrapper';
import { StatCard } from '@/components/customCards/statCard';
import { DollarSign } from 'lucide-react';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function ProductGastoPage({ params }) {
  const session = await getServerSession(authOptions);
  const { product, status } = await getProductByIdRequestServer(params.id);

  if (!product || session?.user?.rol !== "Administrador") {
    notFound();
  }

  const { gastos, nombre } = product;

  /* Secciones del navbar */
  const navbarTitles = [
    {
      title: 'Inventario',
      href: '',
      active: false,
    },
    {
      title: 'Productos',
      href: '/inventario/productos',
      active: true,
    },
    {
      title: nombre,
      href: `/inventario/productos/${params.id}`,
      active: true,
    },
    {
      title: 'Gastos',
      href: '',
      active: false,
    },
  ];
  const gastosSorted = sortByUpdateDateDesc(gastos);
  const gastosEnumerados = agregarNumeracionTable(gastosSorted);
  const totalMonto = gastosEnumerados.reduce(
    (sum, gasto) => sum + gasto.monto,
    0
  );
  return (
    <NavbarDynamic titles={navbarTitles}>
      <Card className="w-full">
        <CardHeader className="flex flex-col gap-2">
          <div className="w-full flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <RiAuctionFill className="h-9 w-9" />
              <Label className="sm:text-4xl text-xl font-bold">Gastos</Label>
            </div>
            <SheetAddGastoWrapper productId={params.id} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard
              title="Gastos Totales"
              value={parseFloat(totalMonto).toFixed(2)}
              icon={<DollarSign />}
            />
          </div>
        </CardHeader>
        <CardContent>
          <DataTableGastos
            data={gastosEnumerados}
            status={status}
            productId={params.id}
          />
        </CardContent>
      </Card>
    </NavbarDynamic>
  );
}
