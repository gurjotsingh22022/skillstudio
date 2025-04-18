import { fetchDataFromBackend } from "../query/axiosQuery";
import { getSessionData } from "../storedData/methods";




export const getAllCourses=async()=>
{
    try{

        const userData = await getSessionData();
        
        if(!userData)
        {
            throw new Error('User not logged in');
        }

        const response = await fetchDataFromBackend('/api/ultra/user',userData);

        if(!response.success || response.data.role.Title!='admin')
        {
            throw new Error('Unauthorized Access');
        }

        const courses = await fetchDataFromBackend('/api/ultra/courses', response.data);

        console.log(courses)

        return {
            success: true,
            message: 'Courses Fetched Successfully',
            data: courses
        }
        

    }
    catch(error: any) {
        console.error('Server Err:', error);
        return { error: error?.message };
    }
}


export const getAllFeaturingCourses=async()=>
{
    try{

        const courses = await fetchDataFromBackend('/api/public/courses-feed');

        console.log(courses)

        return {
            success: true,
            message: 'Courses Fetched Successfully',
            data: courses
        }
        

    }
    catch(error: any) {
        console.error('Server Err:', error);
        return { error: error?.message };
    }
}

export const getCourseById=async(id: number)=>
{
    try{

        const userData = await getSessionData();

        
        if(!userData)
        {
            throw new Error('User not logged in');
        }

        const response = await fetchDataFromBackend('/api/ultra/user',userData);

        if(!response.success || response.data.role.Title!='admin')
        {
            throw new Error('Unauthorized Access');
        }

        const data = {
            id,
            userData: response.data
        }

        const course = await fetchDataFromBackend('/api/ultra/course', data);

        console.log(course)

        return {
            success: true,
            message: 'Course Fetched Successfully',
            data: course
        }
        

    }
    catch(error: any) {
        console.error('Server Err:', error);
        return { error: error?.message };
    }
}