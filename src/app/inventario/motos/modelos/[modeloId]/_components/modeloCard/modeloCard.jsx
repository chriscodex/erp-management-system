"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Package, Trash, Edit2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DeleteModeloAlert } from "@/app/inventario/motos/modelos/_components/Dialogs/DeleteModeloAlert";
import Link from "next/link";

export function ModeloCard({ modelo }) {
  const { data: session } = useSession();
  /* Manejar estado de eliminar el producto */
  const [isOpenDialogDeleteModelo, setIsOpenDialogDeleteModelo] =
    useState(false);

  return (
    <Card className="w-full max-w-7xl">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardDescription>Código: {modelo?.code}</CardDescription>
          </div>
          {/* Estado */}
          <div className="flex items-center space-x-2">
            <div
              className={`h-2 w-2 rounded-full ${
                modelo?.estado === "activo" ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <span
              className={`text-sm ${
                modelo?.estado === "activo" ? "text-green-600" : "text-red-500"
              }`}
            >
              {modelo?.estado === "activo" ? "Activo" : "Inactivo"}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 max-w-lg">
        {modelo?.descripcion && (
          <p className="text-sm text-muted-foreground">{modelo?.descripcion}</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <Package className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm">Marca: {modelo?.marcaId?.nombre}</span>
          </div>
          <div className="flex items-center">
            <Package className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm">
              Categoría: {modelo?.categoryId?.nombre}
            </span>
          </div>
        </div>
      </CardContent>
      {session?.user?.rol === "Administrador" && (
        <CardFooter className="grid grid-cols-2 gap-4">
          <Button
            className="w-full col-span-1 bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={() => setIsOpenDialogDeleteModelo(true)}
          >
            <Trash className="h-4 w-4" />
            Eliminar
          </Button>
          <Link href={`/inventario/motos/modelos/${modelo?._id}/edit`}>
            <Button className="w-full col-span-1" variant="outline">
              <Edit2 className="h-4 w-4 mr-2" />
              Editar
            </Button>
          </Link>
        </CardFooter>
      )}
      {/* Dialog Delete */}
      <DeleteModeloAlert
        isOpen={isOpenDialogDeleteModelo}
        setIsOpen={setIsOpenDialogDeleteModelo}
        id={modelo?._id}
        actionAfterComplete="push"
      />
    </Card>
  );
}
