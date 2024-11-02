import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { fetchData } from '@/lib/fetchData';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export async function delay(ms) {
  try {
    return new Promise((resolve) => setTimeout(resolve, ms)); // eslint-disable-line
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
