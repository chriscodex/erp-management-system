import { notFound } from "next/navigation";
import {
  RiArchiveLine,
  RiFileListLine,
  RiMotorbikeFill,
} from "@remixicon/react";
import { Package, DollarSign } from "lucide-react";
// import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  getAllAlmacenesRequestServer,
  getAllMotosByAlmacenIdRequestServer,
  getAllProductsByAlmacenIdRequestServer,
} from "@/app/inventario/almacenes/_services/requests.js";
import { SheetAddAlmacenWrapper } from "@/app/inventario/almacenes/_components/sheets/addAlmacen/sheetAddAlmacenWrapper";
import { NavbarDynamic } from "@/components/navbar/NavbarDynamic";
import { AlmacenDetail } from "@/app/inventario/almacenes/_components/sheets/almacenDetail";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { SheetUpdateAlmacenWrapper } from "@/app/inventario/almacenes/_components/sheets/updateAlmacen/sheetUpdateAlmacenWrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function CompaniesPage() {

const session = await getServerSession(authOptions);
  if (session?.user?.rol !== "Administrador") {
      notFound();
    }

  const { almacenes } = await getAllAlmacenesRequestServer();

  const titles = [
    {
      title: "Inventario",
      href: "",
      active: false,
    },
    {
      title: "Almacén",
      href: "",
      active: false,
    },
  ];

  // eslint-disable-next-line no-undef
  await Promise.all(
    almacenes.map(async (almacen) => {
      const motosByAlmacen = await getAllMotosByAlmacenIdRequestServer(
        almacen._id
      );
      const productsByAlmacen = await getAllProductsByAlmacenIdRequestServer(
        almacen._id
      );

      const totalProductos = productsByAlmacen?.products?.reduce(
        (acumulador, producto) => {
          return acumulador + producto?.stock;
        },
        0
      );

      const totalPrecioCompraProductos = productsByAlmacen?.products?.reduce(
        (acumulador, producto) => {
          return acumulador + producto?.stock * producto?.precioCompra;
        },
        0
      );

      const totalTiposProductos = productsByAlmacen?.products?.length;

      almacen.totalMotos = motosByAlmacen?.motos?.length;
      almacen.totalProducts = totalProductos;
      almacen.totalTiposProductos = totalTiposProductos;
      almacen.totalPrecioCompraProductos = totalPrecioCompraProductos;
    })
  );

  return (
    <NavbarDynamic titles={titles}>
      <Card>
        <CardHeader className="mb-8 flex flex-row items-center justify-between space-y-0 pb-2 gap-2">
          <div>
            <div className="flex items-center space-x-2">
              <RiArchiveLine className="h-9 w-9 text-muted-foreground" />
              <h1 className="text-3xl font-bold">Almacén</h1>
            </div>
            <p className="text-muted-foreground mt-2">
              Administra y supervisa tus almacenes
            </p>
          </div>
          <SheetAddAlmacenWrapper />
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {almacenes?.map((almacen) => (
            <Card key={almacen?._id} className="flex flex-col">
              <CardHeader>
                <div className="flex lg:flex-row flex-col gap-2 justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">
                      {almacen?.nombre}
                    </CardTitle>
                    <CardDescription className="flex flex-col">
                      <p>{almacen?.descripcion}</p>
                    </CardDescription>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div>
                      {almacen?.estado === "activo" ? (
                        <Badge
                          variant="successTable"
                          className="text-sm flex justify-center"
                        >
                          Activo
                        </Badge>
                      ) : (
                        <Badge variant="error" className="text-sm">
                          Inactivo
                        </Badge>
                      )}
                    </div>
                    <Badge variant="secondary" className="text-sm">
                      ID: {almacen?._id}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 grid grid-cols-2 gap-4 border rounded-xl py-4 px-1">
                    <div className="flex items-center">
                      <Package className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span className="text-sm">
                        {almacen?.totalTiposProductos} tipos de productos
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Package className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span className="text-sm">
                        {almacen?.totalProducts} unidades
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <RiMotorbikeFill className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span className="text-sm">{almacen?.totalMotos} motos</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span className="text-sm">
                      P.C Total: S/.{" "}
                      {parseFloat(almacen?.totalPrecioCompraProductos).toFixed(
                        2
                      )}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                {/* {session?.user?.rol === "Administrador" && (
                  <SheetUpdateAlmacenWrapper almacenData={almacen} />
                )} */}
                <SheetUpdateAlmacenWrapper almacenData={almacen} />
                <div>
                  <Sheet>
                    <SheetTrigger className="flex items-center justify-start">
                      <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground p-2">
                        <RiFileListLine />
                        Ver Detalles
                      </div>
                    </SheetTrigger>
                    <AlmacenDetail almacenData={almacen} />
                  </Sheet>
                </div>
                {/* <Button
                  className="lg:col-start-2 col-start-1"
                  variant="default"
                  asChild
                >
                  <Link href={`/empresas/${almacen?._id}/dashboard`}>
                    Movimientos
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button> */}
              </CardFooter>
            </Card>
          ))}
        </CardContent>
      </Card>
    </NavbarDynamic>
  );
}
