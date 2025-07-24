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

      //Para el error prevendido
      if (
        responseProduct?.status === 201 &&
        responseProduct?.data?.error?.message
      ) {
        setLoading(false);
        return reject(responseProduct.data.error.message);
      }

      const responseMoto = await fetchData(
        `${getMotoByCodeClientUrl}/?code=${code}`
      );

      //Para el error prevendido
      if (
        responseMoto?.status === 201 &&
        responseMoto?.data?.error?.message
      ) {
        setLoading(false);
        return reject(responseMoto.data.error.message);
      }

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
              almacen: producto?.almacenId?.nombre,
              proveedor: producto?.proveedorId?.nombre,
              marca: producto?.modeloId?.marcaId?.nombre,
              category: producto?.modeloId?.categoryId?.nombre,
              modelo: producto?.modeloId?.nombre,
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
              almacen: producto?.almacenId?.nombre,
              category: producto?.categoryId?.nombre,
              marca: producto?.marcaId?.nombre,
              proveedor: producto?.proveedorId?.nombre,
              estado: unitProducto?.estado,
              unitId: unitProducto?._id,
              productId: producto?._id,
            };

            delete productoObject?.unidades;
            delete productoObject?.internalId;
            delete productoObject?.numeracion;
            delete productoObject?.stock;
            delete productoObject?.stockMinimo;
            delete productoObject?._id;

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
            almacen: obsequio?.almacenId?._id,
            category: obsequio?.categoryId?._id,
            marca: obsequio?.marcaId?._id,
            proveedor: obsequio?.proveedorId?._id,
            estado:
              obsequio?.nombre === 'SOAT' ? 'Disponible' : unitObsequio?.estado,
            unitId: unitObsequio?._id,
            productId: obsequio?._id,
          };

          delete obsequioObject?.unidades;
          delete obsequioObject?.internalId;
          delete obsequioObject?.numeracion;
          delete obsequioObject?.precioVenta;
          delete obsequioObject?.stock;
          delete obsequioObject?.stockMinimo;
          delete obsequioObject?._id;

          return obsequioObject;
        });
      }

      let clienteData = {};
      if (preventaData?.tipo === 'persona') {
        clienteData = {
          dni: preventaData?.identificador,
          nombres: preventaData?.nombres,
          apellidos: preventaData?.apellidos,
          direccion:
            preventaData?.direccion?.trim() === ""
              ? undefined
              : preventaData?.direccion?.trim(),
          email:
            preventaData?.email?.trim() === ""
              ? undefined
              : preventaData?.email?.trim(),
          celular:
            preventaData?.celular?.trim() === ""
              ? undefined
              : preventaData?.celular?.trim(),
        };
      }
      if (preventaData?.tipo === 'empresa') {
        clienteData = {
          ruc: preventaData?.identificador,
          razonSocial: preventaData?.razonSocial,
          representanteLegal: preventaData?.representanteLegal,
          direccion: preventaData?.direccion,
          email:
            preventaData?.email?.trim() === ""
              ? undefined
              : preventaData?.email?.trim(),
          celular:
            preventaData?.celular?.trim() === ""
              ? undefined
              : preventaData?.celular?.trim(),
        };
      }

      const preventaObject = {
        fecha: new Date().toISOString(),
        cliente: {
          tipo: preventaData?.tipo,
          datos: clienteData,
        },
        usuario: {
          id: preventaData?.user?._id,
          dni: preventaData?.user?.dni,
          rol: preventaData?.user?.rol,
          nombres: preventaData?.user?.nombres,
          apellidos: preventaData?.user?.apellidos,
        },
        sucursalId: preventaData?.sucursalId,
        comentarios:
          preventaData?.comentarios?.trim() === ""
            ? undefined
            : preventaData?.comentarios?.trim(),
        cotizacion: preventaData?.cotizacion,
        fechaValidez: preventaData?.fechaValidez,
        productos: productsFormated,
        obsequios: obsequiosFormated,
      };
      // Obtener los datos de la persona
      const response = await postData(createPreventaClientUrl, preventaObject);
      if (response?.status !== 201) {
        setLoading(false);
        reject(
          'No se pudo crear la preventa: ' + response.response?.data?.error
        );
        return;
      }

      setLoading(false);
      console.log('response', response);
      resolve(response?.data?.payload);
    } catch (error) {
      setLoading(false);
      reject(error);
    }
  });
}
