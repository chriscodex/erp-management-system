'use client';

import { MoreHorizontal, ArrowUpDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DeleteUserAlert } from '@/app/usuarios/_components/Dialog/DeleteUserAlert';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

export const columnsMarcas = [
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
    accessorFn: (row) => row?.segmentId?.nombre,
    id: 'Segmento',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Segmento
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const segment = row?.original?.segmentId?.nombre;
      return <div className="text-start">{segment}</div>;
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
          {row.getValue('estado') === 'activo' ? (
            <Badge variant="success" className="text-sm">
              Activo
            </Badge>
          ) : (
            <Badge variant="error" className="text-sm">
              Inactivo
            </Badge>
          )}
        </div>
      );
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const { _id: id } = row.original;

      const router = useRouter();

      const [isOpenDialogDeleteUser, setIsOpenDialogDeleteUser] =
        useState(false);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuLabel className="select-none">
              Acciones
            </DropdownMenuLabel>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => router.push(`/inventario/marcas/${id}`)}
            >
              Detalle
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setIsOpenDialogDeleteUser(true)}
            >
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
          <DeleteUserAlert
            isOpen={isOpenDialogDeleteUser}
            setIsOpen={setIsOpenDialogDeleteUser}
            userDni={id}
            actionAfterComplete="refresh"
          />
        </DropdownMenu>
      );
    },
  },
];
