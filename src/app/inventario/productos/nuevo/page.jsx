import {
  getAllProveedoresRequest,
  getMarcasBySegmentDataRequest,
  getCategoriesBySegmentDataRequest,
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
  const [categoriesResponse, marcasResponse, proveedoresResponse] =
    await Promise.all([
      getCategoriesBySegmentDataRequest({ segmentName: 'Productos' }),
      getMarcasBySegmentDataRequest({ segmentName: 'Productos' }),
      getAllProveedoresRequest(),
    ]);

  const { categories } = categoriesResponse;
  const { marcas } = marcasResponse;
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
            categories={categories}
            marcas={marcas}
            proveedores={proveedores}
          />
        </CardContent>
      </Card>
    </div>
  );
}
