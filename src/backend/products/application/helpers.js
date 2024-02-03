export function generarUnidadesDelProducto(codigo, stock) {
  if (codigo.length !== 9) {
    throw new Error('El codigo debe tener una longitud de 9 caracteres.');
  }
  if (stock <= 0 || !Number.isInteger(stock)) {
    throw new Error('El parámetro stock debe ser un número entero positivo.');
  }

  const result = [];
  for (let i = 1; i <= stock; i++) {
    const codeNumber = String(i).padStart(3, '0');
    result.push({ code: `${codigo}${codeNumber}`, estado: 'disponible' });
  }
  return result;
}