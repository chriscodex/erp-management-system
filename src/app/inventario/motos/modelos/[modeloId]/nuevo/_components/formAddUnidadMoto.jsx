'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { RiMotorbikeFill } from '@remixicon/react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
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
import { StringInputField } from '@/components/formInputs/StringInputField';
import { MoneyInputField } from '@/components/formInputs/MoneyInputField';
import { createUnidadMotoSchema } from '@/app/inventario/motos/modelos/[modeloId]/nuevo/_services/validations/createUnidadMotoSchema';
import { createUnidadMotoRequestClient } from '@/app/inventario/motos/modelos/[modeloId]/nuevo/_services/requests';
import { estadosMotos } from '@/app/inventario/motos/_services/helpers';

export function FormAddUnidadMoto({ proveedores, almacenes, modeloId }) {
  const router = useRouter();
  const addUnidadMotoForm = useForm({
    resolver: zodResolver(createUnidadMotoSchema),
    defaultValues: {
      nombre: '',
      descripcion: '',
      precioCompra: '',
      precioVenta: '',
      proveedorId: '',
      almacenId: almacenes[0]?._id,
      modeloId,
      importado: 'no',
      estadoTitle: estadosMotos[0]?.id,
      observacionesEstado: '',
    },
  });

  const { handleSubmit, control, clearErrors } = addUnidadMotoForm;

  // Estados de carga
  const [formSubmitIsLoading, setFormSubmitIsLoading] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    setFormSubmitIsLoading(true);

    // Toast promise para crear
    toast.promise(createUnidadMotoRequestClient(data, setFormSubmitIsLoading), {
      loading: 'Creando...',
      success: () => {
        clearErrors();
        router.push(`/inventario/motos/modelos/${modeloId}`);
        return `Moto creada correctamente`;
      },
      error: (error) => {
        setFormSubmitIsLoading(false);
        return error;
      },
    });
  });

  return (
    <Form {...addUnidadMotoForm}>
      <form onSubmit={onSubmit} className="space-y-8 mt-4">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Detalles Básicos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StringInputField
              control={control}
              name="nombre"
              title="Nombre"
              placeholder="Ingrese el nombre"
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
                        placeholder="Describa la unidad"
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
              title="Precio de compra"
              formSubmitIsLoading={formSubmitIsLoading}
            />
            <MoneyInputField
              control={control}
              name="precioVenta"
              title="Precio de venta"
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

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Estado</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control}
              name="estadoTitle"
              render={({ field }) => (
                <FormItem className="space-y-2 col-span-1">
                  <FormLabel>Estado</FormLabel>
                  <div className="relative">
                    <Select
                      defaultValue={estadosMotos[0]?.id}
                      onValueChange={field.onChange}
                      disabled={formSubmitIsLoading}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full pl-2">
                          <SelectValue placeholder="Seleccione un estado" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {estadosMotos?.map((estado) => (
                          <SelectItem key={estado?.id} value={estado?.id}>
                            {estado?.label}
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
              name="observacionesEstado"
              render={({ field }) => (
                <FormItem className="space-y-2 col-span-2">
                  <FormLabel>Observaciones</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Textarea
                        disabled={formSubmitIsLoading}
                        {...field}
                        placeholder="Observaciones con respecto al estado de la moto"
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
        <Button disabled={formSubmitIsLoading} type="submit" className="w-full">
          <RiMotorbikeFill className="mr-2 h-4 w-4" /> Agregar Moto
        </Button>
      </form>
    </Form>
  );
}
