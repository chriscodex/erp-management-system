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
import { ArrowUpDown } from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
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
import { SheetUpdateUnitProductWrapper } from '@/app/inventario/productos/[id]/_components/Sheets/updateUnitProduct/sheetUpdateWrapper';
import { serverErrorToast } from '@/components/toast/serverErrorToast';
import { RiDeleteBinLine } from '@remixicon/react';
import { DeleteUnitProductAlert } from '@/app/inventario/productos/[id]/_components/dialogs/deleteUnitProductAlert';

export function DataTableProduct({ productData, unidades, status = 200 }) {
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
            {row.getValue('estado') === 'prevendido' && (
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
        const unitProductData = row.original;

        const [isOpenDialogDelete, setIsOpenDialogDelete] = useState(false);

        return (
          <div className="flex items-center space-x-3">
            <SheetUpdateUnitProductWrapper
              unitProductData={row.original}
              productData={productData}
            />
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
            <DeleteUnitProductAlert
              isOpen={isOpenDialogDelete}
              setIsOpen={setIsOpenDialogDelete}
              actionAfterComplete="refresh"
              unitProductId={unitProductData._id}
              productId={productData._id}
            />
          </div>
        );
      },
    },
  ];

  const router = useRouter();

  /* Sorting */
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  const table = useReactTable({
    data: unidades,
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
          onChange={(e) => setSearchValue(e.target.value)}
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
