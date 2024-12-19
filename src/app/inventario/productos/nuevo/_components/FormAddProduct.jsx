'use client';

import { useState } from 'react';
import { Package } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { createProductSchema } from '@/app/inventario/productos/nuevo/_services/validations/createProductSchema';
import { NumberInputField } from '@/components/formInputs/NumberInputField';
import { StringInputField } from '@/components/formInputs/StringInputField';
import { MoneyInputField } from '@/components/formInputs/MoneyInputField';
import { createProductRequestClient } from '@/app/inventario/productos/nuevo/_services/requests';

export function FormAddProduct({
  categories,
  marcas,
  proveedores,
  almacenes,
}) {
  const router = useRouter();
  const addProductForm = useForm({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      categoryId: '',
      marcaId: '',
      nombre: '',
      descripcion: '',
      stock: '',
      stockMinimo: '',
      precioCompra: '',
      precioVenta: '',
      proveedorId: '',
      almacenId: almacenes[0]?._id,
      obsequio: 'no',
      importado: 'no',
    },
  });

  const { handleSubmit, control, clearErrors } = addProductForm;

  // Estados de carga
  const [formSubmitIsLoading, setFormSubmitIsLoading] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    setFormSubmitIsLoading(true);

    // Toast promise para crear
    toast.promise(createProductRequestClient(data, setFormSubmitIsLoading), {
      loading: 'Creando...',
      success: () => {
        clearErrors();
        router.push('/inventario/productos');
        return `Producto creado correctamente`;
      },
      error: (error) => {
        setFormSubmitIsLoading(false);
        return error;
      },
    });
  });

  return (
    <Form {...addProductForm}>
      <form onSubmit={onSubmit} className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Detalles básicos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control}
              name="categoryId"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Categoría</FormLabel>
                  <div className="relative">
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      disabled={formSubmitIsLoading}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full pl-2">
                          <SelectValue placeholder="Seleccione una categoría" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories?.map((category) => (
                          <SelectItem key={category?._id} value={category?._id}>
                            {category?.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="marcaId"
              render={({ field }) => (
                <FormItem className="space-y-2 md:col-span-1 col-span-2">
                  <FormLabel>Marca</FormLabel>
                  <div className="relative">
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      disabled={formSubmitIsLoading}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full pl-2">
                          <SelectValue placeholder="Seleccione una marca" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {marcas?.map((marca) => (
                          <SelectItem key={marca?._id} value={marca?._id}>
                            {marca?.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <StringInputField
              control={control}
              name="nombre"
              title="Nombre del Producto"
              placeholder="Ingrese el nombre del producto"
              formSubmitIsLoading={formSubmitIsLoading}
            />
            <FormField
              control={control}
              name="descripcion"
              render={({ field }) => (
                <FormItem className="space-y-2 col-span-2">
                  <FormLabel>Descripción (Opcional)</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Textarea
                        disabled={formSubmitIsLoading}
                        {...field}
                        placeholder="Describa el producto"
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Inventario</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NumberInputField
              control={control}
              name="stock"
              title="Stock"
              placeholder="Cantidad de unidades"
              formSubmitIsLoading={formSubmitIsLoading}
            />
            <FormField
              control={control}
              name="stockMinimo"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>
                    Stock mínimo{' '}
                    <span className="text-xs text-muted-foreground">
                      (Notificaciones)
                    </span>
                  </FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Stock mínimo"
                        className="pl-2"
                        autoComplete="off"
                        disabled={formSubmitIsLoading}
                        {...field}
                        onChange={(e) => {
                          // Filtramos cualquier valor que no sea un número
                          const value = e.target.value.replace(/[^0-9]/g, '');
                          field.onChange(value); // Actualizamos el valor del campo
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Precios y proveedor</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MoneyInputField
              control={control}
              name="precioCompra"
              title="Precio de compra por unidad"
              formSubmitIsLoading={formSubmitIsLoading}
            />
            <MoneyInputField
              control={control}
              name="precioVenta"
              title="Precio de venta por unidad"
              formSubmitIsLoading={formSubmitIsLoading}
            />
            <FormField
              control={control}
              name="proveedorId"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Proveedor</FormLabel>
                  <div className="relative">
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      disabled={formSubmitIsLoading}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full pl-2">
                          <SelectValue placeholder="Seleccione un proveedor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {proveedores?.map((proveedor) => (
                          <SelectItem
                            key={proveedor?._id}
                            value={proveedor?._id}
                          >
                            {proveedor?.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="almacenId"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Almacen</FormLabel>
                  <div className="relative">
                    <Select
                      defaultValue={almacenes[0]?._id}
                      onValueChange={field.onChange}
                      disabled={formSubmitIsLoading}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full pl-2">
                          <SelectValue placeholder="Seleccione un proveedor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {almacenes?.map((almacen) => (
                          <SelectItem key={almacen?._id} value={almacen?._id}>
                            {almacen?.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="obsequio"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start space-y-3">
                  <FormLabel>Obsequio</FormLabel>
                  <div className="flex space-x-2">
                    <div className="space-y-1 leading-none">
                      <FormLabel>No</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value === 'si'}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? 'si' : 'no')
                        }
                        disabled={formSubmitIsLoading}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Sí</FormLabel>
                    </div>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="importado"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start space-y-3">
                  <FormLabel>Importado</FormLabel>
                  <div className="flex space-x-2">
                    <div className="space-y-1 leading-none">
                      <FormLabel>No</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value === 'si'}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? 'si' : 'no')
                        }
                        disabled={formSubmitIsLoading}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Sí</FormLabel>
                    </div>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator />
        <Button disabled={formSubmitIsLoading} type="submit" className="w-full">
          <Package className="mr-2 h-4 w-4" /> Agregar Producto
        </Button>
      </form>
    </Form>
  );
}
