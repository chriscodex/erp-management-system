import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { fetchData } from '@/lib/fetchData';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

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

export async function getDataByDni(dni = '') {
  try {
    const url = '/api/searched-users';

    const response = await fetchData(`${url}?dni=${dni}`);

    return response;
  } catch (error) {
    console.log(error);
  }
}

export function sortByUpdateDateDesc(list) {
  const listSorted = list.sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );
  return listSorted;
}

export function agregarNumeracionTable(array) {
  return array.map((item, index) => ({
    ...item,
    numeracion: index + 1,
  }));
}

/**
 * Simplifica un objeto o array de objetos para ser utilizado en el lado
 * del cliente, transformado buffers.
 * @param {object|array} input - El objeto o array de objetos a simplificar.
 * @returns {object|array} - El objeto o array de objetos simplificado.
 */
export function simplificadorParaClientComponent(input) {
  // Si el input es un array, mapea y simplifica cada item
  if (Array.isArray(input)) {
    return input.map(item => JSON.parse(JSON.stringify(item)));
  }

  // Si el input no es un array, simplifica el único objeto
  return JSON.parse(JSON.stringify(input));
}
