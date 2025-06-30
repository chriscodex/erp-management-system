import { GastoGeneralService } from "@/backend/gastosGenerales/application/gastoGeneral.service";
import { connectDB } from "@/db/mongodb";

const gastoGeneralService = new GastoGeneralService();

export async function getGastosGeneralesController() {
  try {
    await connectDB();
    const gastosGenerales = await gastoGeneralService.getAllGastosGenerales();
    return gastosGenerales;
  } catch (error) {
    console.error(
      "Gasto General Controller: Error interno al obtener todos los gastos generales:",
      error.message
    );
    throw new Error(
      "Gasto General Controller: Error interno al obtener todos los gastos generales"
    );
  }
}

export async function getGastoGeneralByDataController(contextRoute) {
  try {
    const { params } = contextRoute;
    const { id } = params;

    await connectDB();

    const gastoGeneral = await gastoGeneralService.getGastoGeneralByData({ _id: id });
    return gastoGeneral;
  } catch (error) {
    console.error(
      "Gasto General Controller: Error interno al obtener el gasto general:",
      error.message
    );
    throw new Error("Gasto General Controller: Error interno al obtener el gasto general");
  }
}

export async function createGastoGeneralController(request) {
  try {
    const body = await request.json();

    await connectDB();

    /* Responses { payload, status} */
    const createdGastoGeneral = await gastoGeneralService.createGastoGeneral(body);

    return createdGastoGeneral;
  } catch (error) {
    console.error(
      "Gasto General Controller: Error interno al crear el gasto general:",
      error.message
    );
    throw new Error("GastosGeneral Controller: Error interno al crear el gasto general");
  }
}

export async function updateGastoGeneralController(request, contextRoute) {
  try {
    const { params } = contextRoute;
    const { id } = params;
    const body = await request.json();

    await connectDB();

    const updatedGastoGeneral = await gastoGeneralService.updateGastoGeneral(id, body);
    return updatedGastoGeneral;
  } catch (error) {
    console.error(
      "Gasto General Controller: Error interno al actualizar el gasto general",
      error.message
    );
    throw new Error(
      "Gasto General Controller: Error interno al actualizar el gasto general"
    );
  }
}

export async function deleteGastoGeneralController(contextRoute) {
  try {
    const { params } = contextRoute;
    const { id: gastoGeneralId } = params;

    await connectDB();

    const deletedGastoGeneral = await gastoGeneralService.deleteGastoGeneral(gastoGeneralId);
    return deletedGastoGeneral;
  } catch (error) {
    console.error(
      "Gasto General Controller: Error interno eliminando el gasto general",
      error.message
    );
    throw new Error("Gasto General Controller: Error interno eliminando el gasto general");
  }
}