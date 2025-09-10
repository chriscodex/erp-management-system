import { generarNumeroAleatorio } from '@/lib/utils';

/**
 * Genera un código único de 8 dígitos para un producto, con la siguiente estructura:
 * 2 + 7 dígitos aleatorios. Si el código ya existe, se llama recursivamente hasta
 * que se encuentre un código único.
 *
 * @param {ProductRepository} productRepository - Repositorio de productos
 * @returns {Promise<string>} - Código único del producto
 */
export async function generarCodigoUnicoDelProducto(productRepository) {
  try {
    const numericCode = generarNumeroAleatorio(12);
    const productCode = `2${numericCode}`;

    // Validar si el código ya existe
    const codeExists = await productRepository.getProductByData({
      code: productCode,
    });

    if (codeExists) {
      console.log(
        'Product Service: El código generado ya existe, generando uno nuevo...',
      );
      // Llamar recursivamente hasta encontrar un código único
      return await generarCodigoUnicoDelProducto(productRepository);
    }

    console.log('Product Service: El código generado no existe');
    return productCode;
  } catch (error) {
    console.error('Error generando código único de producto:', error);
    throw error;
  }
}

/**
 * Genera un array de objetos con los códigos de las unidades del producto y su
 * estado.
 * @param {string} codigo - Código del producto de 9 caracteres
 * @param {number} stock - Número de stock del producto
 * @returns {Array<Object>} - Array con los objetos de las unidades, con las
 * propiedades code y estado
 * @throws {Error} - Si el código no tiene una longitud de 9 caracteres o el
 * stock no es un número entero positivo
 */
export function generarUnidadesDelProducto(stock) {
  if (stock <= 0 || !Number.isInteger(stock)) {
    throw new Error('El parámetro stock debe ser un número entero positivo.');
  }

  // eslint-disable-next-line no-undef
  const result = new Set(); // Usamos un Set para evitar duplicados
  while (result.size < stock) {
    const codigoAleatorio = `2${generarNumeroAleatorio(12)}`;
    result.add({ code: codigoAleatorio, estado: 'disponible' });
  }

  return Array.from(result); // Convertimos el Set en un array
}
