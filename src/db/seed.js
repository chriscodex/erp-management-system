import { connectDB } from './mongodb';

async function usersSamples() {
  try {
    
    await connectDB();

    const data = [
      {
        "nombres": "Martha Paucek",
        "apellidos": "Ledner",
        "dni": "98-232522-844153-4",
        "celular": "1-503-643-5608 x561",
        "rol": "Montenegro",
        "id": "1"
      },
    ]
  } catch (error) {
    
  }

}