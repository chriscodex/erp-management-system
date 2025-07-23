import axios from 'axios';
import https from 'https';

// API externa (APIS.NET.PE) para obtener los datos de la persona por DNI y RUC
function getAxiosConfig(url, token, referer) {
  return {
    method: 'get',
    url,
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
      Referer: referer,
      Authorization: `Bearer ${token}`,
    },
    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  };
}

async function fetchDataFromExternalApi(endpoint, id, referer) {
  try {
    const token = process.env.NEXT_PUBLIC_TOKEN_API_RUC_DNI;
    const apiUrl = `${process.env.NEXT_PUBLIC_API_RUC_DNI_URL}${endpoint}?numero=${id}`;

    const axiosConfig = getAxiosConfig(apiUrl, token, referer);
    const response = await axios(axiosConfig);

    return {
      payload: response.data,
      status: response.status,
    };
  } catch (error) {
    if (error.response) {
      console.log(
        'Error en la petición a la API externa APIS.NET.PE:',
        error.response.data
      );
      return {
        payload: error.response.data.message,
        status: error.response.status,
      };
    } else if (error.request) {
      console.error('Error en la solicitud:', error.request);
      return {
        payload: 'No se recibió respuesta de la API.',
        status: 500,
      };
    } else {
      console.error('Error', error.message);
      return {
        payload: 'Error desconocido.',
        status: 500,
      };
    }
  }
}

// Funciones específicas para DNI y RUC
export const getDataByDniFromExternalApi = async (dni) =>
  fetchDataFromExternalApi(
    '/reniec/dni',
    dni,
    'https://apis.net.pe/consulta-dni-api'
  );

export const getDataByRucFromExternalApi = async (ruc) =>
  fetchDataFromExternalApi('/sunat/ruc', ruc, 'http://apis.net.pe/api-ruc');
