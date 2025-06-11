"use client";

import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { DeleteMotoAlert } from "@/app/inventario/motos/modelos/[modeloId]/_components/dialogs/deleteUnidadMotoAlert";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export function DetailButtons({ motoId, modeloData }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [isOpenDialogDelete, setIsOpenDialogDelete] = useState(false);

  useEffect(() => {
    // Fuerza la actualización de los datos cada vez que se accede a la página
    router.refresh();
  }, [router]);

  if (session?.user?.rol !== "Administrador") return null;

  return (
    <>
      <div className="flex justify-end space-x-4">
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
