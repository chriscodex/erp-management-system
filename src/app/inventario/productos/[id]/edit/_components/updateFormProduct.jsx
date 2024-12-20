'use client';

import { useState } from 'react';
import {
  RiAppsLine,
  RiArrowLeftLine,
  RiInstanceFill,
  RiPulseLine,
  RiNotification2Line,
  RiBox3Line,
  RiCoupon2Fill,
  RiCoupon2Line,
} from '@remixicon/react';
import { Info, Save } from 'lucide-react';
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
import { updateModeloRequestClient } from '@/app/inventario/motos/modelos/[modeloId]/edit/_services/requests';
import { updateModeloFormSchema } from '@/app/inventario/motos/modelos/[modeloId]/edit/_services/validations/updateModeloFormSchema';

export function UpdateFormProduct({ productData, marcas, categories }) {
  console.log(productData);
  const router = useRouter();

  const updateForm = useForm({
    resolver: zodResolver(updateModeloFormSchema),
    defaultValues: {
      nombre: productData?.nombre,
      descripcion: productData?.descripcion,
      precioCompra: productData?.precioCompra,
      precioVenta: productData?.precioVenta,
      stockMinimo: productData?.stockMinimo,
      estado: productData?.estado,
      marcaId: productData?.marcaId?._id,
      categoryId: productData?.categoryId?._id,
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

    // Toast promise para buscar una persona
    toast.promise(
      updateModeloRequestClient(
        productData?._id,
        DataToUpdate,
        setFormSubmitIsLoading
      ),
      {
        loading: 'Actualizando...',
        success: () => {
          clearErrors();
          // router.refresh();
          router.back();
          return `Modelo actualizado correctamente`;
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
        <FormField
          control={control}
          name="nombre"
          render={({ field }) => (
            <FormItem className="space-y-2">
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
            <FormItem className="space-y-2">
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
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
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
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={control}
            name="marcaId"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <RiInstanceFill className="h-5 w-5" />
                  <FormLabel>Marca</FormLabel>
                </div>
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
          <FormField
            control={control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <RiAppsLine className="h-5 w-5" />
                  <FormLabel>Categoría</FormLabel>
                </div>
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
        </div>
        <FormField
          control={control}
          name="estado"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <RiPulseLine className="h-5 w-5" />
                <FormLabel>Estado</FormLabel>
              </div>
              <div className="relative">
                <Select
                  defaultValue={productData?.estado}
                  onValueChange={field.onChange}
                  disabled={formSubmitIsLoading}
                >
                  <FormControl>
                    <SelectTrigger className="w-full pl-2">
                      <SelectValue placeholder="Seleccione un estado" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="activo">Activo</SelectItem>
                    <SelectItem value="inactivo">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="stockMinimo"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <RiNotification2Line className="h-5 w-5" />
                <FormLabel>Stock Mínimo (Notificaciones)</FormLabel>
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
