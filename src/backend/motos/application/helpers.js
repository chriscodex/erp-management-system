import { generarNumeroAleatorio, generarNumeroAleatorioSeisDigitos } from '@/lib/utils';

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

export function generarCodigoMoto() {
  // eslint-disable-next-line no-undef
  const result = new Set(); // Usamos un Set para asegurarnos de que no haya duplicados

  while (result.size < 1) { 
    const codigoAleatorio = `1${generarNumeroAleatorio(12)}`; // Generamos un código con 13 dígitos comenzando con 1
    result.add(codigoAleatorio);
  }

  return Array.from(result)[0]; // Convertimos el Set a un array y retornamos el único elemento
}