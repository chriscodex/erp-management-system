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
    const token = process.env.TOKEN_API_RUC_DNI;

    // URL de la API
    const apiUrl = `${process.env.NEXT_API_RUC_DNI_URL}/reniec/dni?numero=${dni}`;

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

async function getDataByRuc(ruc) {
  try {
    // Datos
    const token = process.env.TOKEN_API_RUC_DNI;
    // URL de la API
    const apiUrl = `${process.env.NEXT_API_RUC_DNI_URL}/sunat/ruc?numero=${ruc}`;
    // Configuración de la solicitud
    const axiosConfig = {
      method: 'get',
      url: apiUrl,
      headers: {
        Referer: 'http://apis.net.pe/api-ruc',
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
    //     razonSocial: 'ARENERA SAN MARTIN DE PORRAS S.A.',
    //     tipoDocumento: '6',
    //     numeroDocumento: '20428729201',
    //     estado: 'ACTIVO',
    //     condicion: 'HABIDO',
    //     direccion: 'AV. MONTEVERDE NRO 197 ',
    //     ubigeo: '150103',
    //     viaTipo: 'AV.',
    //     viaNombre: 'MONTEVERDE',
    //     zonaCodigo: '-',
    //     zonaTipo: '-',
    //     numero: '197',
    //     interior: '-',
    //     lote: '-',
    //     dpto: '-',
    //     manzana: '-',
    //     kilometro: '-',
    //     distrito: 'ATE',
    //     provincia: 'LIMA',
    //     departamento: 'LIMA',
    //     EsAgenteRetencion: false,
    //   },
    // };

    // setTimeout(() => {
    //   res.json(response.data);
    // }, 500);
  } catch (error) {
    console.log(error);
  }
}

export { delay, getData, getDataByDni, getDataByRuc };
