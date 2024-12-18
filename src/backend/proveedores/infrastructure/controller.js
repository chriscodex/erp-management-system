import { connectDB } from '@/db/mongodb';
import { ProveedorService } from '@/backend/proveedores/application/proveedor.service';

const proveedorService = new ProveedorService();

export async function createProveedorController(request) {
  try {
    const body = await request.json();

    await connectDB();

    const proveedorCreated = await proveedorService.createProveedor(body);
    return proveedorCreated;
  } catch (error) {
    console.error(
      'Proveedor Controller: Error interno al crear el proveedor:',
      error.message
    );
    throw new Error(
      'Proveedor Controller: Error interno al crear el proveedor'
    );
  }
}
