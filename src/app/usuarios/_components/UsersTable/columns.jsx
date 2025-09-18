'use client';

import { MoreHorizontal, ArrowUpDown, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
import { Badge } from '@/components/ui/badge';
import { RiFileListLine, RiShoppingCartLine } from '@remixicon/react';

export const columns = [
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
            <Badge
              variant="successTable"
              className="text-sm w-[71px] flex justify-center"
            >
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
    header: 'Acciones',
    cell: ({ row }) => {
      const { _id: userId, rol } = row.original;

      const router = useRouter();

      /* Manejar estado de eliminar usuario */
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
              onClick={() => router.push(`/usuarios/${userId}`)}
            >
              <RiFileListLine />
              Detalle
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {(rol === 'Vendedor' || rol === 'Administrador') && (
              <>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => router.push(`/usuarios/${userId}/ventas`)}
                >
                  <RiShoppingCartLine />
                  Ver ventas
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setIsOpenDialogDeleteUser(true)}
            >
              <Trash2 />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
          {/* Dialog Delete */}
          <DeleteUserAlert
            isOpen={isOpenDialogDeleteUser}
            setIsOpen={setIsOpenDialogDeleteUser}
            userId={userId}
            actionAfterComplete="refresh"
          />
        </DropdownMenu>
      );
    },
  },
];
