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
import { ArrowUpDown, Plus } from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
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
import { Button } from '@/components/ui/button';
import { RiDeleteBinLine, RiFileListLine } from '@remixicon/react';
import { getProductByIdClientRequest } from '@/app/ventas/preventas/registrar/_services/requests';
import { toast } from 'sonner';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { UnitProductDetailForPreventa } from '@/app/ventas/preventas/registrar/_components/sheets/unitProductDetail';

export function ProductsPreventaTable({}) {
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
      accessorKey: 'cantidad',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Cantidad
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <div className="text-start">{row.getValue('cantidad')}</div>;
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
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-pointer flex">
                    <Sheet>
                      <SheetTrigger className="text-start">
                        <RiFileListLine className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                      </SheetTrigger>
                      <UnitProductDetailForPreventa
                        unitProductData={unitProductData}
                      />
                    </Sheet>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Detalle</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

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
          </div>
        );
      },
    },
  ];

  const [productsVenta, setProductsVenta] = useState([]);

  /* Sorting */
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  const table = useReactTable({
    data: productsVenta,
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

  /* Agregar Producto */
  const [searchProductIsLoading, setSearchProductIsLoading] = useState(false);
  const handleAgregarProducto = async () => {
    if (!searchValue) {
      toast.error('Ingrese el codigo del producto');
      return;
    }
    if (searchValue.length < 13) {
      toast.error('El codigo debe tener 13 caracteres');
      return;
    }

    setSearchProductIsLoading(true);

    // Toast promise para crear
    toast.promise(
      getProductByIdClientRequest(searchValue, setSearchProductIsLoading),
      {
        loading: 'Buscando...',
        success: (response) => {
          console.log('RESPONSE', response);
          setProductsVenta([
            ...productsVenta,
            {
              ...response,
              cantidad: 1,
              code: searchValue,
              numeracion: productsVenta.length + 1,
            },
          ]);
          console.log(productsVenta);
          return `Producto agregado a la lista correctamente`;
        },
        error: (error) => {
          setSearchProductIsLoading(false);
          return error;
        },
      }
    );
  };

  useEffect(() => {
    console.log(productsVenta);
  }, [productsVenta]);

  return (
    <div>
      {/* Input */}
      <div className="flex gap-2 items-center py-4 w-full">
        <Input
          placeholder="Ingrese el código"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="max-w-sm"
        />
        <div>
          <Button
            disabled={searchProductIsLoading}
            onClick={handleAgregarProducto}
          >
            Agregar
            <Plus className="h-4 w-4" />
          </Button>
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
