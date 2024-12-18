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
import { useDebouncedCallback } from 'use-debounce';
import { useRouter } from 'next/navigation';

import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { DataTablePagination } from '@/components/ui/table-pagination';
import { DataTableViewOptions } from '@/components/ui/table-view-options';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { RiFileListLine, RiDeleteBinLine } from '@remixicon/react';
import { Badge } from '@/components/ui/badge';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { serverErrorToast } from '@/components/toast/serverErrorToast';
import { TIME_DEBOUNCE } from '@/lib/utils';
import { ProveedorDetail } from '@/app/contactos/proveedores/_components/sheets/proveedorDetail';
import { DeleteProveedorAlert } from '@/app/contactos/proveedores/_components/dialogs/deleteProveedorAlert';
import { SheetUpdateProveedorWrapper } from '@/app/contactos/proveedores/_components/sheets/updateProveedor/sheetUpdateProveedorWrapper';

export function DataTableProveedores({ data, status = 200 }) {
  const router = useRouter();

  const columns = [
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
            {row.getValue('estado') === 'activo' ? (
              <Badge variant="successTable" className="text-sm">
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
        const proveedorData = row.original;

        const [isOpenDialogDelete, setIsOpenDialogDelete] = useState(false);

        return (
          <div className="flex items-center space-x-3">
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-pointer flex">
                    <Sheet>
                      <SheetTrigger className="text-start">
                        <RiFileListLine className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                      </SheetTrigger>
                      <ProveedorDetail proveedorData={proveedorData} />
                    </Sheet>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Detalle</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <SheetUpdateProveedorWrapper proveedorData={proveedorData} />

            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="cursor-pointer"
                    onClick={() => setIsOpenDialogDelete(true)}
                  >
                    <RiDeleteBinLine className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Eliminar</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DeleteProveedorAlert
              isOpen={isOpenDialogDelete}
              setIsOpen={setIsOpenDialogDelete}
              actionAfterComplete="refresh"
              proveedorId={proveedorData._id}
            />
          </div>
        );
      },
    },
  ];

  /* Sorting */
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  /* Table */
  const table = useReactTable({
    data,
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
    table.getColumn('nombre')?.setFilterValue(value);
  }, TIME_DEBOUNCE);

  useEffect(() => {
    debouncedSearch(searchValue);
  }, [searchValue, debouncedSearch]);

  // table.getColumn('rol').getIsVisible();

  useEffect(() => {
    if (status === 500) {
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
      <div className="flex items-center py-4 w-full">
        <Input
          placeholder="Buscar por nombre"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="max-w-sm"
        />
        <DataTableViewOptions table={table} />
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
                            header.getContext()
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
                        cell.getContext()
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
