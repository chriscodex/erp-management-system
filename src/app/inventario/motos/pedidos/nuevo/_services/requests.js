import { postData } from "@/lib/fetchData";
import { createPedidoClientUrl } from "@/lib/urls";
import { delay} from "@/lib/utils";

export async function createPedidoRequestClient(pedidoData, setLoading) {
  /* eslint-disable */
  return new Promise(async (resolve, reject) => {
    /* eslint-enable */
    try {
      setLoading(true);
      // Simular tiempo de retraso para pruebas en la UI
      await delay();

      const pedidoDataFormated = {
        modelo: {
          modeloId: pedidoData.modeloId,
          nombre: pedidoData.modelo.nombre,
          descripcion: pedidoData.modelo.descripcion,
          stockMinimo: Number(pedidoData.modelo.stockMinimo),
          marcaId: String(pedidoData.modelo.marcaId._id),
          categoryId: String(pedidoData.modelo.categoryId._id),
        },
        moto: {
          nombre: pedidoData.moto.nombre,
          descripcion: pedidoData.moto.descripcion,
          caracteristicas: pedidoData.caracteristicas,
          cantidad: 1,
          importado: pedidoData.importado,
        },
        estadoPago: pedidoData.estadoTitle,
        // montoPagado: pedidoData.montoPagado,
        montoPagado: pedidoData.montoPagado ? Number(pedidoData.montoPagado) : 0,
        montoTotal: pedidoData.montoTotal,
        fechaPago: pedidoData.fechaPago,
        comentario: pedidoData.comentario,
        proveedorId: pedidoData.proveedorId,
        almacenId: pedidoData.almacenId,
      };

      console.log("Pedido data formateado en el request", pedidoDataFormated);

      const response = await postData(
        createPedidoClientUrl,
        pedidoDataFormated
      );
      if (response?.status !== 201) {
        setLoading(false);
        reject("No se pudo crear el pedido: " + response.response?.data?.error);
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
