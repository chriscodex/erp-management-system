import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground w-full">
      <div className="container px-4 md:px-6 flex flex-col items-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            404 - Página no encontrada
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Lo sentimos, la página que estás buscando no existe o ha sido
            movida.
          </p>
        </div>
        <div className="w-full max-w-sm space-y-4">
          <div className="flex justify-center">
            <AlertCircle className="h-24 w-24 text-muted-foreground animate-pulse" />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              ¿Quieres volver a la página principal?
            </p>
            <Button asChild className="w-full">
              {/* // Redirección a la pagina de inicio */}
              <Link href="/">Volver al inicio</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
