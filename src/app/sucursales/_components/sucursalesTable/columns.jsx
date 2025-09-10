'use client';

import { MoreHorizontal, ArrowUpDown, Edit, User2Icon } from 'lucide-react';
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
import { DeleteSucursalAlert } from '@/app/sucursales/_components/dialogs/DeleteSucursalAlert.jsx';
import { RiDeleteBinLine, RiFileListLine } from '@remixicon/react';

export const columns = [
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
    accessorKey: 'direccion',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Direccion
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="text-start">{row.getValue('direccion')}</div>;
    },
  },
  {
    accessorKey: 'telefono',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Teléfono
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => {
      return <div className="text-start">{row.getValue('telefono')}</div>;
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => {
      return <div className="text-start">{row.getValue('email')}</div>;
    },
  },
  {
    id: 'actions',
    header: 'Acciones',
    cell: ({ row }) => {
      const { _id: id } = row.original;

      const router = useRouter();

      /* Manejar estado de eliminar sucursal */
      const [isOpenDialogDeleteSucursal, setIsOpenDialogDeleteSucursal] =
        useState(false);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuLabel className="select-none">
              Acciones
            </DropdownMenuLabel>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => router.push(`/sucursales/${id}`)}
            >
              <RiFileListLine />
              Detalle
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => router.push(`/sucursales/${id}/usuarios`)}
              >
                <User2Icon />
                Ver usuarios
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => router.push(`/sucursales/${id}/edit`)}
            >
              <Edit />
              Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setIsOpenDialogDeleteSucursal(true)}
            >
              <RiDeleteBinLine />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
          {/* Dialog Delete */}
          <DeleteSucursalAlert
            isOpen={isOpenDialogDeleteSucursal}
            setIsOpen={setIsOpenDialogDeleteSucursal}
            id={id}
            actionAfterComplete="refresh"
          />
        </DropdownMenu>
      );
    },
  },
];
