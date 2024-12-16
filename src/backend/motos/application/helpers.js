import { generarNumeroAleatorioSeisDigitos } from '@/lib/utils';

export async function generarCodigoUnicoDeMoto(modeloCode, motoRepository) {
  const numericCode = generarNumeroAleatorioSeisDigitos();
  const motoCode = `${modeloCode}${numericCode}`;

  // Validar si el código ya existe
  const codeExists = await motoRepository.getMotoByData({
    code: motoCode,
  });

  if (codeExists) {
    console.log(
      'Moto Service: El código generado ya existe, generando uno nuevo...'
    );
    // Llamar recursivamente hasta encontrar un código único
    return await generarCodigoUnicoDeMoto(motoRepository);
  }

  console.log('Moto Service: El código generado no existe');
  return motoCode;
}
