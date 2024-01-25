import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

import { connectDB } from '@/db/mongodb';
import { User } from '@/backend/users/domain/models/user';
import { Segment } from '@/backend/segments/domain/models/segment';

export async function POST() {
  try {
    await connectDB();

    // Datos del superusuario
    const adminData = {
      nombres: 'Christian Gonzalo',
      apellidos: 'Espinoza Cadillo',
      dni: '74062106',
      celular: '931140269',
      direccion: 'Jr. 9 de diciembre 686 Carhuaz Carhuaz',
      rol: 'Administrador',
      password: await bcrypt.hash('123', 12), // Contraseña encriptada
      estado: 'activo',
    };

    // Datos de los segmentos
    const segmentsData = [{ nombre: 'Motos' }, { nombre: 'Productos' }];

    // Verificar si el superusuario ya existe
    const existingAdmin = await User.findOne({ dni: adminData.dni });

    if (!existingAdmin) {
      await User.create(adminData);
      console.log('Superusuario creado correctamente');
    } else {
      console.log('El superusuario ya existe');
    }

    // Verificar y crear segmentos si no existen
    const addedSegments = [];
    for (const segment of segmentsData) {
      const existingSegment = await Segment.findOne({ nombre: segment.nombre });
      if (!existingSegment) {
        await Segment.create(segment);
        addedSegments.push(segment.nombre);
      }
    }

    // Retornar la respuesta
    const responseMessage = {
      message: existingAdmin
        ? 'El superusuario ya existía, pero se verificaron/agregaron los segmentos.'
        : 'Superusuario y segmentos creados correctamente.',
      addedSegments:
        addedSegments.length > 0
          ? addedSegments
          : 'No se agregaron nuevos segmentos, todos ya existían.',
    };

    return NextResponse.json(responseMessage, { status: 201 });
  } catch (error) {
    console.error('Error al verificar/crear superusuario o segmentos:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
