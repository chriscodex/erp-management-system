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
import { formatDateLong } from '@/lib/formateador';
import { formatMoney } from '@/lib/utils';

export const columns = [
  {
    accessorKey: 'code',
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
      return <div className="text-start">{row.getValue('code')}</div>;
    },
  },
  {
    accessorKey: 'fecha',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Fecha
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-start">
          {formatDateLong(row.getValue('fecha'), false)}
        </div>
      );
    },
  },
  {
    accessorKey: 'productos',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Productos
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => {
      const productos = row?.original?.productos.length;
      return <div className="text-start">{productos}</div>;
    },
  },
  {
    accessorKey: 'monto',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Monto
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => {
      const total = row?.original?.productos.reduce(
        (acc, p) => acc + (p.precioVenta || 0) * (p.cantidad || 1),
        0,
      );
      return (
        <div className="text-start">
          {`S/. `}
          {formatMoney(total)}
        </div>
      );
    },
  },

  {
    id: 'actions',
    header: 'Acciones',
    cell: ({ row }) => {
      const { _id: id } = row.original;

      const router = useRouter();

      return (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="cursor-pointer flex"
                onClick={() => router.push(`/ventas/ventas-historicas/${id}`)}
              >
                <RiFileListLine className="w-5 h-5 text-muted-foreground hover:text-foreground" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="flex items-center justify-center gap-1">
                Detalle
                <ExternalLink className="h-3 w-3" />
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
];
