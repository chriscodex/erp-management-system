import { format } from '@formkit/tempo';
import writtenNumber from 'written-number';

/**
 * Crea un nombre completo utilizando la primera palabra de los
 * nombres y apellidos proporcionados.
 *
 * @param {string} nombres - Cadena de texto que contiene los nombres completos.
 * @param {string} apellidos - Cadena de texto que contiene los apellidos completos.
 * @returns {string} El nombre completo formado por la primera palabra de los
 * nombres y apellidos.
 */
export function CrearFullName(nombres, apellidos) {
  const nombre = nombres?.split(' ')[0];
  const apellido = apellidos?.split(' ')[0];

  return `${nombre} ${apellido}`;
}

/**
 * Convierte una oracion a Mayusculas y minusculas, para que solo la primera
 * letra de cada palabra este en mayusculas. Util para formatear nombres de
 * personas.
 * @param {string} oracion - La oracion que se quiere formatear
 * @returns {string} La oracion formateada
 */
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
 * Obtiene la serie y el correlativo de un comprobante basado en el número
 * proporcionado y el tipo de comprobante. La serie varía dependiendo del
 * tipo de comprobante (boleta, factura, cotización o nota-venta) y el
 * número de veces que se ha superado el máximo permitido. El correlativo
 * es el número formateado con ceros a la izquierda hasta completar 8 dígitos.
 *
 * @param {number} numero - Número utilizado para calcular el correlativo.
 * Debe ser positivo.
 * @param {string} comprobante - Tipo de comprobante ('boleta', 'factura',
 * 'cotizacion', 'nota-venta').
 * @returns {{serie: string, correlativo: string}} Un objeto que contiene
 * la serie y el correlativo formateado del comprobante.
 * @throws {Error} Si el número es negativo o el tipo de comprobante no es válido.
 */
export function obtenerSerieYCorrelativo(numero, comprobante) {
  if (numero < 0) throw new Error('El número debe ser positivo');

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

  return {
    serie: prefijo,
    correlativo: String(numeroAmostrar).padStart(8, '0'),
  };
}

/**
 * Formatea un número y un tipo de comprobante en un código
 * compuesto por la serie y el correlativo. La serie y el correlativo
 * son calculados por la función obtenerSerieYCorrelativo.
 *
 * @param {number} numero - Número a formatear. Debe ser positivo.
 * @param {string} comprobante - Tipo de comprobante ('boleta', 'factura',
 * 'cotizacion', 'nota-venta').
 * @returns {string} Un string que contiene el código formateado.
 * @throws {Error} Si el número es negativo o el tipo de comprobante no es válido.
 */
export function formatearCodigoCounterBoletaFactura(numero, comprobante) {
  const { serie, correlativo } = obtenerSerieYCorrelativo(numero, comprobante);
  return `${serie}-${correlativo}`;
}

/**
 * Convierte un número a su representación en letras en español, seguido de la parte
 * decimal en formato de centavos, y retorna una cadena formateada en el estilo
 * "SON ... CON .../100 SOLES".
 *
 * @param {number} numero - El número a convertir. Puede tener parte decimal.
 * @returns {string} Una cadena que representa el número en letras, seguido de la
 * representación de los centavos.
 *
 * @example
 * // returns "SON CINCO CON 50/100 SOLES"
 * formatNumeroALetras(5.5);
 */

export function formatNumeroALetras(numero) {
  const parteEntera = Math.floor(numero);
  const letrasParteEntera = writtenNumber(parteEntera, { lang: 'es' });

  const parteDecimal = Math.round((numero - parteEntera) * 100);
  const letrasParteDecimal = parteDecimal.toString().padStart(2, '0');

  return `SON ${letrasParteEntera.toUpperCase()} CON ${letrasParteDecimal}/100 SOLES`;
}
