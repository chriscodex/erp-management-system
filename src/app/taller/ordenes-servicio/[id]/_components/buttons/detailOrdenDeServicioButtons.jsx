'use client';

import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { RiEditFill, RiStethoscopeLine } from '@remixicon/react';

import { Button } from '@/components/ui/button';

import { DeleteOrdenDeServicioAlert } from '@/app/taller/ordenes-servicio/[id]/_components/dialogs/deleteOrdenDeServicioAlert';

export function DetailOrdenDeServicioButtons({ ordenDeServicioId }) {
  const router = useRouter();
  const [isOpenDialogDelete, setIsOpenDialogDelete] = useState(false);

  useEffect(() => {
    // Fuerza la actualización de los datos cada vez que se accede a la página
    router.refresh();
  }, [router]);

  return (
    <>
      <div className="flex justify-end space-x-4">
        <Button
          onClick={() => {
            router.push(`/taller/ordenes-servicio/${ordenDeServicioId}/mecanico`);
          }}
          variant="outline"
          className="flex items-center"
        >
          <RiStethoscopeLine className="mr-2 h-4 w-4" />
          Agregar información (mecánico)
        </Button>
        <Button
          onClick={() => {
            router.push(`/taller/ordenes-servicio/${ordenDeServicioId}/edit`);
          }}
          variant="outline"
          className="flex items-center"
        >
          <RiEditFill className="mr-2 h-4 w-4" />
          Editar
        </Button>
        <Button
          variant="destructive"
          className="flex items-center"
          onClick={() => setIsOpenDialogDelete(true)}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Eliminar
        </Button>
      </div>
      {/* Dialog Delete */}
      <DeleteOrdenDeServicioAlert
        isOpen={isOpenDialogDelete}
        setIsOpen={setIsOpenDialogDelete}
        ordenDeServicioId={ordenDeServicioId}
        actionAfterComplete="push"
      />
    </>
  );
}
