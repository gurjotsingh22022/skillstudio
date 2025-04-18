'use server'

import axios from 'axios';

// Function to call your Express backend
async function callExpressBackend(endpoint: String, method = 'GET', data = null, contentType = 'application/json') {
  try {
    console.log("ENV = ", process.env.BACKEND_URL)
    const response = await axios({
      method,
      url: `${process.env.BACKEND_URL}${endpoint}`,
      data: {data},
      headers: {
        'Content-Type': contentType,
      },
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error calling Express backend:', error);
    throw new Error('Failed to fetch data from the server');
  }
}

// Example Server Action
export async function fetchDataFromBackend(endpoint: String, data:any = null, contentType = 'application/json') {
  return await callExpressBackend(endpoint, 'GET', data, contentType);
}

// Another example for posting data
export async function postDataToBackend(endpoint: String, data:any = null, contentType = 'application/json') {
  return await callExpressBackend(endpoint, 'POST', data, contentType);
}

export async function putDataToBackend(endpoint: String, data:any = null, contentType = 'application/json') {
  return await callExpressBackend(endpoint, 'PUT', data, contentType);
}