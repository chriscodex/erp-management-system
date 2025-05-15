import { NextResponse } from 'next/server';
import {
  deleteOrdenDeServicioController,
  updateOrdenDeServicioController,
} from '@/backend/ordenesServicio/infrastructure/controllers';

export async function PATCH(request, contextRoute) {
  try {
    const { payload, status } = await updateOrdenDeServicioController(
      request,
      contextRoute
    );

    if (status !== 200) {
      return NextResponse.json({ error: payload }, { status });
    }

    return NextResponse.json({ payload }, { status });
  } catch (error) {
    console.error(
      `Orden de Servicio Route: Error interno al actualizar la orden de servicio: ${error.message}`
    );
    return NextResponse.json(
      { message: 'Error interno actualizando la orden de servicio' },
      { status: 500 }
    );
  }
}

export async function DELETE(_, contextRoute) {
  try {
    const { payload, status } = await deleteOrdenDeServicioController(contextRoute);

    if (status === 204) {
      return new NextResponse(null, { status });
    }

    return NextResponse.json({ error: payload }, { status });
  } catch (error) {
    console.error(
      `Orden de Servicio Route: Error interno al eliminar la orden de servicio: ${error.message}`
    );
    return NextResponse.json(
      { error: 'Error interno eliminando la orden de servicio' },
      { status: 500 }
    );
  }
}

// export async function PUT(request, contextRoute) {
//   try {
//     const { payload, status } = await updateOrdenDeServicioController(
//       request,
//       contextRoute
//     );

//     if (status !== 201) {
//       return NextResponse.json({ error: payload }, { status });
//     }

//     return NextResponse.json({ payload }, { status });
//   } catch (error) {
//     console.error(
//       `Orden de Servicio Route: Error interno al actualizar la orden de servicio: ${error.message}`
//     );
//     return NextResponse.json(
//       { message: 'Error interno al actualizar la orden de servicio' },
//       { status: 500 }
//     );
//   }
// }
