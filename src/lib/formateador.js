function FormateadorNombresApellidos(nombres, apellidos) {
  // Obtener la primera palabra de cada string
  const nombre = nombres?.split(' ')[0];
  const apellido = apellidos?.split(' ')[0];

  // Concatenar las primeras palabras
  return `${nombre} ${apellido}`;
}

export { FormateadorNombresApellidos };
