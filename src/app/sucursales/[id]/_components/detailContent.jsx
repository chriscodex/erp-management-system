"use client";

import {
  Calendar,
  Phone,
  MapPin,
  Mail,
  Text,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DetailDropdown } from "@/app/sucursales/[id]/_components/detailDropdown";

export default function DetailContent({ sucursalData, updatedAt }) {
  const router = useRouter();

  const {
    _id: sucursalId,
    nombre: sucursalName,
    descripcion,
    direccion,
    telefono,
    email,
  } = sucursalData;

  useEffect(() => {
    router.refresh();
  }, [router]);

  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">{sucursalName}</CardTitle>
          <DetailDropdown sucursalId={sucursalId} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Text className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Descripción:</span>
          </div>
          <p>{descripcion}</p>
          <Separator />
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Dirección:</span>
          </div>
          <p>{direccion}</p>
          <Separator />
          <div className="flex items-center space-x-2">
            <Phone className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Teléfono:</span>
          </div>
          <p>{telefono}</p>
          <Separator />
          <div className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Correo electrónico:
            </span>
          </div>
          <p>{email}</p>
          <Separator />
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Última fecha de actualización:
            </span>
          </div>
          <p>{updatedAt}</p>
          {/* <Button onClick={() => setIsEditEmpresaOpen(true)} className="mt-4">
            <Edit2 className="h-4 w-4 mr-2" />
            Editar Información
          </Button> */}
        </div>
      </CardContent>
    </Card>
  );
}
