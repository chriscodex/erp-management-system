'use client';

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useDebouncedCallback } from 'use-debounce';
import { useRouter } from 'next/navigation';
import { ArrowUpDown, Edit, MoreHorizontal, Trash2 } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TIME_DEBOUNCE } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DataTablePagination } from '@/components/ui/table-pagination';
import { DataTableViewOptions } from '@/components/ui/table-view-options';
import { Button } from '@/components/ui/button';
import { BadgeUnitProduct } from '@/app/inventario/productos/[id]/_components/badgeUnitProduct/badgeUnitProduct';
import { serverErrorToast } from '@/components/toast/serverErrorToast';
import { RiFileListLine } from '@remixicon/react';
import { DeleteMotoAlert } from '@/app/inventario/motos/modelos/[modeloId]/_components/dialogs/deleteUnidadMotoAlert';

export function DataTableModelo({ modeloId, motos, status = 200 }) {
  const columns = [
    {
      accessorKey: 'numeracion',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="w-1"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            N°
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <div className="text-start">{row.getValue('numeracion')}</div>;
      },
    },
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
            {row.getValue('estado')?.titulo === 'disponible' && (
              <BadgeUnitProduct variant="successTable">
                Disponible
              </BadgeUnitProduct>
            )}
            {row.getValue('estado')?.titulo === 'reparado' && (
              <BadgeUnitProduct variant="blueTable">Reparado</BadgeUnitProduct>
            )}
            {row.getValue('estado')?.titulo === 'desarmado' && (
              <BadgeUnitProduct variant="orangeTable">
                Desarmado
              </BadgeUnitProduct>
            )}
            {row.getValue('estado')?.titulo === 'dañado' && (
              <BadgeUnitProduct variant="redTable">Dañado</BadgeUnitProduct>
            )}
            {row.getValue('estado')?.titulo === 'prevendido' && (
              <BadgeUnitProduct variant="purpleTable">
                Prevendido
              </BadgeUnitProduct>
            )}
          </div>
        );
      },
    },
    {
      id: 'actions',
      header: 'Acciones',
      cell: ({ row }) => {
        const { _id: unidadMotoId } = row.original;

        const router = useRouter();
        const { data: session } = useSession();
        /* Manejar estado de eliminar */
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
                onClick={() =>
                  router.push(
                    `/inventario/motos/modelos/${modeloId}/unidades/${unidadMotoId}`,
                  )
                }
              >
                <RiFileListLine />
                Ver
              </DropdownMenuItem>
              {session?.user?.rol === 'Administrador' && (
                <>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() =>
                      router.push(
                        `/inventario/motos/modelos/${modeloId}/unidades/${unidadMotoId}/edit`,
                      )
                    }
                  >
                    <Edit />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => setIsOpenDialogDelete(true)}
                  >
                    <Trash2 />
                    Eliminar
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
            {/* Dialog Delete */}
            <DeleteMotoAlert
              isOpen={isOpenDialogDelete}
              setIsOpen={setIsOpenDialogDelete}
              motoId={unidadMotoId}
              modelo={modeloId}
              actionAfterComplete="refresh"
            />
          </DropdownMenu>
        );
      },
    },
  ];

  const router = useRouter();

  /* Sorting */
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  const table = useReactTable({
    data: motos,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  /* Search */
  const [searchValue, setSearchValue] = useState('');

  const debouncedSearch = useDebouncedCallback((value) => {
    table.getColumn('code')?.setFilterValue(value);
  }, TIME_DEBOUNCE);

  useEffect(() => {
    debouncedSearch(searchValue);
  }, [searchValue, debouncedSearch]);

  // table.getColumn('rol').getIsVisible();

  useEffect(() => {
    if (status !== 200) {
      serverErrorToast();
    }
  }, [status]);

  useEffect(() => {
    // Fuerza la actualización de los datos cada vez que se accede a la página
    router.refresh();
  }, [router]);

  return (
    <div>
      {/* Input */}
      <div className="flex justify-between items-center py-4 w-full">
        <Input
          placeholder="Buscar por código"
          value={searchValue}
          onChange={(e) => {
            const trimmedValue = e.target.value.trim();
            setSearchValue(trimmedValue);
          }}
          className="max-w-sm"
        />
        <div>
          {/* View options */}
          <DataTableViewOptions table={table} />
        </div>
      </div>
      <div className="rounded-md border sm:min-h-[528px] min-h-[528px] w-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sin resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
