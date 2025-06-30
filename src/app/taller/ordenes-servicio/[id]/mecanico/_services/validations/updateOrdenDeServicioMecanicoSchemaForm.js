import { z } from "zod";

export const updateOrdenDeServicioMecanicoSchema = z.object({
    fechaEntregaEstimada: z
        .union([z.date(), z.string(), z.null()])
        .refine(
            (val) => {
                if (val === null) return false;
                if (typeof val === "string") {
                    const d = new Date(val);
                    return !isNaN(d.getTime());
                }
                return val instanceof Date && !isNaN(val.getTime());
            },
            {
                message: "Ingrese una fecha de entrega estimada",
            }
        )
        .transform((val) => (typeof val === "string" ? new Date(val) : val)),
    estado: z.enum(["pendiente", "diagnosticando", "esperando-repuestos", "en-reparacion", "en-mantenimiento", "finalizado", "entregado"], {
        message: "Seleccione un estado",
    }),
});
