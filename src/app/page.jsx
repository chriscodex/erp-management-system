import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function HomeRedirect() {

  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/login");
  }

  const rol = session.user.rol;
    
  switch (rol) {
    case "Administrador":
      return redirect("/home/administrador");
    case "Vendedor":
      return redirect("/home/vendedor");
    case "Tecnico":
      return redirect("/home/mecanico");
    default:
      return redirect("/login");
  }
}
