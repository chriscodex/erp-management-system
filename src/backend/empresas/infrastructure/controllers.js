import { EmpresaService } from "@/backend/empresas/application/empresa.service";
import { connectDB } from "@/db/mongodb";

const empresaService = new EmpresaService();

export async function getEmpresasController() {
  try {
    await connectDB();
    const users = await empresaService.getAllEmpresas();
    return users;
  } catch (error) {
    console.error(
      "Empresas Controller: Error interno al obtener todos las empresas:",
      error.message
    );
    throw new Error(
      "Empresas Controller: Error interno al obtener todos las empresas"
    );
  }
}

export async function getEmpresaByDataController(contextRoute) {
  try {
    const { params } = contextRoute;
    const { id } = params;

    await connectDB();

    const empresa = await empresaService.getEmpresaByData({ ruc: id });
    return empresa;
  } catch (error) {
    console.error(
      "Empresas Controller: Error interno al obtener la empresa:",
      error.message
    );
    throw new Error("Empresas Controller: Error interno al obtener la empresa");
  }
}

export async function createEmpresaController(request) {
  try {
    const body = await request.json();

    await connectDB();

    /* Responses { payload, status} */
    const createdEmpresa = await empresaService.createEmpresa(body);

    return createdEmpresa;
  } catch (error) {
    console.error(
      "Empresas Controller: Error interno al crear la empresa:",
      error.message
    );
    throw new Error("Empresas Controller: Error interno al crear la empresa");
  }
}

export async function updateEmpresaController(request, contextRoute) {
  try {
    const { params } = contextRoute;
    const { id } = params;
    const body = await request.json();

    await connectDB();

    const updatedEmpresa = await empresaService.updateEmpresa(id, body);
    return updatedEmpresa;
  } catch (error) {
    console.error(
      "Empresas Controller: Error interno al actualizar la empresa:",
      error.message
    );
    throw new Error(
      "Empresas Controller: Error interno al actualizar la empresa"
    );
  }
}

export async function deleteEmpresaController(contextRoute) {
  try {
    const { params } = contextRoute;
    const { id: empresaId } = params;

    await connectDB();

    const deletedEmpresa = await empresaService.deleteEmpresa(empresaId);
    return deletedEmpresa;
  } catch (error) {
    console.error(
      "Empresas Controller: Error interno eliminando la empresa:",
      error.message
    );
    throw new Error("Empresas Controller: Error interno eliminando la empresa");
  }
}
