export function CrearFullName(nombres, apellidos) {
  // Obtener la primera palabra de cada string
  const nombre = nombres?.split(' ')[0];
  const apellido = apellidos?.split(' ')[0];

  // Concatenar las primeras palabras
  return `${nombre} ${apellido}`;
}

/* Convierte una palabra o palabras todas escritas en mayúsculas a formato título */
export function MayusculasATitulo(oracion) {
  return oracion
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
