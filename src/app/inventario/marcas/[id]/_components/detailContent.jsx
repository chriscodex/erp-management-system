"use client";

import {
  Tag,
  Calendar,
  Info,
  CheckCircle,
  XCircle,
  ActivityIcon,
} from "lucide-react";
import { RiMotorbikeLine, RiDropboxFill } from "@remixicon/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DetailDropdown } from "@/app/inventario/marcas/[id]/_components/detailDropdown";

export default function DetailContent({ marcaData, updatedAt }) {
  const router = useRouter();
  const { data: session } = useSession();
  const {
    _id: marcaId,
    nombre: marcaName,
    descripcion,
    estado,
    segmentId: { nombre: segmentName },
  } = marcaData;

  const isActive = estado === "activo";

  useEffect(() => {
    router.refresh();
  }, [router]);

  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">{marcaName}</CardTitle>
          {session?.user?.rol === "Administrador" && (
            <DetailDropdown marcaId={marcaId} />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Info className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Descripción:</span>
          </div>
          <p>{descripcion}</p>
          <Separator />
          <div className="flex items-center space-x-2">
            <Tag className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Segmento:</span>
            <Badge variant="outline" className="ml-2">
              {segmentName === "Motos" ? (
                <RiMotorbikeLine className="mr-1 h-4 w-4" />
              ) : (
                <RiDropboxFill className="mr-1 h-4 w-4" />
              )}
              {segmentName}
            </Badge>
          </div>
          <Separator />
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Última fecha de actualización:
            </span>
            <span>{updatedAt}</span>
          </div>
          <Separator />
          <div className="flex items-center space-x-2">
            <ActivityIcon className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Estado:</span>
            <Badge variant={isActive ? "success" : "error"}>
              {isActive ? (
                <CheckCircle className="mr-1 h-4 w-4" />
              ) : (
                <XCircle className="mr-1 h-4 w-4" />
              )}
              {isActive ? "Activo" : "Inactivo"}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
