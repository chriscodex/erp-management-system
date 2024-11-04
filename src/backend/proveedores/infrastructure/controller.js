import { connectDB } from '@/db/mongodb';
import { ProveedorService } from '@/backend/proveedores/application/proveedor.service';

const proveedorService = new ProveedorService();

export async function getAllProveedoresController() {
  try {
    await connectDB();
    const proveedores = await proveedorService.getAllProveedores();
    return proveedores;
  } catch (error) {
    console.error('Controller: Error obteniendo todas los proveedores:', error);
    throw new Error(
      'Controller: Internal Server Error - getAllProveedoresController'
    );
  }
}
