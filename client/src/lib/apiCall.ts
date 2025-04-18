'use client'

import axios from "axios";

export async function callTheApi(endpoint: String, method = 'GET', data: any = null, contentType = 'application/json') {
  try {
    console.log("content", contentType)
    const response = await axios({
      method,
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}`,
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