'use client';

import { useEffect, useState, useRef } from 'react';
import { ArrowUpDown, Edit, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { RiDeleteBinLine } from '@remixicon/react';

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
import { getProductByCodeClientRequest } from '@/app/ventas/preventas/registrar/_services/requests';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { formatMoney, generarNumeroAleatorioSeisDigitos } from '@/lib/utils';
import { BadgeUnitProduct } from '@/app/inventario/productos/[id]/_components/badgeUnitProduct/badgeUnitProduct';
import { Label } from '@/components/ui/label';

export function ProductsPreventaTable({ productsVenta, setProductsVenta }) {
  const searchProductsInputRef = useRef(null);

  const updateRowValue = (internalId, key, value) => {
    setProductsVenta((prevData) =>
      prevData.map((row) =>
        row.internalId === internalId ? { ...row, [key]: value } : row
      )
    );
  };

  const deleteProduct = (internalId) => {
    setProductsVenta((prevData) => {
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
      accessorKey: 'precioVenta',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Precio de Venta
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const precioVenta = row.getValue('precioVenta');
        return <div className="text-start">S/. {formatMoney(precioVenta)}</div>;
      },
    },
    {
      id: 'actions',
      header: 'Acciones',
      cell: ({ row }) => {
        const productData = row.original;

        let estadoProducto = '';
        if (productData?.tipo === 'producto') {
          const unitProduct = productData?.unidades?.find(
            (unidad) => unidad?.code === productData?.code
          );

          if (unitProduct) {
            estadoProducto = unitProduct?.estado;
          }
        }

        const [tempPrice, setTempPrice] = useState(productData.precioVenta);

        // Función para manejar el cambio del input sin actualizar el estado global
        const handleTempPriceChange = (event) => {
          setTempPrice(event.target.value);
        };

        // Función para aplicar el cambio al estado global
        const handleApplyChange = () => {
          updateRowValue(
            productData.internalId,
            'precioVenta',
            parseFloat(tempPrice)
          );
        };

        return (
          <div className="flex items-center space-x-3">
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-pointer flex">
                    <Sheet>
                      <SheetTrigger className="text-start">
                        <Edit className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                      </SheetTrigger>
                      {row?.original?.modeloId ? (
                        <SheetContent>
                          <SheetHeader>
                            <SheetTitle>Moto {productData?.nombre}</SheetTitle>
                            <SheetDescription>
                              {productData?.code}
                            </SheetDescription>
                          </SheetHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-3 items-center gap-4">
                              <label className="col-span-1 text-left font-bold">
                                Nombre
                              </label>
                              <p className="col-span-2">
                                {productData?.nombre}
                              </p>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <label className="col-span-1 text-left font-bold">
                                Descripción
                              </label>
                              <p className="col-span-2">
                                {productData?.descripcion}
                              </p>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <label className="col-span-1 text-left font-bold">
                                Modelo
                              </label>
                              <p className="col-span-2">
                                {productData?.modeloId?.nombre}
                              </p>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <label className="col-span-1 text-left font-bold">
                                Marca
                              </label>
                              <p className="col-span-2">
                                {productData?.modeloId?.marcaId?.nombre}
                              </p>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <label className="col-span-1 text-left font-bold">
                                Categoría
                              </label>
                              <p className="col-span-2">
                                {productData?.modeloId?.categoryId?.nombre}
                              </p>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <label className="col-span-1 text-left font-bold">
                                Importado
                              </label>
                              <p className="col-span-2">
                                {productData?.importado === 'si' ? 'Si' : 'No'}
                              </p>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <label className="col-span-1 text-left font-bold">
                                Almacén
                              </label>
                              <p className="col-span-2">
                                {productData?.almacenId?.nombre}
                              </p>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <label className="col-span-1 text-left font-bold">
                                Estado
                              </label>
                              <div className="col-span-2">
                                {productData?.estado?.titulo ===
                                  'disponible' && (
                                  <BadgeUnitProduct variant="successTable">
                                    Disponible
                                  </BadgeUnitProduct>
                                )}
                                {productData?.estado?.titulo === 'reparado' && (
                                  <BadgeUnitProduct variant="blueTable">
                                    Reparado
                                  </BadgeUnitProduct>
                                )}
                                {productData?.estado?.titulo ===
                                  'desarmado' && (
                                  <BadgeUnitProduct variant="orangeTable">
                                    Desarmado
                                  </BadgeUnitProduct>
                                )}
                                {productData?.estado?.titulo === 'dañado' && (
                                  <BadgeUnitProduct variant="redTable">
                                    Dañado
                                  </BadgeUnitProduct>
                                )}
                              </div>
                            </div>
                            <div>
                              <label className="col-span-1 text-left font-bold">
                                Precio de venta
                              </label>
                              <div className="relative mt-1">
                                <p className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                  S/.
                                </p>
                                <Input
                                  id="sale-price"
                                  type="number"
                                  value={tempPrice}
                                  onChange={handleTempPriceChange}
                                  onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                      handleApplyChange(); // Llama a la función que guarda el cambio
                                    }
                                  }}
                                  className="pl-9"
                                  min={0}
                                  step={0.1}
                                />
                              </div>
                            </div>
                            <div className="flex justify-end">
                              <Button
                                variant="default"
                                onClick={handleApplyChange}
                              >
                                Guardar
                              </Button>
                            </div>
                          </div>
                        </SheetContent>
                      ) : (
                        <SheetContent>
                          <SheetHeader>
                            <SheetTitle>
                              Producto {productData?.nombre}
                            </SheetTitle>
                            <SheetDescription>
                              {productData?.code}
                            </SheetDescription>
                          </SheetHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-3 items-center gap-4">
                              <label className="col-span-1 text-left font-bold">
                                Nombre
                              </label>
                              <p className="col-span-2">
                                {productData?.nombre}
                              </p>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <label className="col-span-1 text-left font-bold">
                                Descripción
                              </label>
                              <p className="col-span-2">
                                {productData?.descripcion}
                              </p>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <label className="col-span-1 text-left font-bold">
                                Marca
                              </label>
                              <p className="col-span-2">
                                {productData?.marcaId?.nombre}
                              </p>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <label className="col-span-1 text-left font-bold">
                                Categoría
                              </label>
                              <p className="col-span-2">
                                {productData?.categoryId?.nombre}
                              </p>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <label className="col-span-1 text-left font-bold">
                                Importado
                              </label>
                              <p className="col-span-2">
                                {productData?.importado === 'si' ? 'Si' : 'No'}
                              </p>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <label className="col-span-1 text-left font-bold">
                                Almacén
                              </label>
                              <p className="col-span-2">
                                {productData?.almacenId?.nombre}
                              </p>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <label className="col-span-1 text-left font-bold">
                                Estado
                              </label>
                              <div className="col-span-2">
                                {estadoProducto === 'disponible' && (
                                  <BadgeUnitProduct variant="successTable">
                                    Disponible
                                  </BadgeUnitProduct>
                                )}
                                {estadoProducto === 'reparado' && (
                                  <BadgeUnitProduct variant="blueTable">
                                    Reparado
                                  </BadgeUnitProduct>
                                )}
                                {estadoProducto === 'desaparecido' && (
                                  <BadgeUnitProduct variant="orangeTable">
                                    Desaparecido
                                  </BadgeUnitProduct>
                                )}
                                {estadoProducto === 'dañado' && (
                                  <BadgeUnitProduct variant="redTable">
                                    Dañado
                                  </BadgeUnitProduct>
                                )}
                              </div>
                            </div>
                            <div>
                              <label className="col-span-1 text-left font-bold">
                                Precio de venta
                              </label>
                              <div className="relative mt-1">
                                <p className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                  S/.
                                </p>
                                <Input
                                  id="sale-price"
                                  type="number"
                                  value={tempPrice}
                                  onChange={handleTempPriceChange}
                                  onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                      handleApplyChange(); // Llama a la función que guarda el cambio
                                    }
                                  }}
                                  className="pl-9"
                                  min={0}
                                  step={0.1}
                                />
                              </div>
                            </div>
                            <div className="flex justify-end">
                              <Button
                                variant="default"
                                onClick={handleApplyChange}
                              >
                                Guardar
                              </Button>
                            </div>
                          </div>
                        </SheetContent>
                      )}
                    </Sheet>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Editar</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="cursor-pointer"
                    onClick={() => deleteProduct(productData?.internalId)}
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
  const handleAgregarProducto = async (event) => {
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

    const duplicado = productsVenta.some(
      (product) => product?.code === trimmedSearchValue
    );
    if (duplicado) {
      toast.error('El producto ya se encuentra en la lista');
      return;
    }

    setSearchProductIsLoading(true);

    // Toast para buscar producto
    toast.promise(
      getProductByCodeClientRequest(trimmedSearchValue, setSearchProductIsLoading),
      {
        loading: 'Buscando...',
        success: (response) => {
          console.log('RESPONSE', response);
          let tipo = '';
          if (response.modeloId) {
            tipo = 'moto';
          } else {
            tipo = 'producto';
          }
          setProductsVenta([
            ...productsVenta,
            {
              ...response,
              tipo: tipo,
              cantidad: 1,
              code: searchValue,
              numeracion: productsVenta.length + 1,
              internalId: generarNumeroAleatorioSeisDigitos(),
            },
          ]);
          setSearchValue('');
          if (searchProductsInputRef.current) {
            searchProductsInputRef.current.focus();
          }
          setSearchProductIsLoading(false);
          return `Producto agregado a la lista correctamente`;
        },
        error: (error) => {
          setSearchProductIsLoading(false);
          return error;
        },
      }
    );
  };

  const [totalPrecioVenta, setTotalPrecioVenta] = useState(0);

  useEffect(() => {
    console.log(productsVenta);
    const total = productsVenta.reduce((acc, product) => {
      return acc + product.precioVenta;
    }, 0);
    setTotalPrecioVenta(total);
  }, [productsVenta]);

  return (
    <div>
      {/* Input */}
      <div className="flex gap-2 items-center py-4 w-full">
        <Input
          ref={searchProductsInputRef}
          placeholder="Ingrese el código del producto o moto"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="max-w-sm"
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              handleAgregarProducto(event);
            }
          }}
        />
        <div>
          <Button
            type="button"
            disabled={searchProductIsLoading}
            onClick={(event) => handleAgregarProducto(event)}
          >
            Agregar
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
                  Sin productos.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="w-full flex justify-end mt-4">
        <Label className="font-bold">
          Total: S/. {formatMoney(totalPrecioVenta)}
        </Label>
      </div>
    </div>
  );
}
