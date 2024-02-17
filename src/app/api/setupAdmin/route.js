import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

import { connectDB } from '@/db/mongodb';
import { User } from '@/backend/users/domain/models/user';

export async function POST() {
  try {
    await connectDB();

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

    const existingAdmin = await User.findOne({ dni: adminData.dni });

    if (!existingAdmin) {
      await User.create(adminData);
      return NextResponse.json(
        { message: 'Superusuario creado correctamente' },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: 'El superusuario ya existe' },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('Error al verificar/crear el superusuario:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
