'use client';

import { Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { DeleteMotoAlert } from '@/app/inventario/motos/modelos/[modeloId]/_components/dialogs/deleteUnidadMotoAlert';
import { useState } from 'react';

export function DetailButtons({ motoId, modeloData }) {
  const [isOpenDialogDelete, setIsOpenDialogDelete] = useState(false);
  return (
    <>
      <div className="flex space-x-4">
        <Link
          href={`/inventario/motos/modelos/${modeloData?._id}/unidades/${motoId}/edit`}
          passHref
        >
          <Button variant="outline" className="flex items-center">
            <Pencil className="mr-2 h-4 w-4" />
            Editar
          </Button>
        </Link>
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
      <DeleteMotoAlert
        isOpen={isOpenDialogDelete}
        setIsOpen={setIsOpenDialogDelete}
        motoId={motoId}
        modeloId={modeloData?._id}
        actionAfterComplete="push"
      />
    </>
  );
}
