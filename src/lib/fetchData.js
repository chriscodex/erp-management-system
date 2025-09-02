import axios from 'axios';

/**
 * Realiza una petición GET a la url dada y devuelve la respuesta.
 * Si ocurre un error, devuelve el error.
 * @param {string} url url a la que se va a hacer la petici n
 * @returns {Promise<AxiosResponse|Error>} la respuesta o el error
 */
export async function fetchData(url) {
  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    return error;
  }
}

/**
 * Realiza una petición POST a la url dada con los datos dados y devuelve la respuesta.
 * Si ocurre un error, devuelve el error.
 * @param {string} url url a la que se va a hacer la petici n
 * @param {Object} data datos a enviar en el cuerpo de la petici n
 * @returns {Promise<AxiosResponse|Error>} la respuesta o el error
 */
export async function postData(url, data) {
  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

/**
 * Realiza una petición PATCH a la url dada con los datos dados y devuelve la respuesta.
 * Si ocurre un error, devuelve el error.
 * @param {string} url url a la que se va a hacer la petici n
 * @param {Object} data datos a enviar en el cuerpo de la petici n
 * @returns {Promise<AxiosResponse|Error>} la respuesta o el error
 */
export async function patchData(url, data) {
  try {
    const response = await axios.patch(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

/**
 * Realiza una petición PUT a la url dada con los datos dados y devuelve la respuesta.
 * Si ocurre un error, devuelve el error.
 * @param {string} url url a la que se va a hacer la petición
 * @param {Object} data datos a enviar en el cuerpo de la petición
 * @returns {Promise<AxiosResponse|Error>} la respuesta o el error
 */

export async function putData(url, data) {
  try {
    const response = await axios.put(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

/**
 * Realiza una petición DELETE a la url dada y devuelve la respuesta.
 * Si ocurre un error, devuelve el error.
 * @param {string} url url a la que se va a hacer la petición
 * @returns {Promise<AxiosResponse|Error>} la respuesta o el error
 */
export async function deleteData(url) {
  try {
    const response = await axios.delete(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}
