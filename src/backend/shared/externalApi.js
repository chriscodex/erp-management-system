// src/infrastructure/externalApis/getDataByDniFromApi.js
import axios from 'axios';
import https from 'https';

export async function getDataByDniFromApi(dni) {
  try {
    const token = process.env.NEXT_PUBLIC_TOKEN_API_RUC_DNI;
    const apiUrl = `${process.env.NEXT_PUBLIC_API_RUC_DNI_URL}/reniec/dni?numero=${dni}`;

    const axiosConfig = {
      method: 'get',
      url: apiUrl,
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
        Referer: 'https://apis.net.pe/consulta-dni-api',
        Authorization: `Bearer ${token}`,
      },
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    };

    const response = await axios(axiosConfig);
    return response.data;
  } catch (error) {
    throw new Error(
      'Error al obtener los datos de la API externa APIS.NET.PE:'
    );
  }
}
