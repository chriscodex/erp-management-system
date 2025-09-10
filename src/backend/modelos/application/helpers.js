import { generarNumeroAleatorioOchoDigitos } from '@/lib/utils';

/**
 * Genera un código único de 8 dígitos para un modelo, con la siguiente estructura:
 * 1 + 7 dígitos aleatorios. Si el código ya existe, se llama recursivamente hasta
 * que se encuentre un código único.
 *
 * @param {ModeloRepository} modeloRepository - Repositorio de modelos
 * @returns {Promise<string>} - Código único del modelo
 */
export async function generarCodigoUnicoDelModelo(modeloRepository) {
  try {
    const numericCode = generarNumeroAleatorioOchoDigitos();
    const modeloCode = `1${numericCode}`;

    // Validar si el código ya existe
    const codeExists = await modeloRepository.getModeloByData({
      code: modeloCode,
    });

    if (codeExists) {
      console.log(
        'Modelo Service: El código generado ya existe, generando uno nuevo...',
      );
      // Llamar recursivamente hasta encontrar un código único
      return await generarCodigoUnicoDelModelo(modeloRepository);
    }

    console.log('Modelo Service: El código generado no existe');
    return modeloCode;
  } catch (error) {
    console.error('Error generando código único de modelo:', error);
    throw error;
  }
}
