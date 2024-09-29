'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  User,
  Shield,
  Edit2,
  Phone,
  MapPin,
  ActivityIcon,
  IdCardIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { CrearFullName } from '@/lib/formateador';
import { updateUserSchema } from '@/app/usuarios/[userDetail]/_validations/updateUserSchema';
import { updateUser } from '@/app/usuarios/[userDetail]/_services/requests';

function FormUserDetail({ userDetail }) {
  /* Formulario Setup */
  const form = useForm({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      dni: userDetail?.dni,
      apellidos: userDetail?.apellidos,
      nombres: userDetail?.nombres,
      celular: userDetail?.celular,
      direccion: userDetail?.direccion,
      rol: userDetail?.rol,
      estado: userDetail?.estado,
    },
  });

  const { handleSubmit, control, clearErrors } = form;

  const [formSubmitIsLoading, setFormSubmitIsLoading] = useState(false);

  // Manejo de formulario
  const onSubmit = handleSubmit(async (data) => {
    setFormSubmitIsLoading(true);

    // Toast promise para buscar una persona
    toast.promise(updateUser(data, setFormSubmitIsLoading), {
      loading: 'Actualizando...',
      success: () => {
        clearErrors();
        return `Usuario actualizado exitosamente`;
      },
      error: (error) => {
        setFormSubmitIsLoading(false);
        return error;
      },
    });
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <>
      <div className="container mx-auto py-2">
        <Card className="w-full max-w-7xl mx-auto">
          {/* Header */}
          <CardHeader className="flex flex-row items-center space-x-4 pb-2">
            {/* Avatar */}
            <Avatar className="h-20 w-20">
              <AvatarImage
                src="/avatars/avatar-default.jpg"
                alt={userDetail?.dni}
              />
              <AvatarFallback>
                {userDetail?.nombres
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">
                {CrearFullName(userDetail?.nombres, userDetail?.apellidos)}
              </CardTitle>
              <Badge variant="secondary" className="mt-1">
                {userDetail.rol}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="info">Información</TabsTrigger>
                <TabsTrigger value="security">Seguridad</TabsTrigger>
              </TabsList>
              <TabsContent value="info">
                {isEditing ? (
                  <Form {...form}>
                    <form
                      onSubmit={onSubmit}
                      className="space-y-4 mt-4 mr-auto"
                    >
                      <FormField
                        control={control}
                        name="apellidos"
                        className="w-full"
                        render={({ field }) => (
                          <FormItem className="grid grid-cols-4 items-center gap-x-4">
                            <div className="flex gap-2 items-center justify-start">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <Label
                                htmlFor="nombre"
                                className="text-left font-semibold text-base"
                              >
                                Apellidos
                              </Label>
                            </div>
                            <FormControl>
                              <Input
                                type="text"
                                className="col-span-3"
                                autoComplete="off"
                                disabled={formSubmitIsLoading}
                                {...field}
                              />
                            </FormControl>
                            <span className="col-span-1"></span>
                            <FormMessage className="col-span-3 h-4" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name="nombres"
                        className="w-full"
                        render={({ field }) => (
                          <FormItem className="grid grid-cols-4 items-center gap-x-4">
                            <div className="flex gap-2 items-center justify-start">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <Label
                                htmlFor="nombre"
                                className="text-left font-semibold text-base"
                              >
                                Nombres
                              </Label>
                            </div>
                            <FormControl>
                              <Input
                                type="text"
                                className="col-span-3"
                                autoComplete="off"
                                disabled={formSubmitIsLoading}
                                {...field}
                              />
                            </FormControl>
                            <span className="col-span-1"></span>
                            <FormMessage className="col-span-3 h-4" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name="dni"
                        className="w-full"
                        render={({ field }) => (
                          <FormItem className="grid grid-cols-4 items-center gap-x-4">
                            <div className="flex gap-2 items-center justify-start">
                              <IdCardIcon className="h-4 w-4 text-muted-foreground" />
                              <Label
                                htmlFor="nombre"
                                className="text-left font-semibold text-base"
                              >
                                DNI
                              </Label>
                            </div>
                            <FormControl>
                              <Input
                                type="text"
                                className="col-span-3"
                                autoComplete="off"
                                disabled={formSubmitIsLoading}
                                {...field}
                              />
                            </FormControl>
                            <span className="col-span-1"></span>
                            <FormMessage className="col-span-3 h-4" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name="celular"
                        className="w-full"
                        render={({ field }) => (
                          <FormItem className="grid grid-cols-4 items-center gap-x-4">
                            <div className="flex gap-2 items-center justify-start">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <Label
                                htmlFor="nombre"
                                className="text-left font-semibold text-base"
                              >
                                Celular
                              </Label>
                            </div>
                            <FormControl>
                              <Input
                                type="text"
                                className="col-span-3"
                                autoComplete="off"
                                disabled={formSubmitIsLoading}
                                {...field}
                              />
                            </FormControl>
                            <span className="col-span-1"></span>
                            <FormMessage className="col-span-3 h-4" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name="direccion"
                        className="w-full"
                        render={({ field }) => (
                          <FormItem className="grid grid-cols-4 items-center gap-x-4">
                            <div className="flex gap-2 items-center justify-start">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <Label
                                htmlFor="nombre"
                                className="text-left font-semibold text-base"
                              >
                                Dirección
                              </Label>
                            </div>
                            <FormControl>
                              <Input
                                type="text"
                                className="col-span-3"
                                autoComplete="off"
                                disabled={formSubmitIsLoading}
                                {...field}
                              />
                            </FormControl>
                            <span className="col-span-1"></span>
                            <FormMessage className="col-span-3 h-4" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={control}
                        name="rol"
                        render={({ field }) => (
                          <FormItem className="grid grid-cols-4 items-center gap-x-4">
                            <div className="flex gap-2 items-center justify-start">
                              <Shield className="h-4 w-4 text-muted-foreground" />
                              <FormLabel className="text-left font-semibold text-base">
                                Rol
                              </FormLabel>
                            </div>
                            <div className="relative">
                              <Select
                                defaultValue={field.value}
                                onValueChange={field.onChange}
                              >
                                <FormControl>
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Seleccione un rol" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Vendedor">
                                    Vendedor
                                  </SelectItem>
                                  <SelectItem value="Administrador">
                                    Administrador
                                  </SelectItem>
                                  <SelectItem value="Tecnico">
                                    Técnico
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={control}
                        name="estado"
                        render={({ field }) => (
                          <FormItem className="grid grid-cols-4 items-center gap-x-4">
                            <div className="flex gap-2 items-center justify-start">
                              <ActivityIcon className="h-4 w-4 text-muted-foreground" />
                              <FormLabel className="text-left font-semibold text-base">
                                Estado
                              </FormLabel>
                            </div>
                            <div className="relative">
                              <Select
                                defaultValue={field.value}
                                onValueChange={field.onChange}
                              >
                                <FormControl>
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Seleccione un estado" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="activo">Activo</SelectItem>
                                  <SelectItem value="inactivo">
                                    Inactivo
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                      <div className="flex justify-end space-x-2">
                        <Button type="submit">Guardar</Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancelar
                        </Button>
                      </div>
                    </form>
                  </Form>
                ) : (
                  <div className="space-y-8 mt-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">Apellidos:</span>{' '}
                      <span>{userDetail?.apellidos}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold gap">Nombres:</span>{' '}
                      <span>{userDetail?.nombres}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <IdCardIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">DNI:</span>{' '}
                      <span>{userDetail?.dni}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">Celular:</span>{' '}
                      <span>{userDetail?.celular}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">Dirección:</span>{' '}
                      <span>{userDetail?.direccion}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">Rol:</span>{' '}
                      <span>{userDetail?.rol}</span>
                    </div>
                    <Button onClick={handleEdit} className="mt-4">
                      <Edit2 className="h-4 w-4 mr-2" />
                      Editar Información
                    </Button>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="security">
                <div className="space-y-4 mt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <ActivityIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">
                        Estado de la cuenta:
                      </span>
                    </div>
                    <Badge
                      variant="secondary"
                      className="mt-1 bg-green-600 text-white hover:bg-green-600"
                    >
                      {userDetail?.estado ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </div>
                  <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                      <Button>Cambiar contraseña</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[625px]">
                      <DialogHeader>
                        <DialogTitle>Cambiar contraseña</DialogTitle>
                        <DialogDescription>
                          Asigne una nueva contraseña. Click en guardar al
                          finalizar.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center">
                          <Label htmlFor="name" className="text-start">
                            Nueva Contraseña
                          </Label>
                          <Input
                            id="name"
                            type="password"
                            className="col-span-3"
                            autoComplete="off"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center">
                          <Label htmlFor="username" className="text-start">
                            Repetir Nueva Contraseña
                          </Label>
                          <Input
                            id="username"
                            type="password"
                            className="col-span-3"
                            autoComplete="off"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" onClick={() => setIsOpen(false)}>
                          Guardar
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export { FormUserDetail };
