'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import {
  Loader2,
  User,
  Lock,
  Shield,
  MapPin,
  Phone,
  IdCardIcon,
  SearchIcon,
} from 'lucide-react';

import { newUserSchema } from '@/app/usuarios/nuevo/_validations/newUserSchema';
import { createUserRequestClient } from '@/app/usuarios/nuevo/_services/requests';
import { cn } from '@/lib/utils';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { buscarPorDniClientRequest } from '@/lib/globalRequests';
import {
  onChangeCelular,
  onChangeNumero,
} from '@/components/formInputs/onChange';

function FormNewUser() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(newUserSchema),
    defaultValues: {
      dni: '',
      apellidos: '',
      nombres: '',
      celular: '',
      direccion: '',
      password: '',
      confirmPassword: '',
      rol: 'Vendedor',
    },
  });

  const { handleSubmit, watch, setValue, control, clearErrors } = form;

  const formData = watch();

  // Estados de carga
  const [formSubmitIsLoading, setFormSubmitIsLoading] = useState(false);
  const [searchByDniIsLoading, setSearchByDniIsLoading] = useState(false);

  // Manejo de formulario
  const onSubmit = handleSubmit(async (data) => {
    setFormSubmitIsLoading(true);

    // Toast promise para buscar una persona
    toast.promise(createUserRequestClient(data, setFormSubmitIsLoading), {
      loading: 'Creando...',
      success: () => {
        clearErrors();
        router.push('/usuarios');
        return `Usuario creado correctamente`;
      },
      error: (error) => {
        setFormSubmitIsLoading(false);
        return error;
      },
    });
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
      toast.promise(buscarPorDniClientRequest(dni, setSearchByDniIsLoading), {
        loading: 'Buscando...',
        success: (persona) => {
          setValue('apellidos', persona?.apellidos);
          setValue('nombres', persona?.nombres);
          clearErrors('apellidos');
          clearErrors('nombres');
          return `Persona encontrada`;
        },
        error: (error) => {
          setSearchByDniIsLoading(false);
          return error;
        },
      });
    } catch (error) {
      setSearchByDniIsLoading(false);
      toast.error('Error al buscar persona por DNI');
      console.error('Error al buscar persona por DNI:', error);
    }
  };

  return (
    <Card className="w-full max-w-7xl mr-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Crear Nuevo Usuario</CardTitle>
        <CardDescription>
          Ingrese los datos del nuevo usuario para el sistema.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            <FormField
              control={control}
              name="dni"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>DNI</FormLabel>
                  <div className="relative">
                    <IdCardIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="DNI"
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

            <FormField
              control={control}
              name="celular"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Celular</FormLabel>
                  <div className="relative">
                    <Phone className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Input
                        placeholder="987654321"
                        className="pl-8"
                        autoComplete="off"
                        disabled={formSubmitIsLoading}
                        {...field}
                        onChange={(e) => {
                          onChangeCelular(e, field);
                        }}
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
                        placeholder="Av. Centenario 123"
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
              name="rol"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Rol</FormLabel>
                  <div className="relative">
                    <Shield className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      disabled={formSubmitIsLoading}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full pl-8">
                          <SelectValue placeholder="Seleccione un rol" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Vendedor">Vendedor</SelectItem>
                        <SelectItem value="Administrador">
                          Administrador
                        </SelectItem>
                        <SelectItem value="Tecnico">Técnico</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Contraseña</FormLabel>
                  <div className="relative">
                    <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••••"
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
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Confirmar Contraseña</FormLabel>
                  <div className="relative">
                    <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••••"
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
            <div className="space-y-2 w-full flex justify-end">
              <Button
                className="max-w-40"
                disabled={formSubmitIsLoading || searchByDniIsLoading}
                type="submit"
              >
                {formSubmitIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creando Usuario...
                  </>
                ) : (
                  'Crear Usuario'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export { FormNewUser };
