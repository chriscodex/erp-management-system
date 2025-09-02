'use client';

import { User } from 'lucide-react';
import { RiFileListLine, RiFolderHistoryLine } from '@remixicon/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Label } from '@/components/ui/label';
import { columns } from '@/app/contactos/clientes/[id]/_components/ComprasPerUserTable/columns';
import { DataTableComprasPerUser } from '@/app/contactos/clientes/[id]/_components/ComprasPerUserTable/data-table';

export function DetailClienteContent({ clienteData, ventasHistoricasData }) {
  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardHeader className="flex flex-col gap-2 items-center justify-between space-y-0 pb-4 md:flex-row  ">
        <div className="flex items-center gap-2">
          <RiFileListLine className="h-9 w-9" />
          <Label className="sm:text-4xl text-xl font-bold">
            Detalle del cliente
          </Label>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2" />
              Información del Cliente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-y-2 gap-x-4">
              {clienteData?.tipo === 'persona' ? (
                <>
                  <p>
                    <strong>Nombre:</strong> {clienteData?.datos?.nombres}{' '}
                    {clienteData?.datos?.apellidos}
                  </p>
                  <p>
                    <strong>DNI:</strong> {clienteData?.datos?.dni}
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>Razón Social:</strong>{' '}
                    {clienteData?.datos?.razonSocial}
                  </p>
                  <p>
                    <strong>RUC:</strong> {clienteData?.datos?.ruc}
                  </p>
                  <p>
                    <strong>Representante Legal:</strong>{' '}
                    {clienteData?.datos?.representanteLegal}
                  </p>
                </>
              )}
              {clienteData?.datos?.direccion && (
                <p>
                  <strong>Dirección:</strong> {clienteData?.datos?.direccion}
                </p>
              )}
              {clienteData?.datos?.email && (
                <p>
                  <strong>Email:</strong> {clienteData?.datos?.email}
                </p>
              )}
              {clienteData?.datos?.celular && (
                <p>
                  <strong>Celular:</strong> {clienteData?.datos?.celular}
                </p>
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
            <DataTableComprasPerUser
              columns={columns}
              data={ventasHistoricasData}
            />
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
