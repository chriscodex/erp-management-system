'use client';

import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { RiEditFill, RiStethoscopeLine } from '@remixicon/react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { Button } from '@/components/ui/button';

import { DeleteOrdenDeServicioAlert } from '@/app/taller/ordenes-servicio/[id]/_components/dialogs/deleteOrdenDeServicioAlert';

export function DetailOrdenDeServicioButtons({ ordenDeServicioId, disabled }) {
  console.log(disabled);

  const router = useRouter();
  const [isOpenDialogDelete, setIsOpenDialogDelete] = useState(false);

  useEffect(() => {
    // Fuerza la actualización de los datos cada vez que se accede a la página
    router.refresh();
  }, [router]);

  return (
    <TooltipProvider>
      <div className="flex justify-end space-x-4">
        {disabled ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Button
                  variant="outline"
                  className="flex items-center cursor-not-allowed opacity-80"
                  disabled
                >
                  <RiStethoscopeLine className="mr-2 h-4 w-4" />
                  Agregar información (mecánico)
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                No se puede modificar o eliminar la información de la orden de
                servicios si ya ha impreso su comprobante
              </p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <Button
            onClick={() =>
              router.push(
                `/taller/ordenes-servicio/${ordenDeServicioId}/mecanico`,
              )
            }
            variant="outline"
            className="flex items-center"
          >
            <RiStethoscopeLine className="mr-2 h-4 w-4" />
            Agregar información (mecánico)
          </Button>
        )}

        {/* Botón: Editar */}
        {disabled ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Button
                  variant="outline"
                  className="flex items-center cursor-not-allowed opacity-80"
                  disabled
                >
                  <RiEditFill className="mr-2 h-4 w-4" />
                  Editar
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                No se puede modificar o eliminar la información de la orden de
                servicios si ya ha impreso su comprobante
              </p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <Button
            onClick={() =>
              router.push(`/taller/ordenes-servicio/${ordenDeServicioId}/edit`)
            }
            variant="outline"
            className="flex items-center"
          >
            <RiEditFill className="mr-2 h-4 w-4" />
            Editar
          </Button>
        )}

        {/* Botón: Eliminar */}
        {disabled ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Button
                  variant="destructive"
                  className="flex items-center cursor-not-allowed opacity-80"
                  disabled
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Eliminar
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                No se puede modificar o eliminar la información de la orden de
                servicios si ya ha impreso su comprobante
              </p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <Button
            variant="destructive"
            className="flex items-center"
            onClick={() => setIsOpenDialogDelete(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Eliminar
          </Button>
        )}
      </div>

      {/* Dialog Delete */}
      <DeleteOrdenDeServicioAlert
        isOpen={isOpenDialogDelete}
        setIsOpen={setIsOpenDialogDelete}
        ordenDeServicioId={ordenDeServicioId}
        actionAfterComplete="push"
      />
    </TooltipProvider>
  );
}
