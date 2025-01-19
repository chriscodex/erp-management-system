'use client';

import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

import { DeletePreventaAlert } from '@/app/ventas/preventas/[preventaId]/_components/dialogs/deletePreventaAlert';
import { RiEditFill } from '@remixicon/react';

export function DetailPreventaButtons({ preventaId }) {
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
            router.push(`/ventas/preventas/${preventaId}/edit`);
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
      <DeletePreventaAlert
        isOpen={isOpenDialogDelete}
        setIsOpen={setIsOpenDialogDelete}
        preventaId={preventaId}
        actionAfterComplete="push"
      />
    </>
  );
}
