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
      error.message,
    );
    throw new Error(
      'Proveedor Controller: Error interno al crear el proveedor',
    );
  }
}

export async function updateProveedorController(request, contextRoute) {
  try {
    const { params } = contextRoute;
    const { proveedorId } = params;
    const body = await request.json();

    await connectDB();

    const updatedProveedor = await proveedorService.updateProveedor(
      proveedorId,
      body,
    );
    return updatedProveedor;
  } catch (error) {
    console.error(
      'Proveedor Controller: Error interno al actualizar el proveedor:',
      error.message,
    );
    throw new Error(
      'Proveedor Controller: Error interno al actualizar el proveedor',
    );
  }
}

export async function deleteProveedorController(contextRoute) {
  try {
    const { params } = contextRoute;
    const { proveedorId } = params;

    await connectDB();

    const deletedProveedor =
      await proveedorService.deleteProveedor(proveedorId);

    return deletedProveedor;
  } catch (error) {
    console.error(
      'Proveedor Controller: Error interno al eliminar un proveedor:',
      error.message,
    );
    throw new Error(
      'Proveedor Controller: Error interno al eliminar un proveedor',
    );
  }
}
