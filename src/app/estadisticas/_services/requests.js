import { connectDB } from '@/db/mongodb';
import { simplificadorParaClientComponent } from '@/lib/utils';
import { CounterService } from '@/backend/counters/application/counterService';

export async function getCounterByTypeRequestServer(name) {
  try {
    await connectDB();
    const counterService = new CounterService();

    const response = await counterService.getCurrentCounterByType(name);

    if (response?.status !== 200) {
      console.log('Error al obtener el contador de ' + name);
      return { contador: [], status: 500 };
    }
    const contador = response?.payload;
    return {
      contador: simplificadorParaClientComponent(contador),
      status: 200,
    };
  } catch (error) {
    console.error(error);
  }
}