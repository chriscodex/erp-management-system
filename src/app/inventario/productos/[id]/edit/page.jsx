import { notFound } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NavbarDynamic } from "@/components/navbar/NavbarDynamic";
import {
  getCategoriesBySegmentDataForModelosRequestServer,
  getMarcasBySegmentDataForModelosRequestServer,
} from "@/app/inventario/motos/modelos/_services/requests";
import { getProductByIdRequestServer } from "@/app/inventario/productos/[id]/_services/requests";
import { UpdateFormProduct } from "@/app/inventario/productos/[id]/edit/_components/updateFormProduct";
import {
  getAllAlmacenesByDataForProductsRequestServer,
  getAllProveedoresByDataForProductsRequestServer,
} from "@/app/inventario/productos/_services/requests";
import { sortByUpdateDateAsc } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const dynamic = "force-dynamic";

export default async function Page({ params }) {
  const session = await getServerSession(authOptions);
  
  if (session?.user?.rol !== "Administrador") {
    notFound();
  }

  // eslint-disable-next-line no-undef
  const results = await Promise.allSettled([
    getProductByIdRequestServer(params.id),
    getCategoriesBySegmentDataForModelosRequestServer({
      segmentName: "Productos",
      categoryEstado: "activo",
    }),
    getMarcasBySegmentDataForModelosRequestServer({
      nombre: "Productos",
      marcaEstado: "activo",
    }),
    getAllProveedoresByDataForProductsRequestServer({ estado: "activo" }),
    getAllAlmacenesByDataForProductsRequestServer({ estado: "activo" }),
  ]);

  const { product } = results[0].value;
  const { categories } = results[1].value ?? [];
  const { marcas } = results[2].value ?? [];
  const { proveedores } = results[3].value ?? [];
  const { almacenes } = results[4].value ?? [];

  const { nombre: productName } = product;

  const almacenesOrderedByCreation = sortByUpdateDateAsc(almacenes);

  if (!product) {
    notFound();
  }

  const navbarTitles = [
    {
      title: "Inventario",
      href: "",
      active: false,
    },
    {
      title: "Productos",
      href: "/inventario/productos",
      active: true,
    },
    {
      title: productName,
      href: `/inventario/productos/${product?._id}`,
      active: true,
    },
    {
      title: "Editar",
      href: "",
      active: false,
    },
  ];

  return (
    <NavbarDynamic titles={navbarTitles}>
      <Card className="w-full max-w-7xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Editar</CardTitle>
        </CardHeader>
        <CardContent>
          <UpdateFormProduct
            productData={product}
            marcas={marcas}
            categories={categories}
            proveedores={proveedores}
            almacenes={almacenesOrderedByCreation}
          />
        </CardContent>
      </Card>
    </NavbarDynamic>
  );
}
