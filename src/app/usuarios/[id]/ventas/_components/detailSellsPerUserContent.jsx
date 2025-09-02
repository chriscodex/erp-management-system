'use client';
import {
  CalendarIcon,
  IdCardIcon,
  Mail,
  MapPin,
  Phone,
  User,
} from 'lucide-react';
import { RiFolderHistoryLine, RiShoppingCartLine } from '@remixicon/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDateLong } from '@/lib/formateador';
import { Label } from '@/components/ui/label';
import { columns } from '@/app/usuarios/[id]/ventas/_components/SellsPerUserTable/columns';
import { DataTableSellsPerUser } from '@/app/usuarios/[id]/ventas/_components/SellsPerUserTable/data-table';

export function DetailSellsPerUserContent({ userData, ventasHistoricasData }) {
  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardHeader className="flex flex-col gap-2 items-center justify-between space-y-0 pb-4 md:flex-row  ">
        <div className="flex items-center gap-2">
          <RiShoppingCartLine className="h-9 w-9" />
          <Label className="sm:text-4xl text-xl font-bold">
            Ventas realizadas
          </Label>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2" />
              <span className="mr-2">Información del Usuario</span>
              {userData?.rol === 'Vendedor' ? (
                <Badge variant="successTable" className="text-sm">
                  Vendedor
                </Badge>
              ) : (
                <Badge variant="error" className="text-sm">
                  Administrador
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-y-2 gap-x-4">
              {userData?.nombres && userData?.apellidos && (
                <div className="flex gap-2 items-center justify-start">
                  <User className="h-4 w-4" />
                  <p>
                    <strong>Nombre:</strong> {userData.nombres}{' '}
                    {userData.apellidos}
                  </p>
                </div>
              )}

              {userData?.dni && (
                <div className="flex gap-2 items-center justify-start">
                  <IdCardIcon className="h-4 w-4" />
                  <p>
                    <strong>DNI:</strong> {userData.dni}
                  </p>
                </div>
              )}

              {userData?.direccion && (
                <div className="flex gap-2 items-center justify-start">
                  <MapPin className="h-4 w-4" />
                  <p>
                    <strong>Dirección:</strong> {userData.direccion}
                  </p>
                </div>
              )}

              {userData?.email && (
                <div className="flex gap-2 items-center justify-start">
                  <Mail className="h-4 w-4" />
                  <p>
                    <strong>Email:</strong> {userData.email}
                  </p>
                </div>
              )}

              {userData?.celular && (
                <div className="flex gap-2 items-center justify-start">
                  <Phone className="h-4 w-4" />
                  <p>
                    <strong>Celular:</strong> {userData.celular}
                  </p>
                </div>
              )}

              {userData?.fechaIngreso && (
                <div className="flex gap-2 items-center justify-start">
                  <CalendarIcon className="h-4 w-4" />
                  <p>
                    <strong>Fecha de ingreso:</strong>{' '}
                    {formatDateLong(userData.fechaIngreso, false)}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <RiFolderHistoryLine className="mr-2" />
              <Label className="sm:text-2xl text-xl font-bold">
                Historial de ventas
              </Label>
            </div>
          </CardHeader>
          <CardContent>
            <DataTableSellsPerUser
              columns={columns}
              data={ventasHistoricasData}
            />
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
