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
  return product?.unidades?.map((unidad) => ({
    nombre: product?.nombre,
    codigo: unidad?.code,
  })) || [];
}
