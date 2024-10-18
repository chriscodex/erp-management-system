import { notFound } from 'next/navigation';
import {
  Tag,
  Calendar,
  Info,
  CheckCircle,
  XCircle,
  ActivityIcon,
} from 'lucide-react';
import { RiMotorbikeLine, RiDropboxFill } from '@remixicon/react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getMarca } from '@/app/inventario/marcas/[id]/_services/requests.js';
import { NavbarDynamic } from '@/components/navbar/NavbarDynamic';
import { formatDateLong } from '@/lib/formateador';
import { DetailDropdown } from '@/app/inventario/marcas/[id]/_components/detailDropdown';

export default async function Page({ params }) {
  const { marca } = await getMarca(params.id);

  if (!marca) {
    notFound();
  }

  const {
    _id: marcaId,
    nombre: marcaName,
    descripcion,
    estado,
    segmentId: { nombre: segmentName },
    createdAt,
  } = marca;

  const titles = [
    {
      title: 'Inventario',
      href: '/inventario/todos',
      active: false,
    },
    {
      title: 'Marcas',
      href: '/inventario/marcas',
      active: true,
    },
    {
      title: marcaName,
      href: '/inventario/marcas',
      active: false,
    },
  ];

  const createdAtFormated = formatDateLong(createdAt);

  const isActive = estado === 'activo';

  return (
    <NavbarDynamic titles={titles}>
      <div className="container mx-auto p-4">
        <Card className="w-full max-w-7xl mx-auto">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold">{marcaName}</CardTitle>
              <DetailDropdown marcaId={marcaId} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Info className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Descripción:
                </span>
              </div>
              <p>{descripcion}</p>
              <Separator />
              <div className="flex items-center space-x-2">
                <Tag className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Segmento:</span>
                <Badge variant="outline" className="ml-2">
                  {segmentName === 'Motos' ? (
                    <RiMotorbikeLine className="mr-1 h-4 w-4" />
                  ) : (
                    <RiDropboxFill className="mr-1 h-4 w-4" />
                  )}
                  {segmentName}
                </Badge>
              </div>
              <Separator />
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Fecha de creación:
                </span>
                <span>{createdAtFormated}</span>
              </div>
              <Separator />
              <div className="flex items-center space-x-2">
                <ActivityIcon className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Estado:</span>
                <Badge variant={isActive ? 'success' : 'error'}>
                  {isActive ? (
                    <CheckCircle className="mr-1 h-4 w-4" />
                  ) : (
                    <XCircle className="mr-1 h-4 w-4" />
                  )}
                  {isActive ? 'Activo' : 'Inactivo'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </NavbarDynamic>
  );
}
