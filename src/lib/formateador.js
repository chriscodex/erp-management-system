import { format } from '@formkit/tempo';
import writtenNumber from 'written-number';

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
 * Función para mostrar en UI el código completo.
 */
export function formatearCodigoCounterBoletaFactura(numero, comprobante) {
  const { serie, correlativo } = obtenerSerieYCorrelativo(numero, comprobante);
  return `${serie}-${correlativo}`;
}

export function formatNumeroALetras(numero) {

  //Extraer y leeer parte entera del número
  const parteEntera = Math.floor(numero);
  const letrasParteEntera = writtenNumber(parteEntera, {lang: 'es'});
  
  //Extraer y leer parte decimal del número
  const parteDecimal = Math.round((numero - parteEntera) * 100);
  const letrasParteDecimal = parteDecimal.toString().padStart(2, '0');

  //Concatenar las partes
  return `${letrasParteEntera.toUpperCase()} CON ${letrasParteDecimal}/100 SOLES`;
}

