"use client";

import { Button } from "@/components/ui/button";
import { RiFileList2Fill, RiCheckboxCircleLine } from "@remixicon/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { FinalizarReservacionAlert } from "@/app/inventario/motos/reservaciones/_components/dialogs/FinalizarReservacionAlert";

export function EmitirConfirmacionReservacionButton({ reservacionData }) {
  const router = useRouter();
  const [isOpenDialogDelete, setIsOpenDialogDelete] = useState(false);
  return (
    <>
      <div className="flex flex-row gap-2">
        <Button
          onClick={() => setIsOpenDialogDelete(true)}
          variant="outline"
          className="self-end flex items-center bg-green-600 hover:bg-green-700 text-white hover:text-white"
        >
          <RiCheckboxCircleLine className="mr-2 h-4 w-4" />
          Finalizar Reservación
        </Button>

        <Button
          variant="default"
          className="px-2"
          onClick={() =>
            router.push(`/reservaciones/${reservacionData?._id}/confirmacion`)
          }
        >
          <RiFileList2Fill className="h-4 w-4" />
          <span>Imprimir</span>
        </Button>
      </div>

      <FinalizarReservacionAlert
        isOpen={isOpenDialogDelete}
        setIsOpen={setIsOpenDialogDelete}
        reservacionId={reservacionData?._id}
        actionAfterComplete="push"
      />
    </>
  );
}
