'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { updateCategoryRequestClient } from '@/app/inventario/categorias/_services/requests';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { updateUnitProductSchema } from '@/app/inventario/productos/[id]/_services/validations/updateUnitProductSchema';

export function UpdateUnitProductForm({
  unitProductData,
  productData,
  onClose,
}) {
  const router = useRouter();

  const updateUnitProductForm = useForm({
    resolver: zodResolver(updateUnitProductSchema),
    defaultValues: {
      estado: unitProductData?.estado,
    },
  });

  const {
    handleSubmit,
    control,
    clearErrors,
    watch,
    reset: resetForm,
  } = updateUnitProductForm;

  const [formSubmitIsLoading, setFormSubmitIsLoading] = useState(false);

  // Manejo de formulario
  const onSubmit = handleSubmit(async () => {
    setFormSubmitIsLoading(true);

    // Obtener los valores actuales del formulario
    const currentValues = watch();

    // Comparar los valores actuales con los valores iniciales y construir un objeto con los cambios
    const categoryDataToUpdate = Object.keys(currentValues).reduce(
      (datosCambiados, key) => {
        if (
          currentValues[key] !==
          updateUnitProductForm.formState.defaultValues[key]
        ) {
          datosCambiados[key] = currentValues[key];
        }
        return datosCambiados;
      },
      {}
    );

    categoryDataToUpdate.segmentId = watch('segmentId');

    if (Object.keys(categoryDataToUpdate).length === 0) {
      toast.error('No se han realizado cambios.');
      setFormSubmitIsLoading(false);
      return;
    }

    // Toast promise para buscar una persona
    toast.promise(
      updateCategoryRequestClient(
        productData?._id,
        categoryDataToUpdate,
        setFormSubmitIsLoading
      ),
      {
        loading: 'Actualizando...',
        success: () => {
          clearErrors();
          resetForm();
          onClose();
          router.refresh();
          return `Categoría actualizada exitosamente`;
        },
        error: (error) => {
          setFormSubmitIsLoading(false);
          return error;
        },
      }
    );
  });

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>{productData?.nombre}</SheetTitle>
        <SheetDescription>{productData?.descripcion}</SheetDescription>
      </SheetHeader>
      <Form {...updateUnitProductForm}>
        <form onSubmit={onSubmit} className="grid gap-4 py-4">
          <FormField
            control={control}
            name="estado"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Estado</FormLabel>
                <div className="relative">
                  <Select
                    defaultValue={unitProductData?.estado}
                    onValueChange={field.onChange}
                    disabled={formSubmitIsLoading}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full pl-2">
                        <SelectValue placeholder="Seleccione un estado" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="disponible">Disponible</SelectItem>
                      <SelectItem value="dañado">Dañado</SelectItem>
                      <SelectItem value="reparado">Reparado</SelectItem>
                      <SelectItem value="desaparecido">Desaparecido</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <SheetFooter>
            <SheetClose asChild>
              <Button disabled={formSubmitIsLoading} onClick={onSubmit}>
                Actualizar
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </Form>
    </SheetContent>
  );
}
