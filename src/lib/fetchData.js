import axios from 'axios';

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