'use client';

import { useState } from 'react';

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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

function FormNewUser() {
  const initialFormData = {
    dni: '',
    nombres: '',
    apellidos: '',
    celular: '',
    direccion: '',
    rol: 'Vendedor',
    password: '',
    isActive: true,
  };

  const { toast } = useToast();

  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value) => {
    setFormData((prev) => ({ ...prev, rol: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular una llamada a la API
    await new Promise((resolve) => setTimeout(resolve, 1500)); //eslint-disable-line

    // Simular una respuesta exitosa
    setIsLoading(false);
    toast(
      {
        title: 'Usuario creado',
        description: `Se ha creado el usuario ${formData.name} exitosamente.`,
      },
      { duration: 100 }
    );

    // Resetear el formulario
    // setFormData(initialFormData);
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dni">DNI</Label>
              <div className="relative">
                <IdCardIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="dni"
                  name="dni"
                  type="text"
                  placeholder="12345678"
                  value={formData.dni}
                  onChange={handleInputChange}
                  className="pl-8"
                  required
                  autoComplete="off"
                />
                <button
                  className="absolute right-3 top-1.5 h-4 w-4 text-muted-foreground cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log('DNI');
                  }}
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
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="nombres">Apellidos</Label>
              <div className="relative">
                <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="nombres"
                  name="nombres"
                  placeholder="Apellidos"
                  value={formData.nombres}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault(); // Evita el envío del formulario
                    }
                  }}
                  className="pl-8"
                  required
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="nombres">Nombres</Label>
              <div className="relative">
                <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="apellidos"
                  name="apellidos"
                  placeholder="Nombres"
                  value={formData.apellidos}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault(); // Evita el envío del formulario
                    }
                  }}
                  className="pl-8"
                  required
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="celular">Celular</Label>
              <div className="relative">
                <Phone className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="celular"
                  name="celular"
                  type="text"
                  placeholder="987654321"
                  value={formData.celular}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault(); // Evita el envío del formulario
                    }
                  }}
                  className="pl-8"
                  required
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="direccion">Dirección</Label>
              <div className="relative">
                <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="direccion"
                  name="direccion"
                  type="direccion"
                  placeholder="Av. Centenario 123"
                  value={formData.direccion}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault(); // Evita el envío del formulario
                    }
                  }}
                  className="pl-8"
                  required
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="rol">Rol</Label>
              <div className="relative">
                <Shield className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Select
                  onValueChange={handleRoleChange}
                  value={formData.rol}
                  required
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
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault(); // Evita el envío del formulario
                    }
                  }}
                  className="pl-8"
                  required
                  minLength={3}
                />
              </div>
            </div>
            <div className="space-y-2 w-full flex justify-end">
              <Button className="max-w-40" disabled={isLoading}>
                {isLoading ? (
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
