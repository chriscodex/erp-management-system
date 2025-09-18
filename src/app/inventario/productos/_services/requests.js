import { connectDB } from '@/db/mongodb';
import { ProductService } from '@/backend/products/application/products.service';
import { delay, simplificadorParaClientComponent } from '@/lib/utils';
import { deleteProductClientUrl } from '@/lib/urls';
import { deleteData } from '@/lib/fetchData';

import { MarcaService } from '@/backend/marcas/application/marca.service';
import { CategoryService } from '@/backend/categorias/application/category.service';
import { ProveedorService } from '@/backend/proveedores/application/proveedor.service';
import { AlmacenService } from '@/backend/almacenes/application/almacen.service';

export async function getAllProductsRequestServer() {
  try {
    await connectDB();
    const productService = new ProductService();

    const response = await productService.getAllProducts();

    if (response?.status !== 200) {
      console.log('Error al obtener todos los productos');
      return { products: [], status: 500 };
    }
    const products = response?.payload;
    return {
      products: simplificadorParaClientComponent(products),
      status: 200,
    };
  } catch (error) {
    console.error(error);
  }
}

export async function deleteProductRequestClient(productId) {
  // eslint-disable-next-line no-undef
  return new Promise(async (resolve, reject) => {
    try {
      // Simular tiempo de retraso
      await delay();

      const url = `${deleteProductClientUrl}/${productId}`;

      // Obtener los datos de la persona
      const response = await deleteData(url);
      if (response?.status !== 204) {
        reject(
          'No se pudo eliminar el producto: ' + response.response?.data?.error,
        );
        return;
      }

      resolve(response?.response?.data?.payload);
    } catch (error) {
      reject(error);
    }
  });
}

export async function getMarcasBySegmentDataForProductsRequestServer(
  marcaAndSegmentData,
) {
  try {
    await connectDB();
    const marcaService = new MarcaService();

    const response =
      await marcaService.getMarcasBySegmentData(marcaAndSegmentData);

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

export async function getCategoriesBySegmentDataForProductsRequestServer(
  categoryAndSegmentData,
) {
  try {
    await connectDB();
    const categoryService = new CategoryService();

    const response = await categoryService.getCategoriesBySegmentData(
      categoryAndSegmentData,
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

export async function getAllProveedoresByDataForProductsRequestServer(
  proveedorData,
) {
  try {
    await connectDB();
    const proveedorService = new ProveedorService();

    const response =
      await proveedorService.getAllProveedoresByData(proveedorData);
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

export async function getAllAlmacenesByDataForProductsRequestServer(
  almacenData,
) {
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
