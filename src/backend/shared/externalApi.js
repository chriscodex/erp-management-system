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
    console.log('response', response);

    console.log('response', response.data);

    return {
      payload: response.data,
      status: response.status,
    };

    // return response.data;
  } catch (error) {
    console.log(
      'Error en la petición a la API externa APIS.NET.PE:',
      error.response.data
    );
    const response = {
      payload: error.response.data.message,
      status: error.response.status,
    };
    return response;
  }
}
