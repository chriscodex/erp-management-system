'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
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
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { StringInputField } from '@/components/formInputs/StringInputField';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

import { createModeloSchema } from '@/app/inventario/motos/pedidos/_services/validations/createModeloSchema';
import { createModeloPedidoRequestClient } from '@/app/inventario/motos/pedidos/_services/requests';

import {} from '@remixicon/react';

export function AddModeloForm({
  onClose,
  categories = [],
  marcas = [],
  onAddModelo,
}) {
  // const router = useRouter();

  const addModeloForm = useForm({
    resolver: zodResolver(createModeloSchema),
    defaultValues: {
      categoryId: '',
      marcaId: '',
      nombre: '',
      descripcion: '',
      stockMinimo: '',
    },
  });

  const {
    handleSubmit,
    control,
    clearErrors,
    reset: resetForm,
  } = addModeloForm;

  const [formSubmitIsLoading, setFormSubmitIsLoading] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    setFormSubmitIsLoading(true);

    toast.promise(
      createModeloPedidoRequestClient(data, setFormSubmitIsLoading),
      {
        loading: 'Creando...',
        success: (nuevoModelo) => {
          if (nuevoModelo && onAddModelo) {
            onAddModelo(nuevoModelo);
          }
          clearErrors();
          resetForm();
          onClose();

          return 'Modelo pedido creado correctamente';
        },

        error: (error) => {
          console.error('❌ Error inesperado:', error);
          return typeof error === 'string'
            ? error
            : error?.message || 'Error desconocido';
        },
      },
    );
  });

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Agregar Modelo</SheetTitle>
        <SheetDescription>
          Complete los detalles del nuevo modelo
        </SheetDescription>
      </SheetHeader>
      <Form {...addModeloForm}>
        <form onSubmit={onSubmit} className="grid gap-4 py-4">
          <div className="space-y-4">
            <div className="flex flex-col gap-4">
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
                          {Array.isArray(categories) &&
                            categories.map((category) => (
                              <SelectItem
                                key={category?._id}
                                value={category?._id}
                              >
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
                  <FormItem className="space-y-2">
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
                          {Array.isArray(marcas) &&
                            marcas.map((marca) => (
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
                title="Nombre del Modelo"
                placeholder="Ingrese el nombre del modelo"
                formSubmitIsLoading={formSubmitIsLoading}
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
                          placeholder="Describa el modelo"
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
            <h3 className="text-lg font-semibold">Alertas</h3>
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={control}
                name="stockMinimo"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Stock mínimo</FormLabel>
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
          {/* <Button disabled={formSubmitIsLoading} type="submit" className="w-full">
          <RiMotorbikeFill className="mr-2 h-4 w-4" /> Agregar Modelo
        </Button> */}
          <SheetFooter>
            <SheetClose asChild>
              <div
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                role="button"
                type="submit"
                // disabled={formSubmitIsLoading}
                onClick={onSubmit}
              >
                Agregar Modelo
              </div>
            </SheetClose>
          </SheetFooter>
        </form>
      </Form>
    </SheetContent>
  );
}
