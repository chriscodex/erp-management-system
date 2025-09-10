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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { updateUnitProductFormSchema } from '@/app/inventario/productos/[id]/_services/validations/updateUnitProductSchema';
import { updateUnitProductRequestClient } from '@/app/inventario/productos/[id]/_services/requests';
import { Label } from '@/components/ui/label';

export function UpdateUnitProductForm({
  unitProductData,
  productData,
  onClose,
}) {
  const router = useRouter();

  const updateUnitProductForm = useForm({
    resolver: zodResolver(updateUnitProductFormSchema),
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
    const unitProductDataToUpdate = Object.keys(currentValues).reduce(
      (datosCambiados, key) => {
        if (
          currentValues[key] !==
          updateUnitProductForm.formState.defaultValues[key]
        ) {
          datosCambiados[key] = currentValues[key];
        }
        return datosCambiados;
      },
      {},
    );

    if (Object.keys(unitProductDataToUpdate).length === 0) {
      toast.error('No se han realizado cambios.');
      setFormSubmitIsLoading(false);
      return;
    }

    // Toast promise para buscar una persona
    toast.promise(
      updateUnitProductRequestClient(
        unitProductData?._id,
        unitProductDataToUpdate,
        setFormSubmitIsLoading,
      ),
      {
        loading: 'Actualizando...',
        success: () => {
          clearErrors();
          resetForm();
          onClose();
          router.refresh();
          return `Unidad de producto actualizada correctamente`;
        },
        error: (error) => {
          setFormSubmitIsLoading(false);
          return error;
        },
      },
    );
  });

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>{productData?.nombre}</SheetTitle>
        <SheetDescription>{productData?.descripcion}</SheetDescription>
      </SheetHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-3 items-center gap-4">
          <Label className="col-span-1">Código: </Label>
          <p className="col-span-2">{unitProductData?.code}</p>
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label className="col-span-1">Marca: </Label>
          <p className="col-span-2">{productData?.marcaId?.nombre}</p>
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label className="col-span-1">Categoría: </Label>
          <p className="col-span-2">{productData?.categoryId?.nombre}</p>
        </div>
        <Form {...updateUnitProductForm}>
          <form onSubmit={onSubmit} className="grid gap-4">
            <FormField
              control={control}
              name="estado"
              render={({ field }) => (
                <FormItem className="space-y-2 grid grid-cols-3">
                  <FormLabel className="col-span-1 flex items-center">
                    Estado
                  </FormLabel>
                  <div className="relative w-full col-span-2">
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
                        <SelectItem value="prevendido">Prevendido</SelectItem>
                        <SelectItem value="taller">Taller</SelectItem>
                        <SelectItem value="dañado">Dañado</SelectItem>
                        <SelectItem value="reparado">Reparado</SelectItem>
                        <SelectItem value="desaparecido">
                          Desaparecido
                        </SelectItem>
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
      </div>
    </SheetContent>
  );
}
