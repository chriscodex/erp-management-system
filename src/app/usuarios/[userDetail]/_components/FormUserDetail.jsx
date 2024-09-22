'use client';

import { useState } from 'react';

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
  User,
  Shield,
  Edit2,
  Phone,
  CreditCard,
  MapPin,
  ActivityIcon,
} from 'lucide-react';

import { CrearFullName } from '@/lib/formateador';

function FormUserDetail() {
  const initialUserDetails = {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'Admin',
    lastLogin: '2023-05-15 10:30',
    joinDate: '2022-01-15',
    totalLogins: 253,
    accountStatus: 'active',
    twoFactorEnabled: true,
    recentActivities: [
      'Changed password - 2023-05-10',
      'Updated profile picture - 2023-05-05',
      'Logged in from new device - 2023-05-01',
    ],
    nombres: 'Christian Espinoza',
    apellidos: 'Espinoza Cadillo',
    dni: '74062106',
    celular: '931140269',
    direccion: 'Jr. 9 de diciembre 686',
    estado: 'Activo',
    rol: 'Administrador',
  };

  const [isOpen, setIsOpen] = useState(false);

  const [userDetails, setUserDetails] = useState(initialUserDetails);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // En una aplicación real, aquí enviarías los datos actualizados al servidor
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
                src="/profile-placeholder.jpg"
                alt={userDetails.name}
              />
              <AvatarFallback>
                {userDetails.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">
                {CrearFullName(
                  userDetails.nombres,
                  userDetails.apellidos
                )}
              </CardTitle>
              <Badge variant="secondary" className="mt-1">
                {userDetails.rol}
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
                  <form
                    onSubmit={handleSave}
                    className="space-y-4 mt-4 mr-auto"
                  >
                    <div className="grid grid-cols-4 items-center gap-4">
                      <div className="flex gap-2 items-center justify-start">
                        <User className="h-4 w-4 opacity-70" />
                        <Label
                          htmlFor="nombre"
                          className="text-left font-semibold"
                        >
                          Nombre
                        </Label>
                      </div>
                      <Input
                        id="name"
                        value={userDetails.nombres}
                        onChange={(e) =>
                          setUserDetails({
                            ...userDetails,
                            nombre: e.target.value,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <div className="flex gap-2 items-center justify-start">
                        <User className="h-4 w-4 opacity-70" />
                        <Label
                          htmlFor="apellidos"
                          className="text-left font-semibold"
                        >
                          Apellidos
                        </Label>
                      </div>
                      <Input
                        id="apellidos"
                        value={userDetails.apellidos}
                        onChange={(e) =>
                          setUserDetails({
                            ...userDetails,
                            apellidos: e.target.value,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <div className="flex gap-2 items-center justify-start">
                        <CreditCard className="h-4 w-4 opacity-70" />
                        <Label
                          htmlFor="dni"
                          className="text-left font-semibold"
                        >
                          DNI
                        </Label>
                      </div>
                      <Input
                        id="name"
                        value={userDetails.dni}
                        onChange={(e) =>
                          setUserDetails({
                            ...userDetails,
                            name: e.target.value,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <div className="flex gap-2 items-center justify-start">
                        <Phone className="h-4 w-4 opacity-70" />
                        <Label
                          htmlFor="dni"
                          className="text-left font-semibold"
                        >
                          Celular
                        </Label>
                      </div>
                      <Input
                        id="name"
                        value={userDetails.celular}
                        onChange={(e) =>
                          setUserDetails({
                            ...userDetails,
                            name: e.target.value,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <div className="flex gap-2 items-center justify-start">
                        <MapPin className="h-4 w-4 opacity-70" />
                        <Label
                          htmlFor="dni"
                          className="text-left font-semibold"
                        >
                          Direccion
                        </Label>
                      </div>
                      <Input
                        id="name"
                        value={userDetails.direccion}
                        onChange={(e) =>
                          setUserDetails({
                            ...userDetails,
                            name: e.target.value,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <div className="flex gap-2 items-center justify-start">
                        <ActivityIcon className="h-4 w-4 opacity-70" />
                        <Label
                          htmlFor="dni"
                          className="text-left font-semibold"
                        >
                          Estado
                        </Label>
                      </div>
                      <Input
                        id="name"
                        value={userDetails.estado}
                        onChange={(e) =>
                          setUserDetails({
                            ...userDetails,
                            name: e.target.value,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
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
                ) : (
                  <div className="space-y-4 mt-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 opacity-70" />
                      <span className="font-semibold gap">Nombres:</span>{' '}
                      {userDetails.nombres}
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 opacity-70" />
                      <span className="font-semibold">Apellidos:</span>{' '}
                      {userDetails.apellidos}
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 opacity-70" />
                      <span className="font-semibold">DNI:</span>{' '}
                      {userDetails.dni}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 opacity-70" />
                      <span className="font-semibold">Celular:</span>{' '}
                      {userDetails.celular}
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 opacity-70" />
                      <span className="font-semibold">Dirección:</span>{' '}
                      {userDetails.direccion}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 opacity-70" />
                      <span className="font-semibold">Rol:</span>{' '}
                      {userDetails.role}
                    </div>
                    <div className="flex items-center space-x-2">
                      <ActivityIcon className="h-4 w-4 opacity-70" />
                      <span className="font-semibold">Estado:</span>{' '}
                      <Badge
                        variant="secondary"
                        className="mt-1 bg-green-600 text-white hover:bg-green-600"
                      >
                        {userDetails.estado}
                      </Badge>
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
                      <Shield className="h-4 w-4 opacity-70" />
                      <span className="font-semibold">
                        Estado de la cuenta:
                      </span>
                    </div>
                    <Badge variant="secondary">
                      {userDetails.accountStatus}
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
