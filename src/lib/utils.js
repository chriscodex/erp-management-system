// Lista de departamentos del Perú
export const departamentosPeru = [
  'Amazonas',
  'Áncash',
  'Apurímac',
  'Arequipa',
  'Ayacucho',
  'Cajamarca',
  'Callao',
  'Cusco',
  'Huancavelica',
  'Huánuco',
  'Ica',
  'Junín',
  'La Libertad',
  'Lambayeque',
  'Lima',
  'Loreto',
  'Madre de Dios',
  'Moquegua',
  'Pasco',
  'Piura',
  'Puno',
  'San Martín',
  'Tacna',
  'Tumbes',
  'Ucayali',
];
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

/**
 * Simula un retraso en la ejecución del código de 0.3 segundos.
 * @returns {Promise} - Promesa que se resuelve después de 0.3 segundos.
 */
export async function shortDelay() {
  try {
    return new Promise((resolve) => setTimeout(resolve, 300)); // eslint-disable-line
  } catch (error) {
    console.log(error);
  }
}

/**
 * Formatea un número en un string representando una cantidad de dinero en
 * soles peruanos.
 *
 * @param {number} amount - Número a formatear.
 *
 * @returns {string | null} - String representando la cantidad de dinero
 *   formateada con decimales y separador de miles, o null si el parámetro
 *   no es un número.
 */
export function formatMoney(amount) {
  if (typeof amount !== 'number') {
    return null;
  }

  return amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Ordena un array de objetos con la propiedad updatedAt en orden
 * descendente, de mas reciente a mas antiguo.
 *
 * @param {object[]} list - Array de objetos a ordenar.
 *
 * @returns {object[]} - Array de objetos ordenado.
 */
export function sortByUpdateDateDesc(list) {
  if (!Array.isArray(list)) return [];
  const listSorted = list?.sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
  );
  return listSorted;
}

/**
 * Ordena un array de objetos con la propiedad updatedAt en orden
 * ascendente, de mas antiguo a mas reciente.
 *
 * @param {object[]} list - Array de objetos a ordenar.
 *
 * @returns {object[]} - Array de objetos ordenado.
 */
export function sortByUpdateDateAsc(list) {
  if (!Array.isArray(list)) return [];
  const listSorted = list?.sort(
    (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt),
  );
  return listSorted;
}

/**
 * Agrega la propiedad numeracion con un valor numérico que parte en 1
 * y aumenta en 1 para cada item del array, y la propiedad internalId
 * con un valor numérico aleatorio de 6 dígitos.
 *
 * @param {object[]} array - Array de objetos al que se le agregará
 *   la numeración y el internalId.
 *
 * @returns {object[]} - Array de objetos con la numeración y el internalId
 *   agregados.
 */
export function agregarNumeracionTable(array) {
  if (!Array.isArray(array)) return [];
  return array.map((item, index) => ({
    ...item,
    numeracion: index + 1,
    internalId: generarNumeroAleatorioSeisDigitos(),
  }));
}

/**
 * Cuenta la cantidad de unidades en cada estado y devuelve un objeto
 * con las propiedades unidadesDisponibles, unidadesDanadas,
 * unidadesReparadas y unidadesDesaparecidas.
 *
 * @param {object[]} lista - Array de objetos con la propiedad estado
 *   que se va a contar.
 *
 * @returns {{unidadesDisponibles: number, unidadesDanadas: number, unidadesReparadas: number, unidadesDesaparecidas: number}} - Objeto con la
 *   cantidad de unidades en cada estado.
 */
export function contarEstadoDeUnidades(lista) {
  const unidadesDisponibles = lista?.filter(
    (unidad) => unidad.estado === 'disponible',
  ).length;

  const unidadesDanadas = lista?.filter(
    (unidad) => unidad.estado === 'dañado',
  ).length;

  const unidadesReparadas = lista?.filter(
    (unidad) => unidad.estado === 'reparado',
  ).length;

  const unidadesDesaparecidas = lista?.filter(
    (unidad) => unidad.estado === 'desaparecido',
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

/**
 * Genera un número aleatorio de 8 dígitos.
 *
 * @returns {number} - El número aleatorio generado.
 */
export function generarNumeroAleatorioOchoDigitos() {
  return Math.floor(10000000 + Math.random() * 90000000);
}

/**
 * Genera un número aleatorio de 6 dígitos.
 *
 * @returns {number} - El número aleatorio generado.
 */
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

/**
 * Genera un código único de 10 caracteres, utilizando el año, mes,
 * día y los últimos 6 caracteres del id proporcionado.
 *
 * @param {string|number} id - El id del que se generará el código.
 * @returns {string} - El código único generado.
 */
export function generateUniqueCode(id) {
  const date = new Date();
  const year = (date.getFullYear() % 100).toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const recortedId = id.toString().slice(-6).toUpperCase();

  return `RSV-${year}${month}${day}${recortedId}`;
}

/**
 * Obtiene la fecha y hora actual en el huso horario de Perú (UTC-5) en
 * formato ISO 8601 sin milisegundos y con el sufijo de zona horaria "-05:00".
 *
 * @returns {string} - La fecha y hora actual en Perú en formato ISO 8601.
 */
export function obtenerFechaEmisionPeru() {
  const now = new Date();
  const offsetMin = -300; // UTC‑5 * 60
  const local = new Date(now.getTime() + offsetMin * 60000);
  const iso = local.toISOString();
  const sinMs = iso.split('.')[0];
  return sinMs + '-05:00';
}
