import { fetchData, postData } from '@/lib/fetchData';
import {
  createPreventaClientUrl,
  getMotoByCodeClientUrl,
  getProductByCodeClientUrl,
  searchClienteClientUrl,
} from '@/lib/urls';
import { delay } from '@/lib/utils';

export function searchClientePorDniOrRucClientRequest(
  identificador,
  setLoading
) {
  // eslint-disable-next-line
  return new Promise(async (resolve, reject) => {
    try {
      setLoading(true);
      // Simular tiempo de retraso

      await delay();

      if (identificador?.length !== 8 && identificador?.length !== 11) {
        setLoading(false);
        reject('Por favor, ingrese un DNI o RUC válido');
        return;
      }

      if (identificador?.length === 8) {
        const response = await fetchData(
          `${searchClienteClientUrl}?dni=${identificador}`
        );
        if (response?.status !== 200) {
          setLoading(false);
          reject('No se ha encontrado una persona con ese DNI');
          return;
        }
        setLoading(false);
        resolve(response?.data?.payload);
      }

      if (identificador?.length === 11) {
        const response = await fetchData(
          `${searchClienteClientUrl}?ruc=${identificador}`
        );
        if (response?.status !== 200) {
          setLoading(false);
          reject('No se ha encontrado una empresa con ese RUC');
          return;
        }
        setLoading(false);
        resolve(response?.data?.payload);
      }
    } catch (error) {
      setLoading(false);
      reject(error);
    }
  });
}

export function getProductByCodeClientRequest(code, setLoading) {
  // eslint-disable-next-line
  return new Promise(async (resolve, reject) => {
    try {
      setLoading(true);
      // Simular tiempo de retraso

      await delay();

      const responseProduct = await fetchData(
        `${getProductByCodeClientUrl}/?unit-code=${code}`
      );

      if (responseProduct?.status === 200 && responseProduct?.data?.payload) {
        setLoading(false);
        resolve(responseProduct?.data?.payload);
        return;
      }

      const responseMoto = await fetchData(
        `${getMotoByCodeClientUrl}/?code=${code}`
      );

      if (responseMoto?.status === 200 && responseMoto?.data?.payload) {
        setLoading(false);
        resolve(responseMoto?.data?.payload);
        return;
      }

      setLoading(false);
      reject('No se ha encontrado un producto o moto con ese código');
    } catch (error) {
      setLoading(false);
      reject(error);
    }
  });
}

export function getObsequioByCodeClientRequest(code, setLoading) {
  // eslint-disable-next-line
  return new Promise(async (resolve, reject) => {
    try {
      setLoading(true);
      // Simular tiempo de retraso

      await delay();

      const responseProduct = await fetchData(
        `${getProductByCodeClientUrl}/?obsequio-code=${code}`
      );

      if (responseProduct?.status === 200 && responseProduct?.data?.payload) {
        setLoading(false);
        resolve(responseProduct?.data?.payload);
        return;
      } else {
        const responseProduct = await fetchData(
          `${getProductByCodeClientUrl}/?unit-code=${code}`
        );

        if (responseProduct?.status === 200 && responseProduct?.data?.payload) {
          setLoading(false);
          reject(
            'Se ha encontrado el producto, pero no está marcado como obsequio'
          );
          return;
        }
      }

      setLoading(false);
      reject('No se ha encontrado un producto con ese código');
    } catch (error) {
      setLoading(false);
      reject(error);
    }
  });
}

export async function createPreventaRequestClient(preventaData, setLoading) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      setLoading(true);
      // Simular tiempo de retraso
      await delay();

      let productsFormated = [];
      let obsequiosFormated = [];
      // Formatear los productos
      if (preventaData?.productos?.length > 0) {
        productsFormated = preventaData?.productos?.map((producto) => {
          if (producto.tipo === 'moto') {
            const motoObject = {
              ...producto,
              almacenId: producto?.almacenId?._id,
              proveedorId: producto?.proveedorId?._id,
              marcaId: producto?.modeloId?.marcaId?._id,
              categoryId: producto?.modeloId?.categoryId?._id,
              modeloId: producto?.modeloId?._id,
            };

            delete motoObject?.internalId;
            delete motoObject?.numeracion;

            return motoObject;
          } else {
            const unitProducto = producto?.unidades?.find(
              (unit) => unit?.code === producto?.code
            );
            const productoObject = {
              ...producto,
              almacenId: producto?.almacenId?._id,
              categoryId: producto?.categoryId?._id,
              marcaId: producto?.marcaId?._id,
              proveedorId: producto?.proveedorId?._id,
              estado: unitProducto?.estado,
            };

            delete productoObject?.unidades;
            delete productoObject?.internalId;
            delete productoObject?.numeracion;
            delete productoObject?.stock;
            delete productoObject?.stockMinimo;

            return productoObject;
          }
        });
      }

      // Formatear los obsequios
      if (preventaData?.obsequios?.length > 0) {
        obsequiosFormated = preventaData?.obsequios?.map((obsequio) => {
          const unitObsequio = obsequio?.unidades?.find(
            (unit) => unit?.code === obsequio?.code
          );

          const obsequioObject = {
            ...obsequio,
            almacenId: obsequio?.almacenId?._id,
            categoryId: obsequio?.categoryId?._id,
            marcaId: obsequio?.marcaId?._id,
            proveedorId: obsequio?.proveedorId?._id,
            estado: unitObsequio?.estado,
          };

          delete obsequioObject?.unidades;
          delete obsequioObject?.internalId;
          delete obsequioObject?.numeracion;
          delete obsequioObject?.precioVenta;
          delete obsequioObject?.stock;
          delete obsequioObject?.stockMinimo;

          return obsequioObject;
        });
      }

      const preventaDataFormated = {
        ...preventaData,
        productos: productsFormated,
        obsequios: obsequiosFormated,
      };

      console.log('preventaDataFormated', preventaDataFormated);

      // Obtener los datos de la persona
      // const response = await postData(createPreventaClientUrl, preventaData);
      // if (response?.status === 409) {
      //   setLoading(false);
      //   reject('No se pudo crear la marca: ' + response.response?.data?.error);
      //   return;
      // }
      // if (response?.status !== 201) {
      //   setLoading(false);
      //   reject('No se pudo crear la marca: ' + response.response?.data?.error);
      //   return;
      // }

      setLoading(false);
      // resolve(response?.response?.data?.payload);
    } catch (error) {
      setLoading(false);
      reject(error);
    }
  });
}
