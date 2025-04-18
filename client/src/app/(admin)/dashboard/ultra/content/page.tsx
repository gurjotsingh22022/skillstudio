import Image from 'next/image'
import React from 'react'
import { getAllCourses } from '../../../../../../actions/course/getCourse'
import { TableDemo } from './components/contentTable';

const page = async() => {

    // const { data } = await getAllCourses();


    const data = {
      message: 'Courses retrieved successfully',
      success: true,
      data: [
        {
          id: 1,
          title: 'How to establish your own Kingdom',
          description: 'This course will teach you How can you conqueror the world.',
          thumbnailPublicId: 'thumbnails/egd3zekf84838fkfbyzh',
          thumbnailUrl: 'https://res.cloudinary.com/dcrmh0rio/image/upload/v1743373868/thumbnails/egd3zekf84838fkfbyzh.jpg',
          thumbnailMetadata: [Object],
          userId: 1,
          price: 999,
          originalPrice: null,
          timeAccess: null,
          duration: 0,
          language: 'English',
          instructors: null,
          counseling: null,
          status: 'draft',
          isActive: false,
          Section: [
            {
              id: '2aa630cb-5594-4449-9c77-6c1c8cb0408d',
              title: 'Day 1 - How to Win a war',
              description: null,
              order: 0,
              courseId: 1,
              createdAt: '2025-04-05T15:52:12.866Z',
              updatedAt: '2025-04-05T15:52:12.866Z'
            }
          ]
        }
      ]
    }

  return (
    <>
    <div className='py-7 px-5'>
        <TableDemo data={data.data}/>
    </div>
    </>
  )
}

export default page