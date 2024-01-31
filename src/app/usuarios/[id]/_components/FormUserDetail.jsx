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
  Trash,
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
import { updateUserSchema } from '@/app/usuarios/[id]/_validations/updateUserSchema';
import { updatePasswordSchema } from '@/app/usuarios/[id]/_validations/updatePasswordSchema';
import { updateUserRequestClient } from '@/app/usuarios/[id]/_services/requests';
import { DeleteUserAlert } from '@/app/usuarios/_components/Dialog/DeleteUserAlert';
import { useRouter } from 'next/navigation';

function FormUserDetail({ userDetail }) {
  const router = useRouter();

  const [isEditUserOpen, setIsEditUserOpen] = useState(false);

  /* Formulario Setup */
  const formUserUpdate = useForm({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      dni: userDetail?.dni,
      apellidos: userDetail?.apellidos,
      nombres: userDetail?.nombres,
      celular: userDetail?.celular,
      direccion: userDetail?.direccion,
      rol: userDetail?.rol,
      estado: userDetail?.estado,
      password: '',
      confirmPassword: '',
    },
  });

  const {
    handleSubmit: handleSubmitUserUpdate,
    control: controlUserUpdate,
    clearErrors: clearErrorsUserUpdate,
    reset: resetUserUpdate,
  } = formUserUpdate;

  const [formUpdateUserSubmitIsLoading, setFormUpdateUserSubmitIsLoading] =
    useState(false);

  // Manejo de formulario
  const onUpdateUserSubmit = handleSubmitUserUpdate(async (submitFormData) => {
    setFormUpdateUserSubmitIsLoading(true);

    // Toast promise para buscar una persona
    toast.promise(
      updateUserRequestClient(submitFormData, setFormUpdateUserSubmitIsLoading),
      {
        loading: 'Actualizando...',
        success: () => {
          clearErrorsUserUpdate();
          setIsEditUserOpen(false);
          router.refresh();
          return `Datos del usuario actualizados exitosamente`;
        },
        error: (error) => {
          setFormUpdateUserSubmitIsLoading(false);
          return error;
        },
      }
    );
  });

  /* Handle Delete Dialog */
  const [isOpenDialogDeleteUser, setIsOpenDialogDeleteUser] = useState(false);

  /* Change Password */
  const [isUpdatePasswordOpen, setIsUpdatePasswordOpen] = useState(false);
  /* Update PasswordForm */
  const passwordForm = useForm({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      dni: userDetail?.dni,
      password: '',
      confirmPassword: '',
    },
  });

  const {
    handleSubmit: handlePasswordSubmit,
    control: controlPassword,
    clearErrors: clearPasswordErrors,
    reset: resetPasswordForm,
  } = passwordForm;

  // Manejo de formulario
  const onUpdatePasswordSubmit = handlePasswordSubmit(async (passwordForm) => {
    setFormUpdateUserSubmitIsLoading(true);
    setIsUpdatePasswordOpen(false);

    toast.promise(
      updateUserRequestClient(passwordForm, setFormUpdateUserSubmitIsLoading),
      {
        loading: 'Actualizando...',
        success: () => {
          clearPasswordErrors();
          resetPasswordForm();
          router.refresh();
          return `Contraseña actualizada exitosamente`;
        },
        error: (error) => {
          resetPasswordForm();
          setFormUpdateUserSubmitIsLoading(false);
          return error;
        },
      }
    );
  });

  const handleTabSecurity = () => {
    setIsEditUserOpen(false);
    router.refresh();
    resetUserUpdate();
  };

  const handleCancelUpdateUser = () => {
    setIsEditUserOpen(false);
    router.refresh();
    resetUserUpdate();
  };

  return (
    <>
      <div className="container mx-auto py-2">
        <Card className="w-full max-w-7xl mx-auto">
          {/* Header */}
          <CardHeader className="flex flex-row items-center space-x-4 pb-2 justify-between">
            {/* Avatar */}
            <div className="flex items-center space-x-4">
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
            </div>
            <Button
              className="bg-destructive text-destructive-foreground hover:bg-destructive/70"
              type="button"
              onClick={() => setIsOpenDialogDeleteUser(true)}
            >
              <Trash className="h-4 w-4" />
              Eliminar
            </Button>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="info">Información</TabsTrigger>
                <TabsTrigger onClick={handleTabSecurity} value="security">
                  Seguridad
                </TabsTrigger>
              </TabsList>
              <TabsContent value="info">
                {isEditUserOpen ? (
                  <Form {...formUserUpdate}>
                    <form
                      onSubmit={onUpdateUserSubmit}
                      className="space-y-4 mt-4 mr-auto"
                    >
                      <FormField
                        control={controlUserUpdate}
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
                                disabled={formUpdateUserSubmitIsLoading}
                                {...field}
                              />
                            </FormControl>
                            <span className="col-span-1"></span>
                            <FormMessage className="col-span-3 h-4" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={controlUserUpdate}
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
                                disabled={formUpdateUserSubmitIsLoading}
                                {...field}
                              />
                            </FormControl>
                            <span className="col-span-1"></span>
                            <FormMessage className="col-span-3 h-4" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={controlUserUpdate}
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
                                disabled={formUpdateUserSubmitIsLoading}
                                {...field}
                              />
                            </FormControl>
                            <span className="col-span-1"></span>
                            <FormMessage className="col-span-3 h-4" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={controlUserUpdate}
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
                                disabled={formUpdateUserSubmitIsLoading}
                                {...field}
                              />
                            </FormControl>
                            <span className="col-span-1"></span>
                            <FormMessage className="col-span-3 h-4" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={controlUserUpdate}
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
                                disabled={formUpdateUserSubmitIsLoading}
                                {...field}
                              />
                            </FormControl>
                            <span className="col-span-1"></span>
                            <FormMessage className="col-span-3 h-4" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={controlUserUpdate}
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
                                disabled={formUpdateUserSubmitIsLoading}
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
                        control={controlUserUpdate}
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
                                defaultValue={userDetail?.estado}
                                onValueChange={field?.onChange}
                                disabled={formUpdateUserSubmitIsLoading}
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
                        <Button
                          type="submit"
                          disabled={formUpdateUserSubmitIsLoading}
                        >
                          Guardar
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          disabled={formUpdateUserSubmitIsLoading}
                          onClick={handleCancelUpdateUser}
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
                    <Button
                      onClick={() => setIsEditUserOpen(true)}
                      className="mt-4"
                    >
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
                    {userDetail?.estado === 'activo' ? (
                      <Badge
                        variant="secondary"
                        className="mt-1 bg-green-600 text-white hover:bg-green-600"
                      >
                        Activo
                      </Badge>
                    ) : (
                      <Badge
                        variant="secondary"
                        className="mt-1 bg-red-600 text-white hover:bg-red-600"
                      >
                        Inactivo
                      </Badge>
                    )}
                  </div>
                  <Form {...passwordForm}>
                    <Dialog
                      open={isUpdatePasswordOpen}
                      onOpenChange={setIsUpdatePasswordOpen}
                    >
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
                        <form
                          onSubmit={onUpdatePasswordSubmit}
                          className="grid gap-4 py-4"
                        >
                          <FormField
                            control={controlPassword}
                            name="password"
                            className="grid grid-cols-4 items-center"
                            render={({ field }) => (
                              <FormItem className="col-span-4 items center">
                                <Label className="text-start">
                                  Nueva contraseña
                                </Label>
                                <FormControl>
                                  <Input
                                    id="name"
                                    type="password"
                                    className="col-span-3"
                                    autoComplete="off"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage className="col-span-3 h-4" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={controlPassword}
                            name="confirmPassword"
                            className="grid grid-cols-4 items-center"
                            render={({ field }) => (
                              <FormItem className="col-span-4 items center">
                                <Label className="text-start">
                                  Confirmar nueva contraseña
                                </Label>
                                <FormControl>
                                  <Input
                                    id="name"
                                    type="password"
                                    className="col-span-3"
                                    autoComplete="off"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage className="col-span-3 h-4" />
                              </FormItem>
                            )}
                          />
                          <span className="col-span-3"></span>
                          <DialogFooter>
                            <Button type="submit">Guardar</Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </Form>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        <DeleteUserAlert
          isOpen={isOpenDialogDeleteUser}
          setIsOpen={setIsOpenDialogDeleteUser}
          userDni={userDetail?.dni}
          actionAfterComplete="push"
        />
      </div>
    </>
  );
}

export { FormUserDetail };
