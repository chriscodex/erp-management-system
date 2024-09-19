import { getDataByDni } from './fetchData';

export async function getDataByDniTest() {
  const dni = await getDataByDni('74062106');

  return dni;
}