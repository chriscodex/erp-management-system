import { CounterService } from '@/backend/counters/application/counterService';
import { connectDB } from '@/db/mongodb';

const counterService = new CounterService();

export async function getCurrentCounterByType(request) {
  try {
    // Extrae los query parameters de la URL
    const { searchParams } = new URL(request.url);
    const counterType = searchParams.get('type');

    await connectDB();
    const counter = await counterService.getCurrentCounterByType(counterType);
    return counter;
  } catch (error) {
    console.error(
      'Counter Controller: Error interno al obtener los datos del counter:',
      error.message,
    );
    throw new Error(
      'Counter Controller: Error interno al obtener los datos del counter',
    );
  }
}

export async function aumentarContadorByType(request) {
  try {
    const body = await request.json();

    await connectDB();
    const counter = await counterService.aumentarContadorByType(body);
    return counter;
  } catch (error) {
    console.error(
      'Counter Controller: Error interno al aumentar el contador:',
      error.message,
    );
    throw new Error(
      'Counter Controller: Error interno al aumentar el contador',
    );
  }
}
