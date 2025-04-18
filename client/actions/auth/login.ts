'use server';

import axios from 'axios';
import { postDataToBackend } from '../query/axiosQuery';

export const LoginExpress=async(data:any)=>
{
  try{
    console.log('This is actually Working')
    const resp = await postDataToBackend('/api/login',data);
    return resp
  }
  catch(err:any){
    console.error('Error calling Query:', err);
    throw new Error('Failed to calling Query');
  }
  
}