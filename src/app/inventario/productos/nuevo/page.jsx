import {
  getAllCategoriesRequest,
  getAllProveedoresRequest,
  getMarcasBySegmentDataRequest,
} from '@/app/inventario/productos/nuevo/_services/requests';
import { FormAddProduct } from '@/app/inventario/productos/nuevo/_components/FormAddProduct';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default async function AddProductPage() {
  const [marcasResponse, proveedoresResponse] = await Promise.all([
    getMarcasBySegmentDataRequest({ segmentName: 'Productos' }),
    getAllProveedoresRequest(),
  ]);

  const { marcas } = marcasResponse;
  // const { categories } = categoriesResponse;
  const { proveedores } = proveedoresResponse;

  return (
    <div className="container mx-auto p-6">
      <Card className="w-full max-w-7xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Agregar Producto</CardTitle>
          <CardDescription>
            Complete los detalles del nuevo producto a continuación.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormAddProduct
            marcas={marcas}
            // categories={categories}
            proveedores={proveedores}
          />
        </CardContent>
      </Card>
    </div>
  );
}
