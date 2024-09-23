'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

import { BusquedaPorDni } from '@/lib/toastConfig';

// const FormSchema = z.object({
//   username: z.string().min(2, {
//     message: 'Username must be at least 2 characters.',
//   }),
// });

function FormNewUser() {
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      rol: 'Vendedor',
    },
  });

  const [formSubmitIsLoading, setFormSubmitIsLoading] = useState(false);
  const [searchByDniIsLoading, setSearchByDniIsLoading] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    setFormSubmitIsLoading(true);

    // Simular una llamada a la API
    await new Promise((resolve) => setTimeout(resolve, 1500)); //eslint-disable-line

    // Simular una respuesta exitosa
    setFormSubmitIsLoading(false);
    toast.success(
      {
        title: 'Usuario creado',
        description: `Se ha creado el usuario exitosamente.`,
      },
      { duration: 100 }
    );
  });

  /* Handle Rol Select */
  const selectedRole = watch('rol');

  const handleSearchByDni = async (e) => {
    e.preventDefault();
    try {
      setSearchByDniIsLoading(true);

      const formState = watch();
      const dni = formState.dni;
      if (!dni || dni.length !== 8) {
        setSearchByDniIsLoading(false);
        toast.error('Por favor, ingrese un DNI válido');
        return;
      }

      toast.promise(BusquedaPorDni(dni, setSearchByDniIsLoading), {
        loading: 'Buscando...',
        success: (persona) => {
          setValue('apellidos', persona?.apellidos);
          setValue('nombres', persona?.nombres);
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
    <div className="container mx-auto py-4">
      <Card className="w-full max-w-7xl mr-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Crear Nuevo Usuario</CardTitle>
          <CardDescription>
            Ingrese los datos del nuevo usuario para el sistema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dni">DNI</Label>
              <div className="relative">
                <IdCardIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="DNI"
                  className="pl-8"
                  autoComplete="off"
                  {...register('dni', {
                    required: true,
                    // minLength: 8,
                    // maxLength: 8,
                    pattern: /^[0-9]+$/,
                    disabled: searchByDniIsLoading,
                  })}
                />
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
            </div>
            <div className="space-y-2">
              <Label htmlFor="nombres">Apellidos</Label>
              <div className="relative">
                {searchByDniIsLoading ? (
                  <>
                    <Loader2 className="absolute left-2 top-2.5 h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                )}
                <Input
                  placeholder="Apellidos"
                  className="pl-8"
                  autoComplete="off"
                  {...register('apellidos', {
                    disabled: searchByDniIsLoading,
                  })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="nombres">Nombres</Label>
              <div className="relative">
                {searchByDniIsLoading ? (
                  <>
                    <Loader2 className="absolute left-2 top-2.5 h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                )}
                <Input
                  type="text"
                  placeholder="Nombres"
                  className="pl-8"
                  autoComplete="off"
                  {...register('nombres', {
                    disabled: searchByDniIsLoading,
                  })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="celular">Celular</Label>
              <div className="relative">
                <Phone className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="987654321"
                  className="pl-8"
                  autoComplete="off"
                  {...register('celular', {})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="direccion">Dirección</Label>
              <div className="relative">
                <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Av. Centenario 123"
                  className="pl-8"
                  autoComplete="off"
                  {...register('direccion', {})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="roles">Rol</Label>
              <div className="relative">
                <Shield className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Select
                  value={selectedRole}
                  onValueChange={(value) => setValue('rol', value)}
                >
                  <SelectTrigger className="w-full pl-8">
                    <SelectValue placeholder="Seleccione un rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Vendedor">Vendedor</SelectItem>
                    <SelectItem value="Administrador">Administrador</SelectItem>
                    <SelectItem value="Tecnico">Técnico</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="••••••••••"
                  className="pl-8"
                  autoComplete="off"
                  {...register('password', {})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Confirmar Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="••••••••••"
                  className="pl-8"
                  autoComplete="off"
                  {...register('confirmPassword', {})}
                />
              </div>
            </div>
            <div className="space-y-2 w-full flex justify-end">
              <Button
                className="max-w-40"
                disabled={formSubmitIsLoading}
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
        </CardContent>
      </Card>
    </div>
  );
}

export { FormNewUser };
