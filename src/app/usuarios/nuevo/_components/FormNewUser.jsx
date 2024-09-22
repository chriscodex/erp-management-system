'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useToast } from '@/hooks/use-toast';
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

import { getDataByDni } from '@/app/usuarios/_services/requests';

// const FormSchema = z.object({
//   username: z.string().min(2, {
//     message: 'Username must be at least 2 characters.',
//   }),
// });

function FormNewUser() {
  const { toast } = useToast();
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
    toast(
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
    setSearchByDniIsLoading(true);
    e.preventDefault();
    const formState = watch();

    const dni = formState.dni;
    // if (!dni || dni.length !== 8) return;

    await new Promise((resolve) => setTimeout(resolve, 1500)); //eslint-disable-line
    const persona = await getDataByDni(dni);
    if (!persona) {
      toast(
        {
          title: 'Error',
          variant: 'destructive',
          description: `No se ha encontrado una persona con ese DNI`,
        },
        { duration: 100 }
      );
      setSearchByDniIsLoading(false);
      return;
    }
    toast(
      {
        description: 'Persona encontrada',
      }
    )
    setValue('apellidos', persona?.apellidosFormateados);
    setValue('nombres', persona?.nombresFormateados);
    setSearchByDniIsLoading(false);
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
                  type="number"
                  placeholder="DNI"
                  className="pl-8"
                  autoComplete="off"
                  {...register('dni', {
                    required: true,
                    // minLength: 8,
                    // maxLength: 8,
                  })}
                />
                <div
                  className="absolute right-3 top-1.5 h-4 w-4 text-muted-foreground cursor-pointer"
                  onClick={handleSearchByDni}
                  role="button"
                  type="button"
                >
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger>
                        <SearchIcon />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Busca por DNI</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
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
