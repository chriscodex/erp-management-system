import { deleteData, postData } from '@/lib/fetchData';
import { createGastoClientUrl, deleteGastoClientUrl } from '@/lib/urls';
import { delay } from '@/lib/utils';

// export async function getGastosByProductIdServer(id) {
//   try {
//     await connectDB();
//     const productService = new ProductService();

//     const response = await productService.getProductByData({ id });

//     if (response?.status !== 200) {
//       console.log('Error al obtener el producto desde el cliente');
//       return { product: null, status: 500 };
//     }
//     const product = response?.payload;
//     return { product: simplificadorParaClientComponent(product), status: 200 };
//   } catch (error) {
//     console.log(error);
//   }
// }

export async function addGastoRequestClient(productId, gastoData, setLoading) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      setLoading(true);
      // Simular tiempo de retraso
      await delay();

      const url = `${createGastoClientUrl}/${productId}/gastos`;

      const gastoTest = {
        ...gastoData,
      };

      // Obtener los datos de la persona
      const response = await postData(url, gastoTest);
      if (response?.status !== 201) {
        setLoading(false);
        reject('No se pudo crear el gasto: ' + response.response?.data?.error);
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

export async function deleteGastoRequestClient(gastoId, productId) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      console.log(gastoId, productId);
      // Simular tiempo de retraso
      await delay();

      const url = `${deleteGastoClientUrl}/${productId}/gastos/${gastoId}`;

      // Obtener los datos de la persona
      const response = await deleteData(url);
      if (response?.status !== 204) {
        reject(
          'No se pudo eliminar el gasto: ' + response.response?.data?.error
        );
        return;
      }

      resolve(response?.response?.data?.payload);
    } catch (error) {
      reject(error);
    }
  });
}
