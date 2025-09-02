import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

/**
 * Genera un archivo Excel que contiene los códigos de un producto
 *
 * @param {Object} product - El producto que se va a descargar
 */
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

/**
 * Convierte un objeto de product en un array de objetos para ser exportado en
 * un archivo Excel, con las columnas "nombre" y "codigo". Si el objeto product
 * no tiene unidades, devuelve un array vacio.
 *
 * @param {Object} product - El objeto de product a ser exportado
 * @returns {Array} Un array de objetos con las columnas nombre y codigo
 */
export function transformToExcelObjectForProductsCode(product) {
  return (
    product?.unidades?.map((unidad) => ({
      nombre: product?.nombre,
      codigo: unidad?.code,
    })) || []
  );
}
