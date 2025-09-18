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
import { useSession } from 'next-auth/react';

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

import { DeleteCategoryAlert } from '@/app/inventario/categorias/_components/dialogs/DeleteCategoryAlert';
import { CategoryDetail } from '@/app/inventario/categorias/_components/sheets/category-detail';
import { SheetUpdateWrapper } from '@/app/inventario/categorias/_components/sheets/updateCategory/sheetUpdateWrapper';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { serverErrorToast } from '@/components/toast/serverErrorToast';
import { TIME_DEBOUNCE } from '@/lib/utils';

export function DataTableCategory({ data, segments, status = 200 }) {
  const router = useRouter();
  const { data: session } = useSession();

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
        const categoryData = row.original;

        const [isOpenDialogDeleteCategory, setIsOpenDialogDeleteCategory] =
          useState(false);

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
                      <CategoryDetail categoryData={categoryData} />
                    </Sheet>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Detalle</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {session?.user?.rol === 'Administrador' && (
              <SheetUpdateWrapper
                segments={segments}
                categoryData={categoryData}
              />
            )}

            {session?.user?.rol === 'Administrador' && (
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="cursor-pointer"
                      onClick={() => setIsOpenDialogDeleteCategory(true)}
                    >
                      <RiDeleteBinLine className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Eliminar</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <DeleteCategoryAlert
              isOpen={isOpenDialogDeleteCategory}
              setIsOpen={setIsOpenDialogDeleteCategory}
              actionAfterComplete="refresh"
              id={categoryData._id}
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
          onChange={(e) => {
            const trimmedValue = e.target.value.trim();
            setSearchValue(trimmedValue);
          }}
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
