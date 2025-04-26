import { User, Hash } from 'lucide-react';
import { RiFileListLine, RiMotorbikeFill } from '@remixicon/react';


import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { formatDateLong } from '@/lib/formateador';
import { Label } from '@/components/ui/label';

import { DetailReservacionButtons } from '@/app/inventario/motos/reservaciones/[id]/_components/buttons/detailReservacionButtons';
import { EmitirConfirmacionReservacionButton } from '@/app/inventario/motos/reservaciones/[id]/_components/buttons/emitirConfirmacionReservacion';

export function DetailReservacionContent({ reservacionData }) {

  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardHeader className="flex lg:flex-row flex-col items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-2">
          <RiFileListLine className="h-9 w-9" />
          <Label className="sm:text-4xl text-xl font-bold">
            Detalle de la Reservación
          </Label>
        </div>
        <EmitirConfirmacionReservacionButton reservacionData={reservacionData} />
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2" />
                Información del Cliente
              </CardTitle>
            </CardHeader>
            {reservacionData?.cliente?.tipo === 'persona' ? (
              <CardContent>
                <div className="space-y-2">
                  <p>
                    <strong>DNI:</strong> {reservacionData?.cliente?.datos?.dni}
                  </p>
                  <p>
                    <strong>Nombre:</strong>{' '}
                    {reservacionData?.cliente?.datos?.nombres}{' '}
                    {reservacionData?.cliente?.datos?.apellidos}
                  </p>
                  <p>
                    <strong>Celular:</strong>{' '}
                    {reservacionData?.cliente?.datos?.celular}
                  </p>
                  <p>
                    <strong>Email:</strong>{' '}
                    {reservacionData?.cliente?.datos?.email}
                  </p>
                </div>
              </CardContent>
            ) : (
              <CardContent>
                <div className="space-y-2">
                  <p>
                    <strong>RUC:</strong> {reservacionData?.cliente?.datos?.ruc}
                  </p>
                  <p>
                    <strong>Razon Social:</strong>{' '}
                    {reservacionData?.cliente?.datos?.nombre}
                  </p>
                  <p>
                    <strong>Celular:</strong>{' '}
                    {reservacionData?.cliente?.datos?.celular}
                  </p>
                  <p>
                    <strong>Email:</strong>{' '}
                    {reservacionData?.cliente?.datos?.email}
                  </p>
                </div>
              </CardContent>
            )}
          </Card>
          <Card className="row-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Hash className="mr-2" />
                Detalles de la Reservación
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>
                  <strong>Pago Inicial:</strong> S/. {reservacionData?.pagoInicial}
                </p>
                <p>
                  <strong>Fecha Límite:</strong>{' '}
                  {formatDateLong(reservacionData?.fechaLimite, false)}
                  
                </p>
                <p>
                  <strong>Comentario:</strong> {reservacionData?.comentario}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <RiMotorbikeFill className="mr-2" />
                Detalles de la Moto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>
                  <strong>Nombre:</strong> {reservacionData?.moto?.nombre}
                </p>
                <p>
                  <strong>Descripción:</strong> {reservacionData?.moto?.descripcion}
                </p>
                <p>
                  <strong>Categoría:</strong> {reservacionData?.moto?.categoria?.nombre}
                </p>
                <p>
                  <strong>Marca:</strong> {reservacionData?.moto?.marca?.nombre}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        
        <div className="mt-4">
          <DetailReservacionButtons reservacionId={reservacionData._id} />
        </div>
      </CardContent>
    </Card>
  );
}
