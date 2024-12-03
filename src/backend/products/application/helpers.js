function generarNumeroAleatorioOchoDigitos() {
  return Math.floor(10000000 + Math.random() * 90000000);
}

/**
 * Genera un código único de 8 dígitos para un producto, con la siguiente estructura:
 * 2 + 7 dígitos aleatorios. Si el código ya existe, se llama recursivamente hasta
 * que se encuentre un código único.
 *
 * @param {ProductRepository} productRepository - Repositorio de productos
 * @returns {Promise<string>} - Código único del producto
 */
export async function generarCodigoUnicoDelProducto(productRepository) {
  const numericCode = generarNumeroAleatorioOchoDigitos();
  const productCode = `2${numericCode}`;

  // Validar si el código ya existe
  const codeExists = await productRepository.getProductByData({
    code: productCode,
  });

  if (codeExists) {
    console.log(
      'Product Service: El código generado ya existe, generando uno nuevo...'
    );
    // Llamar recursivamente hasta encontrar un código único
    return await generarCodigoUnicoDelProducto(productRepository);
  }

  console.log('Product Service: El código generado no existe');
  return productCode;
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
export function generarUnidadesDelProducto(codigo, stock) {
  if (codigo.length !== 9) {
    console.log('producto', codigo);
    console.error('El codigo debe tener una longitud de 9 caracteres.');
    throw new Error('El codigo debe tener una longitud de 9 caracteres.');
  }
  if (stock <= 0 || !Number.isInteger(stock)) {
    throw new Error('El parámetro stock debe ser un número entero positivo.');
  }

  const result = [];
  for (let i = 1; i <= stock; i++) {
    const codeNumber = String(i).padStart(5, '0');
    result.push({ code: `${codigo}${codeNumber}`, estado: 'disponible' });
  }
  return result;
}
