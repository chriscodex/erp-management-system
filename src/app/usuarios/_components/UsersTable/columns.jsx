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
import { DeleteUserAlert } from '@/app/usuarios/_components/Modal/DeleteUserAlert';
import { useState } from 'react';

export const columns = [
  // {
  //   accessorKey: 'ID',
  //   header: () => <div className="text-start">N°</div>,
  //   cell: ({ row, table }) => {
  //     const pageIndex = table.getState().pagination.pageIndex;
  //     const pageSize = table.getState().pagination.pageSize;
  //     const rowIndex = row.index;
  //     // Calcular el número correcto de la fila basado en la paginación
  //     const number = pageIndex * pageSize + rowIndex + 1;

  //     return <div className="text-start">{number}</div>;
  //   },
  // },
  {
    accessorKey: 'apellidos',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Apellidos
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="text-start">{row.getValue('apellidos')}</div>;
    },
  },
  {
    accessorKey: 'nombres',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nombres
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="text-start">{row.getValue('nombres')}</div>;
    },
  },
  {
    accessorKey: 'rol',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Rol
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'estado',
    header: 'Estado',
    cell: ({ row }) => {
      const userState = row.getValue('estado');
      return (
        <div
          className={
            userState === 'activo' ? 'text-green-500' : 'text-destructive'
          }
        >
          {userState === 'activo' ? 'Activo' : 'Inactivo'}
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { dni } = row.original;

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
              onClick={() => router.push(`/usuarios/${dni}`)}
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
            userDni={dni}
            actionAfterComplete="refresh"
          />
        </DropdownMenu>
      );
    },
  },
];
