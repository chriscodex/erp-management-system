"use client";

import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RiCheckboxCircleLine, RiEditFill } from "@remixicon/react";

import { Button } from "@/components/ui/button";

import { DeleteReservacionAlert } from "@/app/inventario/motos/reservaciones/_components/dialogs/DeleteReservacionAlert";

export function DetailReservacionButtons({ reservacionId }) {
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
            router.push(
              `/inventario/motos/reservaciones/${reservacionId}/edit`
            );
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
      <DeleteReservacionAlert
        isOpen={isOpenDialogDelete}
        setIsOpen={setIsOpenDialogDelete}
        reservacionId={reservacionId}
        actionAfterComplete="push"
      />
    </>
  );
}
