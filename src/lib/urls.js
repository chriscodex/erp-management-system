/* Users */
export const getAllUsersUrl = `${process.env.NEXT_PUBLIC_API_URL}/users`;
export const getUserUrl = `${process.env.NEXT_PUBLIC_API_URL}/users`;
export const createUserUrl = '/api/users';
export const updateUserUrl = '/api/users';
export const deleteUserUrl = '/api/users';

/* Categories */
export const getAllSegmentsUrl = `${process.env.NEXT_PUBLIC_API_URL}/segments`;
export const getAllCategoriesUrl = `${process.env.NEXT_PUBLIC_API_URL}/categories`;
export const getAllCategoriesServerUrl = `${process.env.NEXT_PUBLIC_API_URL}/categories`;
export const getCategoriesBySegmentDataServerUrl = `${process.env.NEXT_PUBLIC_API_URL}/categories`;
export const createCategoryUrl = '/api/categories';
export const updateCategoryUrl = '/api/categories';
export const deleteCategoryUrl = '/api/categories';

/* Marcas */
export const getAllMarcasUrl = `${process.env.NEXT_PUBLIC_API_URL}/marcas`;
export const getAllMarcasServerUrl = `${process.env.NEXT_PUBLIC_API_URL}/marcas`;
export const getMarcaUrl = `${process.env.NEXT_PUBLIC_API_URL}/marcas`;
export const getMarcasBySegmentDataServerUrl = `${process.env.NEXT_PUBLIC_API_URL}/marcas`;
export const createMarcaUrl = '/api/marcas';
export const updateMarcaUrl = '/api/marcas';
export const deleteMarcaUrl = '/api/marcas';

/* Almacen */
export const getAllAlmacenesServerUrl = `${process.env.NEXT_PUBLIC_API_URL}/almacenes`;
export const getAlmacenUrl = `${process.env.NEXT_PUBLIC_API_URL}/almacenes`;

/* Products */
export const getAllProductsUrl = `${process.env.NEXT_PUBLIC_API_URL}/products`;
export const getProductByIdUrl = `${process.env.NEXT_PUBLIC_API_URL}/products`;
export const createProductClientUrl = '/api/products';

/* Proveedores */
export const getAllProveedoresServerUrl = `${process.env.NEXT_PUBLIC_API_URL}/proveedores`;

/* Segments */
export const getAllSegmentsServerUrl = `${process.env.NEXT_PUBLIC_API_URL}/segments`;
export const getSegmentsByFilterServerUrl = `${process.env.NEXT_PUBLIC_API_URL}/segments`;
