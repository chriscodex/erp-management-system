import { SucursalService } from "@/backend/sucursales/application/sucursal.service";
import { connectDB } from "@/db/mongodb";

const sucursalService = new SucursalService();

export async function getSucursalesController() {
  try {
    await connectDB();
    const sucursales = await sucursalService.getAllSucursales();
    return sucursales;
  } catch (error) {
    console.error(
      "Sucursales Controller: Error interno al obtener todos las sucursales:",
      error.message
    );
    throw new Error(
      "Sucursales Controller: Error interno al obtener todos las sucursales"
    );
  }
}

export async function getSucursalByDataController(contextRoute) {
  try {
    const { params } = contextRoute;
    const { id } = params;

    await connectDB();

    const sucursal = await sucursalService.getSucursalByData({ ruc: id });
    return sucursal;
  } catch (error) {
    console.error(
      "Sucursales Controller: Error interno al obtener la sucursal:",
      error.message
    );
    throw new Error("Sucursales Controller: Error interno al obtener la sucursal");
  }
}

export async function createSucursalController(request) {
  try {
    const body = await request.json();

    await connectDB();

    /* Responses { payload, status} */
    const createdSucursal = await sucursalService.createSucursal(body);

    return createdSucursal;
  } catch (error) {
    console.error(
      "Sucursales Controller: Error interno al crear la sucursal:",
      error.message
    );
    throw new Error("Sucursales Controller: Error interno al crear la sucursal");
  }
}

export async function updateSucursalController(request, contextRoute) {
  try {
    const { params } = contextRoute;
    const { id } = params;
    const body = await request.json();

    await connectDB();

    const updatedSucursal = await sucursalService.updateSucursal(id, body);
    return updatedSucursal;
  } catch (error) {
    console.error(
      "Sucursales Controller: Error interno al actualizar la sucursal:",
      error.message
    );
    throw new Error(
      "Sucursales Controller: Error interno al actualizar la sucursal"
    );
  }
}

export async function deleteSucursalController(contextRoute) {
  try {
    const { params } = contextRoute;
    const { id: sucursalId } = params;

    await connectDB();

    const deletedSucursal = await sucursalService.deleteSucursal(sucursalId);
    return deletedSucursal;
  } catch (error) {
    console.error(
      "Sucursales Controller: Error interno eliminando la sucursal:",
      error.message
    );
    throw new Error("Sucursales Controller: Error interno eliminando la sucursal");
  }
}
