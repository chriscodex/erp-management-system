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
