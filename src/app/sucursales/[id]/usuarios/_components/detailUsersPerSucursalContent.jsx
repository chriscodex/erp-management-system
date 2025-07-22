"use client";
import {
  Building,
  Text,
  Mail,
  MapPin,
  Phone,
  User2Icon,
} from "lucide-react";
import { RiBuilding4Line} from "@remixicon/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { columns } from "@/app/sucursales/[id]/usuarios/_components/UsersPerSucursalTable/columns";
import { DataTableUsersPerSucursal } from "@/app/sucursales/[id]/usuarios/_components/UsersPerSucursalTable/data-table";

export function DetailUsersPerSucursalContent({ sucursalData, usersData }) {
  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardHeader className="flex flex-col gap-2 items-center justify-between space-y-0 pb-4 md:flex-row  ">
        <div className="flex items-center gap-2">
          <User2Icon className="h-9 w-9" />
          <Label className="sm:text-4xl text-xl font-bold">Usuarios</Label>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <RiBuilding4Line className="mr-2" />
              <span className="mr-2">Información de la Sucursal</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-y-2 gap-x-4">
              {sucursalData?.nombre && (
                <div className="flex gap-2 items-center justify-start">
                  <Building className="h-4 w-4" />
                  <p>
                    <strong>Nombre:</strong> {sucursalData.nombre}
                  </p>
                </div>
              )}
              {sucursalData?.descripcion && (
                <div className="flex gap-2 items-center justify-start">
                  <Text className="h-4 w-4" />
                  <p>
                    <strong>Descripcion:</strong>
                    {sucursalData.descripcion}
                  </p>
                </div>
              )}
              {sucursalData?.direccion && (
                <div className="flex gap-2 items-center justify-start">
                  <MapPin className="h-4 w-4" />
                  <p>
                    <strong>Dirección:</strong> {sucursalData.direccion}
                  </p>
                </div>
              )}

              {sucursalData?.email && (
                <div className="flex gap-2 items-center justify-start">
                  <Mail className="h-4 w-4" />
                  <p>
                    <strong>Email:</strong> {sucursalData.email}
                  </p>
                </div>
              )}

              {sucursalData?.telefono && (
                <div className="flex gap-2 items-center justify-start">
                  <Phone className="h-4 w-4" />
                  <p>
                    <strong>Teléfono:</strong> {sucursalData.telefono}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <User2Icon className="mr-2" />
              <Label className="sm:text-2xl text-xl font-bold">
                Usuarios de la Sucursal
              </Label>
            </div>
          </CardHeader>
          <CardContent>
            <DataTableUsersPerSucursal columns={columns} data={usersData} />
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
