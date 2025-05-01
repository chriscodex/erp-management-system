'use client';

import { useRef, useState } from 'react';
import { ArrowUpDown, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { RiDeleteBinLine, RiFileListLine } from '@remixicon/react';

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
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
import { Button } from '@/components/ui/button';
import { getObsequioByCodeClientRequest } from '@/app/ventas/preventas/registrar/_services/requests';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { generarNumeroAleatorio, generarNumeroAleatorioSeisDigitos } from '@/lib/utils';
import { BadgeUnitProduct } from '@/app/inventario/productos/[id]/_components/badgeUnitProduct/badgeUnitProduct';

export function ObsequiosPreventaTable({
  obsequiosPreventa,
  setObsequiosPreventa,
}) {
  const searchObsequiosInputRef = useRef(null);

  const deleteObsequio = (internalId) => {
    setObsequiosPreventa((prevData) => {
      // Filtra el producto a eliminar
      const updatedData = prevData.filter((row) => row.internalId !== internalId);
  
      // Reasigna la numeración
      return updatedData.map((row, index) => ({
        ...row,
        numeracion: index + 1, // Actualiza la numeración basada en el índice
      }));
    });
  };

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
        const obsequioData = row.original;

        let estadoObsequio = '';
        const unitProduct = obsequioData?.unidades?.find(
          (unidad) => unidad?.code === obsequioData?.code
        );

        if (unitProduct) {
          estadoObsequio = unitProduct?.estado;
        }

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
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle>
                            Obsequio {obsequioData?.nombre}
                          </SheetTitle>
                          <SheetDescription>
                            {obsequioData?.code}
                          </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-3 items-center gap-4">
                            <label className="col-span-1 text-left font-bold">
                              Nombre
                            </label>
                            <p className="col-span-2">{obsequioData?.nombre}</p>
                          </div>
                          <div className="grid grid-cols-3 items-center gap-4">
                            <label className="col-span-1 text-left font-bold">
                              Descripción
                            </label>
                            <p className="col-span-2">
                              {obsequioData?.descripcion}
                            </p>
                          </div>
                          <div className="grid grid-cols-3 items-center gap-4">
                            <label className="col-span-1 text-left font-bold">
                              Marca
                            </label>
                            <p className="col-span-2">
                              {obsequioData?.marcaId?.nombre}
                            </p>
                          </div>
                          <div className="grid grid-cols-3 items-center gap-4">
                            <label className="col-span-1 text-left font-bold">
                              Categoría
                            </label>
                            <p className="col-span-2">
                              {obsequioData?.categoryId?.nombre}
                            </p>
                          </div>
                          <div className="grid grid-cols-3 items-center gap-4">
                            <label className="col-span-1 text-left font-bold">
                              Importado
                            </label>
                            <p className="col-span-2">
                              {obsequioData?.importado === 'si' ? 'Si' : 'No'}
                            </p>
                          </div>
                          <div className="grid grid-cols-3 items-center gap-4">
                            <label className="col-span-1 text-left font-bold">
                              Almacén
                            </label>
                            <p className="col-span-2">
                              {obsequioData?.almacenId?.nombre}
                            </p>
                          </div>
                          <div className="grid grid-cols-3 items-center gap-4">
                            <label className="col-span-1 text-left font-bold">
                              Estado
                            </label>
                            <div className="col-span-2">
                              {estadoObsequio === 'disponible' && (
                                <BadgeUnitProduct variant="successTable">
                                  Disponible
                                </BadgeUnitProduct>
                              )}
                              {estadoObsequio === 'reparado' && (
                                <BadgeUnitProduct variant="blueTable">
                                  Reparado
                                </BadgeUnitProduct>
                              )}
                              {estadoObsequio === 'desaparecido' && (
                                <BadgeUnitProduct variant="orangeTable">
                                  Desaparecido
                                </BadgeUnitProduct>
                              )}
                              {estadoObsequio === 'dañado' && (
                                <BadgeUnitProduct variant="redTable">
                                  Dañado
                                </BadgeUnitProduct>
                              )}
                            </div>
                          </div>
                        </div>
                      </SheetContent>
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
                    onClick={() => deleteObsequio(obsequioData?.internalId)}
                  >
                    <RiDeleteBinLine className="w-5 h-5 text-red-500 hover:text-foreground" />
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

  /* Sorting */
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  const table = useReactTable({
    data: obsequiosPreventa,
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

  /* Agregar Obsequio */
  const [searchProductIsLoading, setSearchProductIsLoading] = useState(false);

  const handleAgregarObsequio = async (event) => {
    event.preventDefault();

    const trimmedSearchValue = searchValue.trim();

    if (!searchValue) {
      toast.error('Ingrese el codigo del producto');
      return;
    }
    if (searchValue.length < 13) {
      toast.error('El codigo debe tener 13 caracteres');
      return;
    }

    const duplicado = obsequiosPreventa.some(
      (obsequio) => obsequio?.code === trimmedSearchValue
    );
    if (duplicado) {
      toast.error('El obsequio ya se encuentra en la lista');
      return;
    }

    setSearchProductIsLoading(true);

    // Toast para buscar producto
    toast.promise(
      getObsequioByCodeClientRequest(trimmedSearchValue, setSearchProductIsLoading),
      {
        loading: 'Buscando...',
        success: (response) => {
          console.log('RESPONSE', response);
          setObsequiosPreventa([
            ...obsequiosPreventa,
            {
              ...response,
              cantidad: 1,
              code: searchValue,
              numeracion: obsequiosPreventa.length + 1,
              internalId: generarNumeroAleatorioSeisDigitos(),
            },
          ]);
          setSearchValue('');
          if (searchObsequiosInputRef.current) {
            searchObsequiosInputRef.current.focus();
          }
          console.log(obsequiosPreventa);
          return `Obsequio agregado a la lista correctamente`;
        },
        error: (error) => {
          setSearchProductIsLoading(false);
          return error;
        },
      }
    );
  };

  const handleAgregarSOAT = async () => {
    const duplicado = obsequiosPreventa.some(
      (obsequio) => obsequio?.nombre === 'SOAT'
    );
    if (duplicado) {
      toast.error('El obsequio ya se encuentra en la lista');
      return;
    }

    const soatCode = generarNumeroAleatorio(13)

    setObsequiosPreventa([
      ...obsequiosPreventa,
      {
        cantidad: 1,
        code: soatCode,
        nombre: 'SOAT',
        descripcion: 'Seguro Obligatorio de Accidentes de Tránsito',
        estado: 'disponible',
        numeracion: obsequiosPreventa.length + 1,
      },
    ]);

    toast.success('SOAT agregado a la lista correctamente');
  };

  return (
    <div>
      {/* Input */}
      <div className="w-full flex justify-between py-4">
        <div className="flex gap-2 items-center w-full">
          <Input
            ref={searchObsequiosInputRef}
            placeholder="Ingrese el código del obsequio"
            value={searchValue}
            onChange={(e) => {
              const trimmedValue = e.target.value.trim();
              setSearchValue(trimmedValue);
            }}
            className="max-w-sm"
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                handleAgregarObsequio(event);
              }
            }}
          />
          <div>
            <Button
              type="button"
              disabled={searchProductIsLoading}
              onClick={(event) => handleAgregarObsequio(event)}
            >
              Agregar
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div>
          <Button
            type="button"
            variant="outline"
            disabled={searchProductIsLoading}
            onClick={(event) => handleAgregarSOAT(event)}
          >
            Agregar SOAT
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="rounded-md border w-auto">
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
                  Sin obsequios.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
