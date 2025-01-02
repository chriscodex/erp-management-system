import { Schema, model, models } from 'mongoose';

// Eliminar el modelo en caso no considere los cambios
// if (models.searchedUserSchema) {
//   delete models.searchedUserSchema;
// }

const searchedUserSchema = new Schema({
  dni: {
    type: String,
    unique: true,
    required: false,
  },
  apellidos: {
    type: String,
    required: false,
  },
  nombres: {
    type: String,
    required: false,
  },
  ruc: {
    type: String,
    unique: true,
    required: false,
  },
  razonSocial: {
    type: String,
    required: false,
  }
});

const SearchedUser =
  models?.SearchedUser || model('SearchedUser', searchedUserSchema);

export { SearchedUser };
