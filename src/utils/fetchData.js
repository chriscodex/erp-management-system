import axios from 'axios';
import https from 'https';

async function delay(ms) {
  try {
    return new Promise((resolve) => setTimeout(resolve, ms)); // eslint-disable-line
  } catch (error) {
    console.log(error);
  }
}

async function getData(url) {
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getDataByDni(dni) {
  try {
    // Datos
    const token = process.env.NEXT_TOKEN_RENIEC;

    // URL de la API
    const apiUrl = `${process.env.NEXT_RENIEC_URL}/dni?numero=${dni}`;

    // Configuración de la solicitud
    const axiosConfig = {
      method: 'get',
      url: apiUrl,
      headers: {
        Referer: 'https://apis.net.pe/consulta-dni-api',
        Authorization: `Bearer ${token}`,
      },
      // Utiliza el módulo 'https' para crear el agente httpsAgent
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    };

    // Realizar la llamada a la API
    const response = await axios(axiosConfig);

    return response.data;

    // const response = {
    //   data: {
    //     nombres: 'CHRISTIAN GONZALO',
    //     apellidoPaterno: 'ESPINOZA',
    //     apellidoMaterno: 'CADILLO',
    //     tipoDocumento: '1',
    //     numeroDocumento: '74062106',
    //   },
    // };

    // setTimeout(() => {
    //   res.json(response.data);
    // }, 1000);
  } catch (error) {
    console.log(error);
  }
}

export { delay, getDataByDni, getData };
