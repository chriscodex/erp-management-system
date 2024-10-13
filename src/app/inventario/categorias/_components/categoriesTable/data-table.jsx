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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { DataTablePagination } from '@/components/ui/table-pagination';
import { DataTableViewOptions } from '@/components/ui/table-view-options';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DeleteCategoryAlert } from '@/app/inventario/categorias/_components/dialogs/DeleteCategoryAlert';
import { CategoryDetail } from '@/app/inventario/categorias/_components/sheets/category-detail';
import { SheetUpdateWrapper } from '@/app/inventario/categorias/_components/sheets/updateCategory/sheetUpdateWrapper';

export function DataTableCategory({ data, segments, status = 200 }) {
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
      accessorFn: (row) => row?.segmentId?.nombre,
      id: 'segmentName',
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
        const categoryData = row.original;

        const router = useRouter();

        const [isOpenDialogDeleteCategory, setIsOpenDialogDeleteCategory] =
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

              <DropdownMenuItem onClick={(e) => e.preventDefault()} className>
                <Sheet className="w-full h-full">
                  <SheetTrigger className="w-full h-full text-start cursor-pointer">
                    Detalle
                  </SheetTrigger>
                  <CategoryDetail categoryData={categoryData} />
                </Sheet>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                <SheetUpdateWrapper
                  segments={segments}
                  categoryData={categoryData}
                />
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setIsOpenDialogDeleteCategory(true)}
              >
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
            <DeleteCategoryAlert
              isOpen={isOpenDialogDeleteCategory}
              setIsOpen={setIsOpenDialogDeleteCategory}
              actionAfterComplete="refresh"
              id={categoryData._id}
            />
          </DropdownMenu>
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

  const TIME_DEBOUNCE = 300;

  const debouncedSearch = useDebouncedCallback((value) => {
    table.getColumn('nombre')?.setFilterValue(value);
  }, TIME_DEBOUNCE);

  useEffect(() => {
    debouncedSearch(searchValue);
  }, [searchValue, debouncedSearch]);

  // table.getColumn('rol').getIsVisible();

  useEffect(() => {
    if (status !== 200) {
      toast.error(
        'No podemos conectarnos al servidor en este momento. Verifica tu conexión a internet o inténtalo nuevamente en unos minutos. Si el error persiste, ponte en contacto con Christian.',
        { duration: 10000 }
      );
    }
  }, [status]);

  useEffect(() => {
    // Fuerza la actualización de los datos cada vez que se accede a la página
    router.refresh();
  }, [router]);

  /* Mobile */
  const isMobile = useIsMobile();
  useEffect(() => {
    if (isMobile) {
      table.getColumn('estado').toggleVisibility(false);
    } else {
      table.getColumn('estado').toggleVisibility(true);
    }
  }, [isMobile, table]);

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
