/* Users */
export const getAllUsersServerUrl = `${process.env.NEXT_PUBLIC_API_URL}/users`;
export const getUserServerUrl = `${process.env.NEXT_PUBLIC_API_URL}/users`;
export const createUserClientUrl = '/api/users';
export const updateUserClientUrl = '/api/users';
export const deleteUserClientUrl = '/api/users';

/* Categories */
export const getAllCategoriesServerUrl = `${process.env.NEXT_PUBLIC_API_URL}/categories`;
export const getCategoriesBySegmentDataServerUrl = `${process.env.NEXT_PUBLIC_API_URL}/categories`;
export const createCategoryClientUrl = '/api/categories';
export const updateCategoryClientUrl = '/api/categories';
export const deleteCategoryClientUrl = '/api/categories';

/* Marcas */
export const getAllMarcasServerUrl = `${process.env.NEXT_PUBLIC_API_URL}/marcas`;
export const getMarcaServerUrl = `${process.env.NEXT_PUBLIC_API_URL}/marcas`;
export const getMarcasBySegmentDataServerUrl = `${process.env.NEXT_PUBLIC_API_URL}/marcas`;
export const createMarcaClientUrl = '/api/marcas';
export const updateMarcaClientUrl = '/api/marcas';
export const deleteMarcaClientUrl = '/api/marcas';

/* Almacen */
export const getAllAlmacenesServerUrl = `${process.env.NEXT_PUBLIC_API_URL}/almacenes`;

/* Products */
export const getAllProductsServerUrl = `${process.env.NEXT_PUBLIC_API_URL}/products`;
export const getProductByIdServerUrl = `${process.env.NEXT_PUBLIC_API_URL}/products`;
export const createProductClientUrl = '/api/products';

/* Proveedores */
export const getAllProveedoresServerUrl = `${process.env.NEXT_PUBLIC_API_URL}/proveedores`;

/* Segments */
export const getAllSegmentsServerUrl = `${process.env.NEXT_PUBLIC_API_URL}/segments`;
export const getSegmentsByFilterServerUrl = `${process.env.NEXT_PUBLIC_API_URL}/segments`;
