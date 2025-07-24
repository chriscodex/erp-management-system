'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Building, IdCardIcon, Mail, MapPin, Phone, Save, Text } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RiArrowLeftLine } from '@remixicon/react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { createEmpresaSchema } from '@/app/empresas/nuevo/_services/validations/createEmpresaSchema';
import { createEmpresaRequestClient } from '@/app/empresas/nuevo/_services/requests.js';

export function CreateFormEmpresa() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(createEmpresaSchema),
    defaultValues: {
      nombre: '',
      descripcion: '',
      direccion: '',
      distrito: '',
      provincia: '',
      ubigeo: '',
      ruc: '',
      telefono: '',
      email: '',
    },
  });

  const { handleSubmit, control, clearErrors, setError } = form;

  // Estados de carga
  const [formSubmitIsLoading, setFormSubmitIsLoading] = useState(false);

  // Manejo de formulario
  const onSubmit = handleSubmit(async (data) => {
    setFormSubmitIsLoading(true);

    // Toast promise para buscar una persona
    toast.promise(createEmpresaRequestClient(data, setFormSubmitIsLoading, setError), {
      loading: 'Creando...',
      success: () => {
        clearErrors();
        router.push('/empresas');
        return `Empresa creada correctamente`;
      },
      error: (error) => {
        setFormSubmitIsLoading(false);
        return error;
      },
    });
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-4">
          <FormField
            control={control}
            name="nombre"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Nombre</FormLabel>
                <div className="relative">
                <Building className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <FormControl>
                    <Input
                      placeholder="Razón social"
                      className="pl-8"
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
            name="ruc"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>RUC</FormLabel>
                <div className="relative">
                <IdCardIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <FormControl>
                    <Input
                      placeholder="RUC"
                      className="pl-8"
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
                <Text className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <FormControl>
                    <Textarea
                      className="pl-8"
                      disabled={formSubmitIsLoading}
                      {...field}
                      placeholder="Escribe la descripción aquí"
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="direccion"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Dirección</FormLabel>
                <div className="relative">
                  <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <FormControl>
                    <Input
                      placeholder="Dirección"
                      className="pl-8"
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={control}
              name="distrito"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Distrito</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Distrito"
                      autoComplete="off"
                      disabled={formSubmitIsLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="provincia"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Provincia</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Provincia"
                      autoComplete="off"
                      disabled={formSubmitIsLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="ubigeo"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Ubigeo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ubigeo (6 dígitos)"
                      autoComplete="off"
                      disabled={formSubmitIsLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={control}
            name="telefono"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Teléfono</FormLabel>
                <div className="relative">
                <Phone className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <FormControl>
                    <Input
                      placeholder="987654321"
                      className="pl-8"
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
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Correo electrónico</FormLabel>
                <div className="relative">
                <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <FormControl>
                    <Input
                      placeholder="correo@correo.com"
                      className="pl-8"
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

          <div className="flex items-center justify-end space-x-2">
            <Button
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                router.push('/empresas');
              }}
              disabled={formSubmitIsLoading}
            >
              <RiArrowLeftLine className="mr-2 h-4 w-4" />
              Cancelar
            </Button>
            <Button type="submit" disabled={formSubmitIsLoading}>
              {formSubmitIsLoading ? (
                'Creando...'
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Crear Empresa
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
