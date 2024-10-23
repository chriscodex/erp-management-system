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
import { addCategorySchema } from '@/app/inventario/categorias/_services/validations/addCategorySchema';
import { Input } from '@/components/ui/input';
import { createCategoryRequest } from '@/app/inventario/categorias/_services/requests';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function AddCategory({ segments, onClose }) {
  const router = useRouter();

  const addCategoryForm = useForm({
    resolver: zodResolver(addCategorySchema),
    defaultValues: {
      segmentId: '',
      nombre: '',
      descripcion: '',
    },
  });

  const {
    handleSubmit,
    control,
    clearErrors,
    reset: resetForm,
  } = addCategoryForm;

  const [formSubmitIsLoading, setFormSubmitIsLoading] = useState(false);

  // Manejo de formulario
  const onSubmit = handleSubmit(async (data) => {
    setFormSubmitIsLoading(true);

    // Toast promise para buscar una persona
    toast.promise(createCategoryRequest(data, setFormSubmitIsLoading), {
      loading: 'Creando...',
      success: () => {
        clearErrors();
        resetForm();
        onClose();
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
            name="descripcion"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Descripción (Opcional)</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Textarea
                      disabled={formSubmitIsLoading}
                      {...field}
                      placeholder="Escribe la descripción aquí."
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="segmentId"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Segmento</FormLabel>
                <div className="relative">
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    disabled={formSubmitIsLoading}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full pl-2">
                        <SelectValue placeholder="Seleccione un segmento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {segments?.map((segment) => (
                        <SelectItem key={segment?._id} value={segment?._id}>
                          {segment?.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <SheetFooter>
            <SheetClose asChild>
              <div
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                role="button"
                type="submit"
                disabled={formSubmitIsLoading}
                onClick={onSubmit}
              >
                Agregar
              </div>
            </SheetClose>
          </SheetFooter>
        </form>
      </Form>
    </SheetContent>
  );
}
