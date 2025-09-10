import * as React from 'react';

const MOBILE_BREAKPOINT = 768;

/**
 * Devuelve true si el ancho de la pantalla es menor o igual que {MOBILE_BREAKPOINT}
 * y false en caso contrario.
 *
 * El valor se actualiza automaticamente cuando se cambia el tamano de la ventana.
 *
 * @returns {boolean} Si el ancho de la pantalla es menor o igual que
 * {MOBILE_BREAKPOINT}.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener('change', onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return !!isMobile;
}
