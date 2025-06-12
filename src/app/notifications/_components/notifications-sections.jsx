'use client';

import { useState } from 'react';
import { Bell, X, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

const initialNotifications = [
  {
    id: 1,
    title: 'Sistema actualizado correctamente',
    message: 'La actualización del sistema se completó sin errores',
    type: 'success',
    fecha: '11/06/2025',
    close: false,
    fechaClose: '12/06/2025',
  },
  {
    id: 2,
    title: 'Presupuesto excedido',
    message:
      'El producto "Laptop Dell" ha excedido el presupuesto mensual en un 15%',
    type: 'warning',
    fecha: '11/06/2025',
    close: false,
  },
  {
    id: 3,
    title: 'Error en el servidor',
    message: 'Se detectó un error crítico en el servidor de base de datos',
    type: 'error',
    fecha: '11/06/2025',
  },
  {
    id: 4,
    title: 'Límite de almacenamiento próximo',
    message: 'El espacio de almacenamiento está al 85% de su capacidad',
    type: 'warning',
    fecha: '11/06/2025',
  },
  {
    id: 5,
    title: 'Conexión perdida con API externa',
    message: 'No se pudo establecer conexión con el servicio de pagos',
    type: 'error',
    fecha: '11/06/2025',
  },
];

const getNotificationIcon = (type) => {
  switch (type) {
    case 'warning':
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    case 'success':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'error':
      return <XCircle className="h-4 w-4 text-red-500" />;
    default:
      return <CheckCircle className="h-4 w-4 text-green-500" />;
  }
};

const getNotificationBg = (type) => {
  const baseClasses = 'bg-gray-50';
  switch (type) {
    case 'warning':
      return cn(baseClasses);
    case 'success':
      return cn(baseClasses);
    case 'error':
      return cn(baseClasses);
    default:
      return baseClasses;
  }
};

export default function NotificationsSection() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const totalCount = notifications.length;

  const removeNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <CardTitle className="text-xl font-semibold">
              Notificaciones
            </CardTitle>
            {totalCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {totalCount}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No tienes notificaciones</p>
              </div>
            ) : (
              [...notifications]
                .sort((a, b) => b.id - a.id)
                .map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      'p-4 rounded-lg border transition-all duration-200 hover:shadow-md bg-gray-50',
                      getNotificationBg(notification.type, notification.read)
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <h4 className="text-sm font-medium">
                              {notification.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                              {notification.fecha}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                removeNotification(notification.id)
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
}
