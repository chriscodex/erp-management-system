'use client';

import { MoreHorizontal, ArrowUpDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RiDeleteBinLine, RiFileListLine } from '@remixicon/react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { formatDateShort } from '@/lib/formateador';
import { DeletePreventaAlert } from '@/app/ventas/preventas/[preventaId]/_components/dialogs/deletePreventaAlert';

export const columnsVentas = [
  {
    accessorKey: 'cliente',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Cliente
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const cliente = row?.original?.clienteId;
      return (
        <div className="text-start">
          {cliente?.tipo === 'empresa'
            ? cliente?.datos?.razonSocial
            : cliente?.datos?.nombres + ' ' + cliente?.datos?.apellidos}
        </div>
      );
    },
  },
  {
    accessorKey: 'cliente',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Identificador
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const cliente = row?.original?.clienteId;
      return (
        <div className="text-start flex">
          <p className="font-light mr-2 text-[0.8rem] border rounded-md px-1">
            {cliente?.tipo === 'empresa' ? 'RUC' : 'DNI'}
          </p>
          <p>
            {cliente?.tipo === 'empresa'
              ? cliente?.datos?.ruc
              : cliente?.datos?.dni}
          </p>
        </div>
      );
    },
    // Configuramos el valor de filtro personalizado
    accessorFn: (row) => {
      return row.cliente?.tipo === 'empresa'
        ? row.cliente?.datos?.ruc
        : row.cliente?.datos?.dni;
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
      const fecha = formatDateShort(row?.original?.fecha, false);
      return <div className="text-start">{fecha}</div>;
    },
  },
  {
    accessorKey: 'usuario',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Responsable
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-start">
          {row.getValue('usuario')?.nombres +
            ' ' +
            row.getValue('usuario')?.apellidos}
        </div>
      );
    },
  },
  {
    accessorFn: (row) => row?.code,
    id: 'Código',
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
      const code = row?.original?.code;
      return <div className="text-start">{code}</div>;
    },
  },
  {
    id: 'actions',
    header: 'Acciones',
    cell: ({ row }) => {
      const { _id: id } = row.original;

      const router = useRouter();

      /* Manejar estado de eliminar marca */
      const [isOpenDialogDelete, setIsOpenDialogDelete] = useState(false);

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
              onClick={() => router.push(`/ventas/${id}`)}
            >
              <RiFileListLine />
              Detalle
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setIsOpenDialogDelete(true)}
            >
              <RiDeleteBinLine />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
          {/* Dialog Delete */}
          <DeletePreventaAlert
            isOpen={isOpenDialogDelete}
            setIsOpen={setIsOpenDialogDelete}
            preventaId={id}
            actionAfterComplete="refresh"
          />
        </DropdownMenu>
      );
    },
  },
];
