import {
  getAllMarcasRequest,
  getAllCategoriesRequest,
  getAllProveedoresRequest,
} from '@/app/inventario/productos/nuevo/_services/requests';
import { FormAddProduct } from '@/app/inventario/productos/nuevo/_components/FormAddProduct';

export default async function AddProductPage() {
  const [marcasResponse, categoriesResponse, proveedoresResponse] =
    await Promise.all([
      getAllMarcasRequest(),
      getAllCategoriesRequest(),
      getAllProveedoresRequest(),
    ]);

  const { marcas } = marcasResponse;
  const { categories } = categoriesResponse;
  const { proveedores } = proveedoresResponse;

  const segment = 'Productos'

  return <FormAddProduct />;
}
