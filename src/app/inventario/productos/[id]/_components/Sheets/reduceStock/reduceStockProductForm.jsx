'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
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
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { onChangeNumero } from '@/components/formInputs/onChange';
import { reduceStockFormSchema } from '@/app/inventario/productos/[id]/_services/validations/reduceStockFormSchema';
import { ReduceStockProductAlert } from '@/app/inventario/productos/[id]/_components/dialogs/reduceStockProductAlert';

export function ReduceStockProductForm({ productData, onClose }) {
  const reduceStockForm = useForm({
    resolver: zodResolver(reduceStockFormSchema),
  });

  const { handleSubmit, control } = reduceStockForm;

  const [formSubmitIsLoading, setFormSubmitIsLoading] = useState(false);

  const [isOpenDialog, setIsOpenDialog] = useState(false);

  // Manejo de formulario
  const onSubmit = handleSubmit(async (data) => {
    setFormSubmitIsLoading(true);

    // Obtener los valores actuales del formulario
    const cantidadADisminuir = parseInt(data.cantidad);
    console.log('Cantidad a disminuir:', cantidadADisminuir);

    if (cantidadADisminuir <= 0) {
      console.log(true);
      toast.error('La cantidad debe ser mayor a 0');
      setFormSubmitIsLoading(false);
      return;
    }

    if (cantidadADisminuir > productData?.stock) {
      toast.error('La cantidad a disminuir no puede ser mayor al stock actual');
      setFormSubmitIsLoading(false);
      return;
    }

    setIsOpenDialog(true);
    setFormSubmitIsLoading(false);
  });

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Disminuir Stock</SheetTitle>
        <SheetDescription>Ingrese la cantidad a disminuir</SheetDescription>
      </SheetHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-3 items-center gap-4">
          <Label className="col-span-1 text-left">Stock actual</Label>
          <p className="col-span-2">{productData?.stock}</p>
        </div>
        <Form {...reduceStockForm}>
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
                        placeholder="Cantidad a disminuir"
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
                  Disminuir
                </Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
        {/* Dialog Delete */}
        <ReduceStockProductAlert
          isOpenDialog={isOpenDialog}
          setIsOpenDialog={setIsOpenDialog}
          productId={productData?._id}
          cantidadADisminuir={parseInt(reduceStockForm.getValues('cantidad'))}
          setFormSubmitIsLoading={setFormSubmitIsLoading}
          onClose={onClose}
          stock={productData?.stock}
        />
      </div>
    </SheetContent>
  );
}
