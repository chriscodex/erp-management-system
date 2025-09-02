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
import { Button } from '@/components/ui/button';
import { addUnitProductRequestClient } from '@/app/inventario/productos/[id]/_services/requests';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { onChangeNumero } from '@/components/formInputs/onChange';
import { addStockFormSchema } from '@/app/inventario/productos/[id]/_services/validations/addStockFormSchema';

export function AddStockProductForm({ productData, onClose }) {
  const router = useRouter();

  const addUnitsForm = useForm({
    resolver: zodResolver(addStockFormSchema),
  });

  const { handleSubmit, control, clearErrors, reset: resetForm } = addUnitsForm;

  const [formSubmitIsLoading, setFormSubmitIsLoading] = useState(false);

  // Manejo de formulario
  const onSubmit = handleSubmit(async (data) => {
    setFormSubmitIsLoading(true);

    // Obtener los valores actuales del formulario
    const cantidadAAgregar = parseInt(data.cantidad);

    if (cantidadAAgregar <= 0) {
      toast.error('La cantidad debe ser mayor a 0');
      setFormSubmitIsLoading(false);
      return;
    }

    // Toast promise para buscar una persona
    toast.promise(
      addUnitProductRequestClient(
        productData?._id,
        cantidadAAgregar,
        setFormSubmitIsLoading,
      ),
      {
        loading: 'Procesando...',
        success: () => {
          clearErrors();
          resetForm();
          onClose();
          router.refresh();
          return `Cantidad agregada correctamente`;
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
        <SheetTitle>Aumentar Stock</SheetTitle>
        <SheetDescription>Ingrese la cantidad a aumentar</SheetDescription>
      </SheetHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-3 items-center gap-4">
          <Label className="col-span-1 text-left">Código del producto</Label>
          <p className="col-span-2">{productData?.code}</p>
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label className="col-span-1 text-left">Stock actual</Label>
          <p className="col-span-2">{productData?.stock}</p>
        </div>
        <Form {...addUnitsForm}>
          <form onSubmit={onSubmit} className="grid gap-4">
            <FormField
              control={control}
              name="cantidad"
              render={({ field }) => (
                <FormItem className="space-y-2 grid grid-cols-3 items-center">
                  <FormLabel>Cantidad</FormLabel>
                  <div className="relative col-span-2">
                    <FormControl>
                      <Input
                        placeholder="Cantidad a aumentar"
                        className="pl-2"
                        autoComplete="off"
                        type="text"
                        disabled={formSubmitIsLoading}
                        {...field}
                        onChange={(e) => {
                          onChangeNumero(e, field);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <SheetFooter>
              <SheetClose asChild>
                <Button disabled={formSubmitIsLoading} onClick={onSubmit}>
                  Aumentar
                </Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </div>
    </SheetContent>
  );
}
