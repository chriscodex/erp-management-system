import { connectDB } from '@/db/mongodb';
import { ProveedorService } from '@/backend/proveedores/application/proveedor.service';

const proveedorService = new ProveedorService();

export async function getProveedoresController() {
  try {
    await connectDB();
    const proveedores = await proveedorService.getAllProveedores();
    return proveedores;
  } catch (error) {
    console.error(
      'Proveedores Controller: Error interno al obtener todas los proveedores:',
      error.message
    );
    throw new Error(
      'Proveedores Controller: Error interno al obtener todas los proveedores'
    );
  }
}
