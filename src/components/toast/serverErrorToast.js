import { toast } from 'sonner';

export function serverErrorToast() {
  toast.error(
    'No podemos conectarnos al servidor en este momento. Verifica tu conexión a internet o inténtalo nuevamente en unos minutos. Si el error persiste, ponte en contacto con los desarrolladores.',
    { duration: 10000 }
  );
}
