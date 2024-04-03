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
import { toast } from 'sonner';

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
import { ArrowUpDown } from 'lucide-react';
import { BadgeUnitProduct } from '@/app/inventario/productos/[id]/_components/badgeUnitProduct/badgeUnitProduct';
import { SheetUpdateUnitProductWrapper } from '../Sheets/sheetUpdateWrapper';

export function DataTableProduct({ data, status = 200 }) {
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
            <ArrowUpDown className="ml-2 h-4 w-4" />
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
          </div>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return (
          <div className="flex items-center space-x-3">
            <SheetUpdateUnitProductWrapper
              unitProductData={row.original}
              productData={data}
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

  const TIME_DEBOUNCE = 300;

  const debouncedSearch = useDebouncedCallback((value) => {
    table.getColumn('code')?.setFilterValue(value);
  }, TIME_DEBOUNCE);

  useEffect(() => {
    debouncedSearch(searchValue);
  }, [searchValue, debouncedSearch]);

  // table.getColumn('rol').getIsVisible();

  useEffect(() => {
    if (status !== 200) {
      toast.error(
        'No podemos conectarnos al servidor en este momento. Verifica tu conexión a internet o inténtalo nuevamente en unos minutos. Si el error persiste, ponte en contacto con los desarrolladores.',
        { duration: 10000 }
      );
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
