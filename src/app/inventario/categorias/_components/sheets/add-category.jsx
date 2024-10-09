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
import { addCategorySchema } from '@/app/inventario/categorias/_services/validations/addCategorySchema.js';
import { Input } from '@/components/ui/input';
import { createCategory } from '@/app/inventario/categorias/_services/requests.js';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export function AddCategory({ categoryData }) {
  const router = useRouter();

  const addCategoryForm = useForm({
    resolver: zodResolver(addCategorySchema),
    defaultValues: {
      segmentId: categoryData?.segmentId,
      nombre: categoryData?.nombre,
      descripcion: categoryData?.descripcion,
    },
  });

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    control,
    clearErrors,
  } = addCategoryForm;

  const [formSubmitIsLoading, setFormSubmitIsLoading] = useState(false);

  // Manejo de formulario
  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    setFormSubmitIsLoading(true);

    // Toast promise para buscar una persona
    toast.promise(createCategory(data, setFormSubmitIsLoading), {
      loading: 'Creando...',
      success: () => {
        clearErrors();
        router.refresh();
        return `Categoría creada exitosamente`;
      },
      error: (error) => {
        setFormSubmitIsLoading(false);
        return error;
      },
    });
  });

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Agregar Categoría</SheetTitle>
        <SheetDescription>
          Complete los detalles para crear una nueva categoría.
        </SheetDescription>
      </SheetHeader>
      <Form {...addCategoryForm}>
        <form onSubmit={onSubmit} className="grid gap-4 py-4">
          <FormField
            control={control}
            name="nombre"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Nombre</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      placeholder="Nombre"
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
            name="nombre"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Nombre</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      placeholder="Nombre"
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
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </Form>
    </SheetContent>
  );
}
