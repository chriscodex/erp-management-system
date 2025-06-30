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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import {
  getNotificacionesForHomeRequestClient,
  removeNotificacionTemporallyForHomeRequestClient,
} from "@/app/home/_services/requests";
import { formatDateShort } from "@/lib/formateador";

// Componente hijo que contiene solo la lista de notificaciones
function NotificationsList({
  notifications,
  isLoading,
  onRemoveNotification,
  onNotificationClick,
}) {
  const getNotificationLink = (notification) => {
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
  };

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

  if (isLoading) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Loader2 className="h-12 w-12 mx-auto mb-4 animate-spin opacity-50" />
        <p>Cargando notificaciones...</p>
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>No tienes notificaciones</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {[...notifications]
        .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
        .map((notification) => (
          <div
            key={notification._id}
            className={cn(
              "p-4 rounded-lg border transition-all duration-200 hover:shadow-md",
              "bg-gray-50 dark:bg-gray-900"
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
                      onClick={onNotificationClick}
                    >
                      <h4 className="text-sm font-medium flex items-center align-middle gap-2 hover:text-blue-600">
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
                      onClick={() => onRemoveNotification(notification._id)}
                      className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const totalCount = notifications.length;

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
        setIsLoading(false);
      });
  }, []);

  const removeNotification = async (id) => {
    try {
      await removeNotificacionTemporallyForHomeRequestClient(id);
      setNotifications((prev) =>
        prev.filter((notification) => notification._id !== id)
      );
    } catch (error) {
      console.error("Error al eliminar la notificación:", error);
    }
  };

  const handleNotificationClick = () => {
    setIsSheetOpen(false);
  };

  // Header compartido
  const notificationHeader = (
    <div className="flex items-center gap-2">
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
      ) : (
        <Bell className="h-5 w-5" />
      )}
      <CardTitle className="text-xl font-semibold">Notificaciones</CardTitle>
      {totalCount > 0 && !isLoading && (
        <Badge variant="destructive" className="ml-2">
          {totalCount}
        </Badge>
      )}
    </div>
  );

  return (
    <>
      {/* Versión móvil */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="relative xl:hidden">
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
          <Card className="w-full h-full flex flex-col border-none shadow-none">
            <CardHeader className="pb-2">{notificationHeader}</CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
              <ScrollArea className="h-full">
                <div className="p-4">
                  <NotificationsList
                    notifications={notifications}
                    isLoading={isLoading}
                    onRemoveNotification={removeNotification}
                    onNotificationClick={handleNotificationClick}
                  />
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </SheetContent>
      </Sheet>

      {/* Versión desktop */}
      <Card className="hidden xl:flex w-full max-w-sm mx-auto h-full flex-col border-none shadow-none">
        <CardHeader className="pb-2">{notificationHeader}</CardHeader>
        <CardContent className="flex-1 overflow-hidden p-0">
          <ScrollArea className="h-full">
            <div className="p-4">
              <NotificationsList
                notifications={notifications}
                isLoading={isLoading}
                onRemoveNotification={removeNotification}
                onNotificationClick={handleNotificationClick}
              />
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </>
  );
}
