import { createProductClientUrl } from '@/lib/urls';
import { postData } from '@/lib/fetchData';
import { delay, simplificadorParaClientComponent } from '@/lib/utils';

import { connectDB } from '@/db/mongodb';
import { AlmacenService } from '@/backend/almacenes/application/almacen.service';
import { MarcaService } from '@/backend/marcas/application/marca.service';
import { ProveedorService } from '@/backend/proveedores/application/proveedor.service';
import { CategoryService } from '@/backend/categorias/application/category.service';
import { SegmentService } from '@/backend/segments/application/segments.service';

export async function getSegmentByDataRequestServer(segmentFilter) {
  try {
    await connectDB();
    const segmentService = new SegmentService();

    const response = await segmentService.getSegmentByData({
      nombre: segmentFilter,
    });

    if (response?.status !== 200) {
      console.log('Error al obtener el segmento filtrado');
      return { segment: null, status: response?.status };
    }
    const segment = response?.payload;
    return { segment: simplificadorParaClientComponent(segment), status: 200 };
  } catch (error) {
    console.error(error);
  }
}

export async function getCategoriesBySegmentDataRequestServer(
  categoryAndSegmentData
) {
  try {
    await connectDB();
    const categoryService = new CategoryService();

    const response = await categoryService.getCategoriesBySegmentData(
      categoryAndSegmentData
    );

    if (response?.status !== 200) {
      console.log('Error al obtener la categorías por segmento');
      return { categories: [], status: response?.status };
    }
    const categories = response?.payload;
    return {
      categories: simplificadorParaClientComponent(categories),
      status: 200,
    };
  } catch (error) {
    console.error(error);
  }
}

export async function getMarcasBySegmentDataForProductsRequestServer(marcaAndSegmentData) {
  try {
    await connectDB();
    const marcaService = new MarcaService();

    const response = await marcaService.getMarcasBySegmentData(
      marcaAndSegmentData
    );

    if (response?.status !== 200) {
      console.log('Error al obtener marcas por segmento');
      return { marcas: [], status: response?.status };
    }
    const marcas = response?.payload;
    return { marcas: simplificadorParaClientComponent(marcas), status: 200 };
  } catch (error) {
    console.error(error);
  }
}

export async function getAllAlmacenesByDataForProductsRequestServer(almacenData) {
  try {
    await connectDB();
    const almacenService = new AlmacenService();

    const response = await almacenService.getAllAlmacenesByData(almacenData);

    if (response?.status !== 200) {
      console.log('Error al obtener todos los almacenes');
      return { almacenes: [], status: response?.status };
    }
    const almacenes = response?.payload;
    return {
      almacenes: simplificadorParaClientComponent(almacenes),
      status: 200,
    };
  } catch (error) {
    console.error(error);
  }
}

export async function getAllProveedoresByDataForProductsRequestServer(proveedorData) {
  try {
    await connectDB();
    const proveedorService = new ProveedorService();

    const response = await proveedorService.getAllProveedoresByData(
      proveedorData
    );
    if (response?.status !== 200) {
      console.log('Error al obtener todas los proveedores');
      return { proveedores: [], status: response?.status };
    }
    const proveedores = response?.payload;
    return {
      proveedores: simplificadorParaClientComponent(proveedores),
      status: 200,
    };
  } catch (error) {
    console.error(error);
  }
}

export async function createProductRequestClient(product, setLoading) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      setLoading(true);
      // Simular tiempo de retraso para pruebas en la UI
      await delay();

      // Obtener los datos del producto
      const response = await postData(createProductClientUrl, product);
      if (response?.status !== 201) {
        setLoading(false);
        reject(
          'No se pudo crear el producto: ' + response.response?.data?.error
        );
        return;
      }

      setLoading(false);
      resolve(response?.response?.data?.payload);
    } catch (error) {
      setLoading(false);
      reject(error);
    }
  });
}
