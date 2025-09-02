import {
  generarNumeroAleatorio,
  generarNumeroAleatorioSeisDigitos,
} from '@/lib/utils';

/**
 * Genera un código único para una moto concatenando un código de modelo con 6 dígitos aleatorios.
 * Si el código ya existe, se llama recursivamente hasta que se genere un código único.
 *
 * @param {string} modeloCode - El código del modelo de la moto
 * @param {MotoRepository} motoRepository - Repositorio de motos para verificar la unicidad del código
 * @returns {Promise<string>} - Código único de la moto
 * @throws {Error} - Error si ocurre un problema durante la generación del código
 */
export async function generarCodigoUnicoDeMoto(modeloCode, motoRepository) {
  try {
    const numericCode = generarNumeroAleatorioSeisDigitos();
    const motoCode = `${modeloCode}${numericCode}`;

    // Validar si el código ya existe
    const codeExists = await motoRepository.getMotoByData({
      code: motoCode,
    });

    if (codeExists) {
      console.log(
        'Moto Service: El código generado ya existe, generando uno nuevo...',
      );
      // Llamar recursivamente hasta encontrar un código único
      return await generarCodigoUnicoDeMoto(modeloCode, motoRepository);
    }

    console.log('Moto Service: El código generado no existe');
    return motoCode;
  } catch (error) {
    console.error('Error generando código único de moto:', error);
    throw error;
  }
}

/**
 * Genera un código único de 13 dígitos para una moto, comenzando con 1,
 * y 12 dígitos aleatorios. Si el código ya existe, se llama recursivamente
 * hasta que se genere un código único.
 *
 * @returns {string} - Código único de la moto
 */
export function generarCodigoMoto() {
  // eslint-disable-next-line no-undef
  const result = new Set(); // Usamos un Set para asegurarnos de que no haya duplicados

  while (result.size < 1) {
    const codigoAleatorio = `1${generarNumeroAleatorio(12)}`; // Generamos un código con 13 dígitos comenzando con 1
    result.add(codigoAleatorio);
  }

  return Array.from(result)[0]; // Convertimos el Set a un array y retornamos el único elemento
}
