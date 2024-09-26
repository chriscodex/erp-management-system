import axios from 'axios';

export async function delay(ms) {
  try {
    return new Promise((resolve) => setTimeout(resolve, ms)); // eslint-disable-line
  } catch (error) {
    console.log(error);
  }
}

export async function fetchData(url) {
  try {
    const response = await axios.get(url, {
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