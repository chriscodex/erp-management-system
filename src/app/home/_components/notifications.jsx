"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  X,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  getNotificacionesForHomeRequestClient,
  removeNotificacionTemporallyForHomeRequestClient,
} from "@/app/home/_services/requests";
import { formatDateShort } from "@/lib/formateador";

export function Notifications() {
  const [notifications, setNotifications] = useState([]);

  //Para manejar el loader
  const [isLoading, setIsLoading] = useState(true);

  //Para manejar el sheet de las notificaciones
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const totalCount = notifications.length;

  console.log("Notifications", notifications);

  useEffect(() => {
    setIsLoading(true);
    getNotificacionesForHomeRequestClient()
      .then((data) => {
        setNotifications(data);
      })
      .catch((error) => {
        console.error("Error al cargar notificaciones:", error);
      })
      .finally(() => {
        // Finalizar la carga, independientemente del éxito o error
        setIsLoading(false);
      });
  }, []);

  const removeNotification = async (id) => {
    try {
      // Llamar al request para eliminar la notificación en el servidor
      await removeNotificacionTemporallyForHomeRequestClient(id);

      // Actualizar el estado local eliminando la notificación
      setNotifications((prev) =>
        prev.filter((notification) => notification._id !== id)
      );
    } catch (error) {
      console.error("Error al eliminar la notificación:", error);
    }
  };

  function getNotificationLink(notification) {
    switch (notification.type) {
      case "expired_pedido":
        return `/inventario/motos/pedidos/${notification?.data?.pedidoId}`;
      case "bike_needs":
        return `/inventario/motos/modelos/${notification?.data?.modeloId}/unidades/${notification?.data?.motoId}`;
      case "low_stock":
        return `/inventario/productos/${notification?.data?.productId}`;
      case "high_sales":
        return `/ventas/ventas-historicas`;
      default:
        return "#";
    }
  }
  const getNotificationIcon = (type) => {
    switch (type) {
      case "expired_pedido":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case "bike_needs":
        return <AlertTriangle className="h-4 w-4 text-purple-500" />;
      case "low_stock":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "high_sales":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-yellow-500" />;
    }
  };
  //   return (
  //     // <Card className="w-full max-w-md mx-auto">
  //     <Card className="w-full max-w-md mx-auto h-full flex flex-col border-none shadow-none">
  //       <CardHeader className="pb-2">
  //       {/* <CardHeader> */}
  //         <div className="flex items-center justify-between">
  //           <div className="flex items-center gap-2">
  //             <Bell className="h-5 w-5" />
  //             <CardTitle className="text-xl font-semibold">
  //               Notificaciones
  //             </CardTitle>
  //             {totalCount > 0 && (
  //               <Badge variant="destructive" className="ml-2">
  //                 {totalCount}
  //               </Badge>
  //             )}
  //           </div>
  //         </div>
  //       </CardHeader>
  //       <CardContent>
  //         <ScrollArea className="h-screen">
  //           <div className="space-y-3">
  //             {isLoading ? (
  //               // Contenido a mostrar mientras carga
  //               <div className="text-center py-8 text-gray-500">
  //                 <Loader2 className="h-12 w-12 mx-auto mb-4 animate-spin opacity-50" />
  //                 <p>Cargando notificaciones...</p>
  //               </div>
  //             ) : notifications.length === 0 ? (
  //               // Contenido si no hay notificaciones después de cargar
  //               <div className="text-center py-8 text-gray-500">
  //                 <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
  //                 <p>No tienes notificaciones</p>
  //               </div>
  //             ) : (
  //               // Contenido cuando las notificaciones se han cargado y hay datos
  //               [...notifications]
  //                 .sort((a, b) => b.id - a.id) // Asegúrate de que 'id' sea el campo correcto para ordenar
  //                 .map((notification) => (
  //                   <div
  //                     key={notification._id} // Usar _id para la key, ya que es el ID de MongoDB
  //                     className={cn(
  //                       "p-4 rounded-lg border transition-all duration-200 hover:shadow-md bg-gray-50",
  //                       "bg-gray-50"
  //                     )}
  //                   >
  //                     <div className="flex items-start gap-3">
  //                       <div className="flex-shrink-0 mt-1">
  //                         {getNotificationIcon(notification.type)}
  //                       </div>
  //                       <div className="flex-1 min-w-0">
  //                         <div className="flex items-start justify-between gap-2">
  //                           <div className="flex-1">
  //                             <Link href={getNotificationLink(notification)}>
  //                               <h4 className="text-sm font-medium flex items-center gap-2">
  //                                 {notification.title}
  //                                 <ExternalLink className="h-3 w-3" />
  //                               </h4>
  //                             </Link>
  //                             <p className="text-sm text-gray-600 mt-1">
  //                               {notification.message}
  //                             </p>
  //                             <p className="text-xs text-gray-400 mt-2">
  //                               {formatDateShort(notification.fecha, true)}
  //                             </p>
  //                           </div>
  //                           <div className="flex items-center gap-1">
  //                             <Button
  //                               variant="ghost"
  //                               size="sm"
  //                               onClick={() =>
  //                                 removeNotification(notification._id)
  //                               }
  //                               className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
  //                             >
  //                               <X className="h-4 w-4" />
  //                             </Button>
  //                           </div>
  //                         </div>
  //                       </div>
  //                     </div>
  //                   </div>
  //                 ))
  //             )}
  //           </div>
  //         </ScrollArea>
  //       </CardContent>
  //     </Card>
  //   );
  // }

  // Componente que renderiza el contenido de la Card de Notificaciones
  const NotificationsCardContent = () => (
    <Card className="w-full max-w-md mx-auto h-full flex flex-col border-none shadow-none">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
          ) : (
            <Bell className="h-5 w-5" />
          )}
          <CardTitle className="text-xl font-semibold">
            Notificaciones
          </CardTitle>
          {totalCount > 0 && !isLoading && (
            <Badge variant="destructive" className="ml-2">
              {totalCount}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full">
          <div className="space-y-3 p-4">
            {isLoading ? (
              <div className="text-center py-8 text-gray-500">
                <Loader2 className="h-12 w-12 mx-auto mb-4 animate-spin opacity-50" />
                <p>Cargando notificaciones...</p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No tienes notificaciones</p>
              </div>
            ) : (
              [...notifications]
                .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
                .map((notification) => (
                  <div
                    key={notification._id}
                    className={cn(
                      "p-4 rounded-lg border transition-all duration-200 hover:shadow-md",
                      "bg-gray-50"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <Link
                              href={getNotificationLink(notification)}
                              onClick={() => setIsSheetOpen(false)}
                            >
                              <h4 className="text-sm font-medium flex items-center align-middle gap-2">
                                {notification.title}
                                <ExternalLink className="h-3 w-3" />
                              </h4>
                            </Link>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                              {formatDateShort(notification.fecha, true)}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                removeNotification(notification._id)
                              }
                              className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );

  return (
    <>
      {/* Versión para pantallas pequeñas (bell icon que abre Sheet) */}
      {/* Visible solo en pantallas pequeñas */}
      <div className="xl:hidden">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              {isLoading ? (
                <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
              ) : (
                <Bell className="h-6 w-6" />
              )}
              {totalCount > 0 && !isLoading && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {totalCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-sm p-0">
            <NotificationsCardContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Versión para pantallas grandes (Card completa) */}
      {/* Visible solo en pantallas grandes */}
      <div className="hidden xl:block h-full">
        {" "}
        {/* h-full es importante para el sidebar fijo */}
        <NotificationsCardContent />
      </div>
    </>
  );
}
