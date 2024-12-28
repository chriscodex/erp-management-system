'use client';

import { ArrowUpDown, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { RiFileListLine } from '@remixicon/react';
import { BadgeUnitProduct } from '@/app/inventario/productos/[id]/_components/badgeUnitProduct/badgeUnitProduct';

export const columnsTodasMotos = [
  {
    accessorKey: 'nombre',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="text-start">{row.getValue('nombre')}</div>;
    },
  },
  {
    accessorFn: (row) => row?.modeloId?.nombre,
    id: 'modeloId',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Modelo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const modelo = row?.original?.modeloId?.nombre;

      return <div className="text-start">{modelo}</div>;
    },
  },
  {
    accessorFn: (row) => row?.code,
    id: 'code',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Código
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const codigoMoto = row?.original?.code;

      return <div className="text-start">{codigoMoto}</div>;
    },
  },
  {
    accessorFn: (row) => row?.almacenId?.nombre,
    id: 'almacenId',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Almacen
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const almacen = row?.original?.almacenId?.nombre;

      return <div className="text-start">{almacen}</div>;
    },
  },
  {
    accessorKey: 'estado',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Estado
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-start">
          {row.getValue('estado') === 'disponible' && (
            <BadgeUnitProduct variant="successTable">
              Disponible
            </BadgeUnitProduct>
          )}
          {row.getValue('estado') === 'reparado' && (
            <BadgeUnitProduct variant="blueTable">Reparado</BadgeUnitProduct>
          )}
          {row.getValue('estado') === 'desaparecido' && (
            <BadgeUnitProduct variant="orangeTable">
              Desaparecido
            </BadgeUnitProduct>
          )}
          {row.getValue('estado') === 'dañado' && (
            <BadgeUnitProduct variant="redTable">Dañado</BadgeUnitProduct>
          )}
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: 'Acciones',
    cell: ({ row }) => {
      const { _id: motoId, modeloId } = row.original;

      const router = useRouter();

      return (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="cursor-pointer"
                onClick={() =>
                  router.push(
                    `/inventario/motos/modelos/${modeloId?._id}/unidades/${motoId}`
                  )
                }
              >
                <RiFileListLine className="w-5 h-5 text-muted-foreground hover:text-foreground" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="flex items-center justify-center gap-1">
                Detalles <ExternalLink className="h-3 w-3" />
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
];
