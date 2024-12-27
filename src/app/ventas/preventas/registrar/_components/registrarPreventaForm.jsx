'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { IdCardIcon, Loader2, Save, SearchIcon, User } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { createMarcaSchema } from '@/app/inventario/marcas/nuevo/_services/validations/createMarcaSchema';
import { createMarcaRequestClient } from '@/app/inventario/marcas/nuevo/_services/requests.js';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { onChangeNumero } from '@/components/formInputs/onChange';

export function RegistrarPreventaForm({ segments }) {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(createMarcaSchema),
    defaultValues: {
      tipo: 'persona',
      segmentId: '',
      nombre: '',
      descripcion: '',
    },
  });

  const { handleSubmit, watch, control, clearErrors, setError } = form;

  const formData = watch();

  // Estados de carga
  const [formSubmitIsLoading, setFormSubmitIsLoading] = useState(false);
  const [searchByDniIsLoading, setSearchByDniIsLoading] = useState(false);

  // Manejo de formulario
  const onSubmit = handleSubmit(async (data) => {
    setFormSubmitIsLoading(true);

    // Toast promise para buscar una persona
    toast.promise(
      createMarcaRequestClient(data, setFormSubmitIsLoading, setError),
      {
        loading: 'Creando...',
        success: () => {
          clearErrors();
          router.push('/inventario/marcas');
          return `Marca creada correctamente`;
        },
        error: (error) => {
          setFormSubmitIsLoading(false);
          return error;
        },
      }
    );
  });

  // Busqueda por DNI
  const handleSearchByDni = async (e) => {
    e.preventDefault();
    try {
      setSearchByDniIsLoading(true);

      const dni = formData.dni;
      if (!dni || dni.length !== 8) {
        setSearchByDniIsLoading(false);
        toast.warning('Por favor, ingrese un DNI válido', {
          description: 'El DNI debe tener 8 dígitos',
        });
        return;
      }

      // Toast promise para buscar una persona
      // toast.promise(buscarPorDniClientRequest(dni, setSearchByDniIsLoading), {
      //   loading: 'Buscando...',
      //   success: (persona) => {
      //     setValue('apellidos', persona?.apellidos);
      //     setValue('nombres', persona?.nombres);
      //     clearErrors('apellidos');
      //     clearErrors('nombres');
      //     return `Persona encontrada`;
      //   },
      //   error: (error) => {
      //     setSearchByDniIsLoading(false);
      //     return error;
      //   },
      // });
    } catch (error) {
      setSearchByDniIsLoading(false);
      toast.error('Error al buscar persona por DNI');
      console.error('Error al buscar persona por DNI:', error);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={onSubmit} className="grid gap-4 py-4">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Información del Cliente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <FormField
                control={control}
                name="tipo"
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row space-x-4"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="persona" id="persona" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Persona Natural
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="empresa" id="empresa" />
                          </FormControl>
                          <FormLabel className="font-normal">Empresa</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="dni"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>
                      {watch('tipo') === 'persona' ? 'DNI' : 'RUC'}
                    </FormLabel>
                    <div className="relative">
                      <IdCardIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input
                          type="text"
                          placeholder={
                            watch('tipo') === 'persona' ? 'DNI' : 'RUC'
                          }
                          className="pl-8"
                          autoComplete="off"
                          disabled={searchByDniIsLoading || formSubmitIsLoading}
                          {...field}
                          onChange={(e) => {
                            onChangeNumero(e, field);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                      <div
                        className={cn(
                          'absolute right-3 top-1.5 h-auto w-auto text-muted-foreground',
                          searchByDniIsLoading
                            ? 'opacity-75 pointer-events-none'
                            : 'cursor-pointer'
                        )}
                        onClick={handleSearchByDni}
                      >
                        {searchByDniIsLoading ? (
                          <>
                            <Loader2 className="h-6 w-6 animate-spin " />
                          </>
                        ) : (
                          <TooltipProvider delayDuration={0}>
                            <Tooltip>
                              <TooltipTrigger>
                                <SearchIcon className="h-6 w-6" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Busca por DNI</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="apellidos"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Apellidos</FormLabel>
                    <div className="relative">
                      {searchByDniIsLoading ? (
                        <>
                          <Loader2 className="absolute left-2 top-2.5 h-4 w-4 animate-spin" />
                        </>
                      ) : (
                        <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      )}
                      <FormControl>
                        <Input
                          placeholder="Apellidos"
                          className="pl-8"
                          autoComplete="off"
                          disabled={searchByDniIsLoading || formSubmitIsLoading}
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
                name="nombres"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Nombres</FormLabel>
                    <div className="relative">
                      {searchByDniIsLoading ? (
                        <>
                          <Loader2 className="absolute left-2 top-2.5 h-4 w-4 animate-spin" />
                        </>
                      ) : (
                        <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      )}
                      <FormControl>
                        <Input
                          placeholder="Nombres"
                          className="pl-8"
                          autoComplete="off"
                          disabled={searchByDniIsLoading || formSubmitIsLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

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
          <div className="flex items-center justify-end space-x-2">
            <Button
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                router.push('/inventario/marcas');
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
                  Crear Marca
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
