"use client";

import { ArrowUpDown, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { RiFileListLine } from "@remixicon/react";

export const columns = [
  {
    accessorKey: "Usuario",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Usuario
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => {
      console.log("asdasdasdasdasdasdas",row?.original)
      const nombres = row?.original?.nombres;
      const apellidos = row?.original?.apellidos;
      const fullname = `${nombres || ""} ${apellidos || ""}`.trim();

      return <div className="text-start">{fullname}</div>;
    },
  },
  {
    accessorKey: "rol",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rol
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "estado",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Estado
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-start">
          {row.getValue("estado") === "activo" ? (
            <Badge
              variant="successTable"
              className="text-sm w-[71px] flex justify-center"
            >
              Activo
            </Badge>
          ) : (
            <Badge variant="error" className="text-sm">
              Inactivo
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const { _id: id } = row.original;

      const router = useRouter();

      return (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="cursor-pointer flex"
                onClick={() => router.push(`/usuarios/${id}`)}
              >
                <RiFileListLine className="w-5 h-5 text-muted-foreground hover:text-foreground" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="flex items-center justify-center gap-1">
                Detalle
                <ExternalLink className="h-3 w-3" />
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
];
