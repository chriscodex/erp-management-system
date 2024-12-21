import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export function generateExcelFileForProductsCode(product) {
  const codesToDownload = transformToExcelObjectForProductsCode(product);

  // Crea un libro y una hoja de trabajo
  const workBook = XLSX.utils.book_new();
  const workSheet = XLSX.utils.json_to_sheet(codesToDownload);

  // Añade la hoja al libro
  XLSX.utils.book_append_sheet(workBook, workSheet, 'Codigos');

  // Genera el archivo Excel como array binario
  const excelBuffer = XLSX.write(workBook, { bookType: 'xlsx', type: 'array' });

  // Crea un Blob para la descarga
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

  // Usa FileSaver para descargar el archivo
  saveAs(blob, 'Codigos.xlsx');
}

export function transformToExcelObjectForProductsCode(product) {
  return (
    product?.unidades?.map((unidad) => ({
      nombre: product?.nombre,
      codigo: unidad?.code,
    })) || []
  );
}

export function aumentarStock(product, cantidadAAgregar) {
  if (!product.unidades || product.unidades.length === 0) {
    throw new Error('El producto no tiene unidades existentes.');
  }

  // Obtén el último código de las unidades
  const ultimoCodigo = product.unidades[product.unidades.length - 1].code;

  // Extrae la parte numérica del último código
  const numeroBase = parseInt(ultimoCodigo.slice(-5), 10); // Los últimos 5 dígitos

  // Crea las nuevas unidades
  const nuevasUnidades = [];
  for (let i = 1; i <= cantidadAAgregar; i++) {
    const nuevoNumero = (numeroBase + i).toString().padStart(5, '0'); // Asegura que tenga 5 dígitos
    const nuevoCodigo = `${product.code}${nuevoNumero}`;
    nuevasUnidades.push({
      code: nuevoCodigo,
      estado: 'disponible',
      // _id: generarIdUnico(), // Puedes usar una función para generar un ID único
    });
  }

  // Agrega las nuevas unidades al array existente
  product.unidades.push(...nuevasUnidades);

  // Actualiza el stock del producto
  product.stock += cantidadAAgregar;

  console.log('Producto actualizado:', product);

  return product; // Devuelve el producto actualizado
}
