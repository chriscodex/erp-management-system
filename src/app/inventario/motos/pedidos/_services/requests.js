import { connectDB } from '@/db/mongodb';
import { postData, deleteData } from '@/lib/fetchData';
import { createModeloPedidoClientUrl, deletePedidoClientUrl } from '@/lib/urls';
import { delay, simplificadorParaClientComponent } from '@/lib/utils';

import { PedidoService } from '@/backend/pedidos/application/pedido.service';
import { ModeloService } from '@/backend/modelos/application/modelo.service';
import { ModeloPedidoService } from '@/backend/modelosPedidos/application/modeloPedido.service';
import { ProveedorService } from '@/backend/proveedores/application/proveedor.service';
import { AlmacenService } from '@/backend/almacenes/application/almacen.service';

import { MarcaService } from '@/backend/marcas/application/marca.service';
import { CategoryService } from '@/backend/categorias/application/category.service';

export async function getPedidoRequestServer(pedidoId) {
  try {
    await connectDB();
    const pedidoService = new PedidoService();

    const response = await pedidoService.getPedidoByData({
      id: pedidoId,
    });

    if (response?.status !== 200) {
      console.log('Error al obtener el pedido desde el servidor');
      return { pedido: null, status: response?.status };
    }
    const pedido = response?.payload;
    return {
      pedido: simplificadorParaClientComponent(pedido),
      status: 200,
    };
  } catch (error) {
    console.log(error);
  }
}
export async function getAllPedidosRequestServer() {
  try {
    await connectDB();
    const pedidoService = new PedidoService();

    const response = await pedidoService.getAllPedidos();

    if (response?.status !== 200) {
      console.log('Error al obtener todos los pedidos');
      return { pedidos: [], status: 500 };
    }
    const pedidos = response?.payload;
    return {
      pedidos: simplificadorParaClientComponent(pedidos),
      status: 200,
    };
  } catch (error) {
    console.error(error);
  }
}

export async function deletePedidoRequestClient(pedidoId) {
  console.log('Pedido en request client', pedidoId);
  // eslint-disable-next-line no-undef
  return new Promise(async (resolve, reject) => {
    try {
      // Simular tiempo de retraso
      await delay();

      const url = `${deletePedidoClientUrl}/${pedidoId}`;

      const response = await deleteData(url);
      if (response?.status !== 204) {
        reject(
          'No se pudo eliminar el pedido: ' + response.response?.data?.error,
        );
        return;
      }

      resolve(response?.response?.data?.payload);
    } catch (error) {
      reject(error);
    }
  });
}

export async function getAllModelosRequestServer() {
  try {
    await connectDB();
    const modeloService = new ModeloService();

    const response = await modeloService.getAllModelos();

    if (response?.status !== 200) {
      console.log('Error al obtener todos los modelos');
      return { modelos: [], status: 500 };
    }
    const modelos = response?.payload;
    return {
      modelos: simplificadorParaClientComponent(modelos),
      status: 200,
    };
  } catch (error) {
    console.error(error);
  }
}

export async function getAllModelosPedidosRequestServer() {
  try {
    await connectDB();
    const modeloPedidoService = new ModeloPedidoService();

    const response = await modeloPedidoService.getAllModelosPedidos();

    if (response?.status !== 200) {
      console.log('Error al obtener todos los modelos');
      return { modelosPedidos: [], status: 500 };
    }
    const modelosPedidos = response?.payload;
    return {
      modelosPedidos: simplificadorParaClientComponent(modelosPedidos),
      status: 200,
    };
  } catch (error) {
    console.error(error);
  }
}

export async function getAllProveedoresRequestServer() {
  try {
    await connectDB();
    const proveedorService = new ProveedorService();

    const response = await proveedorService.getAllProveedores();

    if (response?.status !== 200) {
      console.log('Error al obtener todos los proveedores');
      return { proveedores: [], status: 500 };
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

export async function getAllAlmacenesRequestServer() {
  try {
    await connectDB();
    const almacenService = new AlmacenService();

    const response = await almacenService.getAllAlmacenes();

    if (response?.status !== 200) {
      console.log('Error al obtener todos los almacenes');
      return { almacenes: [], status: 500 };
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

export async function getMarcasBySegmentDataForModelosRequestServer(
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

export async function getCategoriesBySegmentDataForModelosRequestServer(
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

export async function createModeloPedidoRequestClient(
  modeloPedidoData,
  setLoading,
) {
  // eslint-disable-next-line no-undef
  return new Promise(async (resolve, reject) => {
    try {
      setLoading(true);
      // Simular tiempo de retraso
      await delay();

      // Obtener los datos de la persona
      const response = await postData(
        createModeloPedidoClientUrl,
        modeloPedidoData,
      );
      if (response?.status !== 201) {
        setLoading(false);
        reject('No se pudo crear el modelo: ' + response.response?.data?.error);
        return;
      }

      setLoading(false);
      resolve(response?.data?.payload);
    } catch (error) {
      setLoading(false);
      reject(error);
    }
  });
}

export async function getMarcaRequestServer(marcaId) {
  try {
    await connectDB();
    const marcaService = new MarcaService();

    const response = await marcaService.getMarcaByData({
      id: marcaId,
    });

    if (response?.status !== 200) {
      console.log('Error al obtener la reservación desde el servidor');
      return { marca: null, status: response?.status };
    }
    const marca = response?.payload;
    return {
      marca: simplificadorParaClientComponent(marca),
      status: 200,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function getCategoryRequestServer(categoryId) {
  try {
    await connectDB();
    const categoryService = new CategoryService();

    const response = await categoryService.getCategoryByData({
      id: categoryId,
    });

    if (response?.status !== 200) {
      console.log('Error al obtener la categoria desde el servidor');
      return { category: null, status: response?.status };
    }
    const category = response?.payload;
    return {
      category: simplificadorParaClientComponent(category),
      status: 200,
    };
  } catch (error) {
    console.log(error);
  }
}
