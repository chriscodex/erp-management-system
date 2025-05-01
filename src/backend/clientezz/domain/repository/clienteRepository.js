import {
  EmpresaCliente,
  PersonaCliente,
} from '@/backend/clientes/domain/models/clienteBaseSchema';

export class ClienteRepository {
  async getClienteFromDatabase(identificador) {
    try {
      console.log('identificador', identificador);
      const personaCliente = await PersonaCliente.findOne({
        dni: identificador,
      });

      if (personaCliente) {
        console.log('PersonaCliente encontrada');
        return personaCliente;
      }

      const empresaCliente = await EmpresaCliente.findOne({
        ruc: identificador,
      });

      if (empresaCliente) {
        console.log('EmpresaCliente encontrada');
        return empresaCliente;
      }

      console.log('Persona o Empresa no encontradas en la base de datos');
      return null;
    } catch (error) {
      throw new Error(
        `Error al buscar la persona o empresa en la base de datos: ${error.message}`
      );
    }
  }

  async createPersonaCliente(personaData) {
    try {
      const personaCliente = new PersonaCliente(personaData);
      await personaCliente.save();
      console.log('PersonaCliente creado en la base de datos');
      return personaCliente;
    } catch (error) {
      throw new Error(
        `Error al crear la persona en la base de datos: ${error.message}`
      );
    }
  }

  async createEmpresaCliente(empresaData) {
    try {
      const empresaCliente = new EmpresaCliente(empresaData);
      await empresaCliente.save();
      console.log('EmpresaCliente creado en la base de datos');
      return empresaCliente;
    } catch (error) {
      throw new Error(
        `Error al crear la empresa en la base de datos: ${error.message}`
      );
    }
  }
}
