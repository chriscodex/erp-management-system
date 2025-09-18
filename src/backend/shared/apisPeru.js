// API externa (apisperu.com) para factura y boleta electrónica

import axios from 'axios';
import https from 'https';

const BASE_URL =
  process.env.NEXT_PUBLIC_APISPERU_URL ||
  'https://facturacion.apisperu.com/api/v1';

/**
 * Inicia sesión en APISPeru para obtener el token JWT
 */
export async function loginApisPeru() {
  try {
    const credentials = {
      username: process.env.APISPERU_USERNAME,
      password: process.env.APISPERU_PASSWORD,
    };

    const response = await axios.post(`${BASE_URL}/auth/login`, credentials, {
      headers: { 'Content-Type': 'application/json' },
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    });

    return {
      token: response.data.token,
      status: response.status,
    };
  } catch (error) {
    if (error.response) {
      console.error('Error en login de APISPeru:', error.response.data);
      return {
        token: null,
        status: error.response.status,
        payload: error.response.data,
      };
    } else if (error.request) {
      console.error('Error en la solicitud de login:', error.request);
      return {
        token: null,
        status: 500,
        payload: 'No se recibió respuesta del servidor.',
      };
    } else {
      console.error('Error desconocido en login:', error.message);
      return {
        token: null,
        status: 500,
        payload: 'Error desconocido en login.',
      };
    }
  }
}

/**
 * Envía una factura o boleta a Sunat vía APISPeru
 * @param {Object} invoiceData - Objeto JSON con la data de la factura o boleta
 */
export async function sendInvoiceToSunat(invoiceData) {
  try {
    // 1. Obtener token
    const { token, status, payload } = await loginApisPeru();
    if (!token) return { payload, status };

    // 2. POST al endpoint /invoice/send
    const response = await axios.post(`${BASE_URL}/invoice/send`, invoiceData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    });

    return {
      payload: response.data,
      status: response.status,
    };
  } catch (error) {
    if (error.response) {
      console.error('Error al enviar factura/boleta:', error.response.data);
      return {
        payload: error.response.data,
        status: error.response.status,
      };
    } else if (error.request) {
      console.error('Error en la solicitud de envío:', error.request);
      return {
        payload: 'No se recibió respuesta de la API de facturación.',
        status: 500,
      };
    } else {
      console.error('Error desconocido en envío:', error.message);
      return {
        payload: 'Error desconocido en envío.',
        status: 500,
      };
    }
  }
}
