import { NotificacionRepository } from "@/backend/ordenesServicio/domain/repositories/ordenServicioRepository";
import { ProductRepository } from "@/backend/products/domain/repositories/productRepository";


export class NotificacionService {
  constructor() {
    this.notificacionRepository = new NotificacionRepository();
    this.productRepository = new ProductRepository();
  }

  async getProductsLowStockNotification() {
    try {
      const products = await this.productRepository.getAllProducts();

      if (products?.length === 0) {
        console.log("Notificacion Service: No se encontraron productos");
        return {
          status: 200,
          payload: [],
        };
      }

      console.log("Notificacion Service: Productos encontrados");

      // return {
      //   status: 200,
      //   payload: products,
      // };

      const lowStockProducts = products.filter((prod) => {
        const stock = prod.stock ?? 0;
        const stockMinimo = prod.stockMinimo ?? 0;
        return stock <= stockMinimo;
      });

      if (lowStockProducts.length === 0) {
        return {
          status: 200,
          payload: [],
        };
      }

      const notificacion = {
        type: "low_stock",
        message: `Hay ${lowStockProducts.length} productos con stock bajo.`,
        productos: lowStockProducts.map((product) => ({
          id: product.id,
          nombre: product.nombre,
          stock: product.stock,
          stockMinimo: product.stockMinimo,
        })),
      };

      return {
        status: 200,
        payload: [notificacion],
      };

    } catch (error) {
      console.error(
        `Notificacion Service: Error interno al buscar los productos: ${error.message}`
      );
      return {
        status: 500,
        payload: error.message,
      };
    }
  }
}

