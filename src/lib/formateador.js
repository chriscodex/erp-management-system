import { format } from '@formkit/tempo';

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

/**
 * Convierte una fecha en formato ISO string a un string en formato de hora corto,
 * ejemplo: "10:45 AM" en lugar de "2022-10-22T10:45:00.000Z".
 * @param {string} date - Fecha en formato ISO string
 * @returns {string} La fecha en formato de hora corto
 */

export function formatHour(date) {
  const dateObj = new Date(date);
  const formattedDate = format({
    date: dateObj,
    format: { time: 'short' },
    tz: 'America/Lima',
  });
  return formattedDate;
}

/**
 * Convierte una fecha en formato ISO string a un string en formato corto,
 * ejemplo: "22/10/2022" en lugar de "2022-10-22T00:00:00.000Z".
 * @param {string} date - Fecha en formato ISO string
 * @param {boolean} hour - Si se desea incluir la hora en la fecha, por defecto es true
 * @returns {string} La fecha en formato corto
 */
export function formatDateShort(date, hour = true) {
  if (!date) {
    return '';
  }
  const dateObj = new Date(date);
  const formattedDate = format({
    date: dateObj,
    format: 'short',
    tz: 'America/Bogota',
    locale: 'es',
    genitive: true,
  });
  return hour ? `${formattedDate} - ${formatHour(date)}` : formattedDate;
}

/**
 * Convierte una fecha en formato ISO string a un string en formato largo,
 * ejemplo: "22 de octubre de 2022" en lugar de "2022-10-22T00:00:00.000Z".
 * @param {string} date - Fecha en formato ISO string
 * @param {boolean} hour - Si se desea incluir la hora en la fecha, por defecto es true
 * @returns {string} La fecha en formato largo
 */
export function formatDateLong(date, hour = true) {
  const dateObj = new Date(date);
  const formattedDate = format({
    date: dateObj,
    format: 'long',
    tz: 'America/Bogota',
    locale: 'es',
    genitive: true,
  });
  return hour ? `${formattedDate} - ${formatHour(date)}` : formattedDate;
}

/**
 * Convierte una fecha en formato ISO string a un string en formato largo,
 * ejemplo: "martes, 22 de octubre de 2022" en lugar de "2022-10-22T00:00:00.000Z".
 * @param {string} date - Fecha en formato ISO string
 * @param {boolean} hour - Si se desea incluir la hora en la fecha, por defecto es true
 * @returns {string} La fecha en formato corto
 */
export function formatDateFull(date, hour = true) {
  const dateObj = new Date(date);
  const formattedDate = format({
    date: dateObj,
    format: 'full',
    tz: 'America/Bogota',
    locale: 'es',
    genitive: true,
  });
  return hour ? `${formattedDate} - ${formatHour(date)}` : formattedDate;
}

/**
 * Formatea un número para generar códigos para los contadores de boletas y facturas.
 * El código resultante tendrá el formato BXXX-00000000 donde:
 * - BXXX es el prefijo que se incrementa cuando el número supera 99999999
 * - 00000000 es el número formateado con 8 dígitos
 * 
 * @param {number} numero - El número a formatear
 * @returns {string} - El código formateado con el prefijo B y 8 dígitos
 * @throws {Error} - Si el número es negativo
 */
// export function formatearCodigoCounterBoletaFactura(numero, comprobante) {
//   // Validar que el número sea positivo
//   if (numero < 0) {
//     throw new Error('El número debe ser positivo');
//   }

//   // Calcular el prefijo y el número a mostrar
//   const MAX_NUMERO = 99999999;
//   let prefijo;
//   let numeroAmostrar;

//   if (numero <= MAX_NUMERO) {
//     if(comprobante === 'boleta'){
//       prefijo = 'B001';
//     }else{
//       prefijo = 'F001';
//     }
//     numeroAmostrar = numero;
//   } else {
//     // Calcular cuántas veces supera el máximo
//     const vecesSuperado = Math.floor(numero / (MAX_NUMERO + 1));
//     if(comprobante === 'boleta'){
//       prefijo = `B${String(vecesSuperado + 1).padStart(3, '0')}`;
//     }else{
//       prefijo = `F${String(vecesSuperado + 1).padStart(3, '0')}`;
//     }
    
//     // Calcular el número a mostrar (resto de la división)
//     numeroAmostrar = numero - (MAX_NUMERO + 1) * vecesSuperado;
//   }

//   // Formatear el número con 8 dígitos
//   const numeroFinal = String(numeroAmostrar).padStart(8, '0');

//   // Combinar el prefijo con el número formateado
//   return `${prefijo}-${numeroFinal}`;
// }


export function formatearCodigoCounterBoletaFactura(numero, comprobante) {
  // Validar que el número sea positivo
  if (numero < 0) {
    throw new Error('El número debe ser positivo');
  }

  // Normalizar el tipo de comprobante (insensible a mayúsculas/minúsculas)
  const tipo = comprobante.toLowerCase();

  const MAX_NUMERO = 99999999;
  let prefijo;
  let numeroAmostrar;

  if (numero <= MAX_NUMERO) {
    if (tipo === 'boleta') {
      prefijo = 'B001';
    } else if (tipo === 'factura') {
      prefijo = 'F001';
    } else if (tipo === 'cotizacion') {
      prefijo = 'C001';
    } else if (tipo === 'nota-venta') {
      prefijo = 'NV001';
    } else {
      throw new Error('Tipo de comprobante no válido');
    }
    numeroAmostrar = numero;
  } else {
    const vecesSuperado = Math.floor(numero / (MAX_NUMERO + 1));
    const nuevoPrefijo = String(vecesSuperado + 1).padStart(3, '0');

    if (tipo === 'boleta') {
      prefijo = `B${nuevoPrefijo}`;
    } else if (tipo === 'factura') {
      prefijo = `F${nuevoPrefijo}`;
    } else if (tipo === 'cotizacion') {
      prefijo = `C${nuevoPrefijo}`;
    } else if (tipo === 'nota-venta') {
      prefijo = `NV${nuevoPrefijo}`;
    } else {
      throw new Error('Tipo de comprobante no válido');
    }

    numeroAmostrar = numero - (MAX_NUMERO + 1) * vecesSuperado;
  }

  const numeroFinal = String(numeroAmostrar).padStart(8, '0');

  return `${prefijo}-${numeroFinal}`;
}