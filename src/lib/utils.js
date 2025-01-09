import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const TIME_DEBOUNCE = 0;

/**
 * Simula un retraso en la ejecución del código de 1.5 segundos.
 * @returns {Promise} - Promesa que se resuelve después de 1.5 segundos.
 */
export async function delay() {
  try {
    return new Promise((resolve) => setTimeout(resolve, 1500)); // eslint-disable-line
  } catch (error) {
    console.log(error);
  }
}

export function formatMoney(amount) {
  if (typeof amount !== 'number') {
    return null;
  }

  return amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function sortByUpdateDateDesc(list) {
  if (!Array.isArray(list)) return [];
  const listSorted = list?.sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );
  return listSorted;
}

export function sortByUpdateDateAsc(list) {
  if (!Array.isArray(list)) return [];
  const listSorted = list?.sort(
    (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)
  );
  return listSorted;
}

export function agregarNumeracionTable(array) {
  if (!Array.isArray(array)) return [];
  return array.map((item, index) => ({
    ...item,
    numeracion: index + 1,
  }));
}

export function contarEstadoDeUnidades(lista) {
  const unidadesDisponibles = lista?.filter(
    (unidad) => unidad.estado === 'disponible'
  ).length;

  const unidadesDanadas = lista?.filter(
    (unidad) => unidad.estado === 'dañado'
  ).length;

  const unidadesReparadas = lista?.filter(
    (unidad) => unidad.estado === 'reparado'
  ).length;

  const unidadesDesaparecidas = lista?.filter(
    (unidad) => unidad.estado === 'desaparecido'
  ).length;

  return {
    unidadesDisponibles,
    unidadesDanadas,
    unidadesReparadas,
    unidadesDesaparecidas,
  };
}

/**
 * Simplifica un objeto o array de objetos para ser utilizado en el lado
 * del cliente, transformado buffers.
 * @param {object|array} input - El objeto o array de objetos a simplificar.
 * @returns {object|array} - El objeto o array de objetos simplificado.
 */
export function simplificadorParaClientComponent(input) {
  if (input === null || input === undefined) {
    return null; // O manejarlo como prefieras
  }
  // Si el input es un array, mapea y simplifica cada item
  if (Array.isArray(input)) {
    return input.map((item) => JSON.parse(JSON.stringify(item)));
  }

  // Si el input no es un array, simplifica el único objeto
  return JSON.parse(JSON.stringify(input));
}

export function generarNumeroAleatorioOchoDigitos() {
  return Math.floor(10000000 + Math.random() * 90000000);
}
export function generarNumeroAleatorioSeisDigitos() {
  return Math.floor(100000 + Math.random() * 900000);
}

/**
 * Genera un número aleatorio de la cantidad de dígitos especificada.
 *
 * @param {number} cantidadDigitos - La cantidad de dígitos del número aleatorio a generar.
 * @returns {number} - El número aleatorio generado.
 * @throws {Error} - Si la cantidad de dígitos es menor a 1.
 */
export function generarNumeroAleatorio(cantidadDigitos) {
  if (cantidadDigitos < 1) {
    throw new Error('La cantidad de dígitos debe ser mayor o igual a 1');
  }

  const min = Math.pow(10, cantidadDigitos - 1); // Número mínimo con la cantidad de dígitos
  const max = Math.pow(10, cantidadDigitos) - 1; // Número máximo con la cantidad de dígitos

  return Math.floor(min + Math.random() * (max - min + 1));
}
