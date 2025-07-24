"use client";

import {
  Calendar,
  Phone,
  MapPin,
  Mail,
  IdCardIcon,
  Text,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DetailDropdown } from "@/app/empresas/[id]/_components/detailDropdown";

export default function DetailContent({ empresaData, updatedAt }) {
  const router = useRouter();

  const {
    _id: empresaId,
    nombre: empresaName,
    ruc,
    descripcion,
    direccion,
    distrito,
    provincia,
    ubigeo,
    telefono,
    email,
  } = empresaData;

  useEffect(() => {
    router.refresh();
  }, [router]);

  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">{empresaName}</CardTitle>
          <DetailDropdown empresaId={empresaId} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <IdCardIcon className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">RUC:</span>
          </div>
          <p>{ruc}</p>
          <Separator />
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <span className="text-sm text-muted-foreground">Distrito:</span>
              <p>{distrito}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Provincia:</span>
              <p>{provincia}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Ubigeo:</span>
              <p>{ubigeo}</p>
            </div>
          </div>
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
