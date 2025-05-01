import { NextResponse } from "next/server";
import {
  getClientesRequestHandlerController,
  createClienteController,
} from "@/backend/clientes/infrastructure/controllers";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const { payload, status } = await getClientesRequestHandlerController(request);

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Cliente Route: Error interno al obtener los clientes: ${error.message}`
    );
    return NextResponse.json(
      { message: 'Error obteniendo los clientes' },
      { status: 500 }
    );
  }
}

// export async function GET(request) {
//   try {
//     // console.log("este es el request", request);
//     const { searchParams } = new URL(request.url);

//     const dni = searchParams.get("dni");
//     const ruc = searchParams.get("ruc");

//     // Si viene dni o ruc en los searchParams, pasar todo el request al controller
//     if (dni || ruc) {
//       const { payload, status } = await getClienteByDataController(request);

//       if (status !== 200) {
//         return NextResponse.json({ error: payload }, { status });
//       }

//       return NextResponse.json({ payload }, { status });
//     }

//     // Si no hay dni ni ruc, traer todos los clientes
//     const { payload, status } = await getClientesController();

//     if (status !== 200) {
//       return NextResponse.json({ error: payload }, { status });
//     }

//     return NextResponse.json({ payload }, { status });
//   } catch (error) {
//     console.error(
//       `Cliente Route: Error interno al obtener los clientes: ${error.message}`
//     );
//     return NextResponse.json(
//       { message: "Error obteniendo los clientes" },
//       { status: 500 }
//     );
//   }
// }

export async function POST(request) {
  try {
    const { payload, status } = await createClienteController(request);

    if (status !== 201) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Cliente Route: Error interno al crear el cliente: ${error.message}`
    );
    return NextResponse.json(
      { error: "Error interno al crear el cliente" },
      { status: 500 }
    );
  }
}
