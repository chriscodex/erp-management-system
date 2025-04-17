import { generarNumeroAleatorioOchoDigitos } from '@/lib/utils';

export async function generarCodigoUnicoDelModeloPedido(modeloRepository) {
  const numericCode = generarNumeroAleatorioOchoDigitos();
  const modeloCode = `1${numericCode}`;

  // Validar si el código ya existe
  const codeExists = await modeloRepository.getModeloPedidoByData({
    code: modeloCode,
  });

  if (codeExists) {
    console.log(
      'Modelo Service: El código generado ya existe, generando uno nuevo...'
    );
    // Llamar recursivamente hasta encontrar un código único
    return await generarCodigoUnicoDelModeloPedido(modeloRepository);
  }

  console.log('Modelo Service: El código generado no existe');
  return modeloCode;
}