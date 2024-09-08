import { getAllUsersUrl } from './apiUrls';

async function fetchData(url) {
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

async function delay(ms) {
  try {
    return new Promise((resolve) => setTimeout(resolve, ms)); // eslint-disable-line
  } catch (error) {
    console.log(error);
  }
}

async function getAllUsers() {
  try {
    return fetchData(getAllUsersUrl);
  } catch (error) {
    console.log(error);
  }
}

async function getUser(userId) {
  try {
    
  } catch (error) {
    
  }
}

export { fetchData, delay, getAllUsers };
