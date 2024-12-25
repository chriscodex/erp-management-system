'use client';

import { useState } from 'react';
import {
  RiArrowLeftLine,
  RiPulseLine,
  RiBox3Line,
  RiCoupon2Fill,
  RiCoupon2Line,
  RiImportFill,
  RiMotorbikeFill,
} from '@remixicon/react';
import { Info, Package, Save, Truck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { estadosMotos } from '@/app/inventario/motos/_services/helpers';
import { updateMotoFormSchema } from '@/app/inventario/motos/modelos/[modeloId]/unidades/[unidadId]/edit/_services/validations/updateMotoFormSchema';
import { updateMotoRequestClient } from '@/app/inventario/motos/modelos/[modeloId]/unidades/[unidadId]/edit/_services/requests';

export function UpdateMotoForm({ motoData, modelos, proveedores, almacenes }) {
  const router = useRouter();

  const updateForm = useForm({
    resolver: zodResolver(updateMotoFormSchema),
    defaultValues: {
      nombre: motoData?.nombre,
      descripcion: motoData?.descripcion,
      precioCompra: motoData?.precioCompra,
      precioVenta: motoData?.precioVenta,
      estadoTitle: motoData?.estado?.titulo,
      observacionesEstado: motoData?.estado?.observaciones,
      importado: motoData?.importado,
      modeloId: motoData?.modeloId?._id,
      proveedorId: motoData?.proveedorId?._id,
      almacenId: motoData?.almacenId?._id,
    },
  });

  const { handleSubmit, control, clearErrors, watch } = updateForm;

  const [formSubmitIsLoading, setFormSubmitIsLoading] = useState(false);

  // Manejo de formulario
  const onSubmit = handleSubmit(async () => {
    setFormSubmitIsLoading(true);

    // Obtener los valores actuales del formulario
    const currentValues = watch();

    // Comparar los valores actuales con los valores iniciales y construir un objeto con los cambios
    const DataToUpdate = Object.keys(currentValues).reduce(
      (datosCambiados, key) => {
        if (currentValues[key] !== updateForm.formState.defaultValues[key]) {
          datosCambiados[key] = currentValues[key];
        }
        return datosCambiados;
      },
      {}
    );

    if (Object.keys(DataToUpdate).length === 0) {
      toast.error('No se han realizado cambios.');
      setFormSubmitIsLoading(false);
      return;
    }

    delete DataToUpdate?.estadoTitle;
    delete DataToUpdate?.observacionesEstado;

    const objectForUpdate = {
      ...DataToUpdate,
      estado: {
        titulo: currentValues?.estadoTitle,
        observaciones: currentValues?.observacionesEstado,
      },
    };

    toast.promise(
      updateMotoRequestClient(
        motoData?._id,
        objectForUpdate,
        setFormSubmitIsLoading
      ),
      {
        loading: 'Actualizando...',
        success: () => {
          clearErrors();
          router.refresh();
          router.back();
          return `Datos actualizados correctamente`;
        },
        error: (error) => {
          setFormSubmitIsLoading(false);
          return error;
        },
      }
    );
  });

  return (
    <Form {...updateForm}>
      <form onSubmit={onSubmit} className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Detalles Básicos</h3>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <FormField
              control={control}
              name="modeloId"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <RiMotorbikeFill className="h-5 w-5" />
                    <FormLabel>Modelo</FormLabel>
                  </div>
                  <div className="relative">
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      disabled={formSubmitIsLoading}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full pl-2">
                          <SelectValue placeholder="Seleccione un modelo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {modelos?.map((modelo) => (
                          <SelectItem key={modelo?._id} value={modelo?._id}>
                            {modelo?.nombre}
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
              name="nombre"
              render={({ field }) => (
                <FormItem className="space-y-2 col-start-1">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <RiBox3Line className="h-5 w-5" />
                    <FormLabel>Nombre</FormLabel>
                  </div>
                  <div className="relative">
                    <FormControl>
                      <Input
                        className="pl-2"
                        autoComplete="off"
                        disabled={formSubmitIsLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="descripcion"
              render={({ field }) => (
                <FormItem className="space-y-2 col-start-1 md:col-span-2">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Info className="h-5 w-5" />
                    <FormLabel>Descripción (Opcional)</FormLabel>
                  </div>
                  <div className="relative">
                    <FormControl>
                      <Textarea
                        disabled={formSubmitIsLoading}
                        {...field}
                        placeholder="Escribe una descripción para el modelo aquí."
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold col-span-2">Estado</h3>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <FormField
              control={control}
              name="estadoTitle"
              render={({ field }) => (
                <FormItem className="space-y-2 md:col-span-1 col-span-2">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <RiPulseLine className="h-5 w-5" />
                    <FormLabel>Estado</FormLabel>
                  </div>
                  <div className="relative">
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      disabled={formSubmitIsLoading}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full pl-2">
                          <SelectValue placeholder="Seleccione un estado" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {estadosMotos.map((estado) => (
                          <SelectItem key={estado.id} value={estado.id}>
                            {estado.label}
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
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Info className="h-5 w-5" />
                    <FormLabel>Observaciones</FormLabel>
                  </div>
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

        <div className="space-y-4">
          <h3 className="text-lg font-semibold col-span-2">
            Precios y Proveedor
          </h3>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <FormField
              control={control}
              name="precioCompra"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <RiCoupon2Fill className="h-5 w-5" />
                    <FormLabel>Precio de compra por unidad</FormLabel>
                  </div>
                  <div className="relative">
                    <FormControl>
                      <Input
                        className="pl-2"
                        autoComplete="off"
                        type="number"
                        disabled={formSubmitIsLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="precioVenta"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <RiCoupon2Line className="h-5 w-5" />
                    <FormLabel>Precio de venta por unidad</FormLabel>
                  </div>
                  <div className="relative">
                    <FormControl>
                      <Input
                        className="pl-2"
                        autoComplete="off"
                        type="number"
                        disabled={formSubmitIsLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="proveedorId"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Truck className="h-5 w-5" />
                    <FormLabel>Proveedor</FormLabel>
                  </div>
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
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Package className="h-5 w-5" />
                    <FormLabel>Almacen</FormLabel>
                  </div>
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
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={control}
            name="importado"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start space-y-3">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <RiImportFill className="h-5 w-5" />
                  <FormLabel>Importado</FormLabel>
                </div>
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
        <div className="space-y-4">
          <div className="flex justify-end space-x-2 mt-4">
            <div className="flex space-x-2">
              <Button
                disabled={formSubmitIsLoading}
                onClick={(e) => {
                  e.preventDefault();
                  router.back();
                }}
                variant="outline"
              >
                <RiArrowLeftLine className="mr-2 h-4 w-4" />
                Cancelar
              </Button>
              <Button disabled={formSubmitIsLoading} onClick={onSubmit}>
                <Save className="mr-2 h-4 w-4" />
                Guardar Cambios
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
