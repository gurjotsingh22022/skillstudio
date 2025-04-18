'use server';

import axios from 'axios';
import { postDataToBackend } from '../query/axiosQuery';

export const RoleCreateExpress=async(data:any)=>
{
  try{
    const resp = await postDataToBackend('/api/role',data);
    console.log(resp)
    return resp.data
  }
  catch(err:any){
    console.error('Error calling Query:', err);
    throw new Error('Failed to calling Query');
  }
  
}