'use client'

import React, { useEffect, useState } from 'react'
import { BadgeCheck, Dot } from 'lucide-react'
import { getAllFeaturingCourses } from '../../actions/course/getCourse'
import CloudinaryMediaPlayer from './ImageRender'
import Image from 'next/image'
import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query';

const RowPost = () => {
    const router = useRouter();

    const handleCardClick = (id:string) => {
        router.push(`/course/${id}`); // Navigate to course detail page
    };

    const { data: courses, isLoading } = useQuery({
        queryKey: ['featuredCourses'],
        queryFn: getAllFeaturingCourses,
        staleTime: 60 * 60 * 1000,    // 1 hour (freshness)
        gcTime: 24 * 60 * 60 * 1000,  // 24 hours (cache retention)
    });


    // useEffect(()=>
    // {
    //     const getFeed=async()=>
    //     {
    //         const coursesData = await getAllFeaturingCourses();
    //         setCourses(coursesData);
    //     }

    //     getFeed();
    // }, [])

  return (
    <>
    <div className='py-4
     w-full whitespace-normal'>
        {/* <h1 className='text-4xl font-bold'>Business</h1> */}
        <div className="grid grid-cols-3 gap-5">

            {
                !isLoading?
                <>
                {
                    courses?.data.data.map((data: any, key: number)=>
                        <div className='overflow-hidden cursor-pointer' key={key} onClick={()=> handleCardClick(data.publicId)}>
                            <Link href={`/course/${data.publicId}`}>
                            <CloudinaryMediaPlayer className='w-full aspect-video object-cover object-center rounded-xl' type='image' publicId={data.thumbnailPublicId}/>
                            </Link>
                        
                        
                        <div className="py-4 flex items-start gap-[12px]">
                            <Image width={36} height={36} className='rounded-full' src={data.User.image} alt={`${data.User.name} Display Picture`} />
                            <div>
                            <Link href={`/course/${data.publicId}`} className='text-lg leading-tight font-semibold line-clamp-2 mb-1'>{data.title}</Link>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                    <Link href={`/`} className='text-base w-max hover:text-black flex items-center gap-1 text-[#414141]'>By {data.User.name} <BadgeCheck fill='blue' color='white' size={20} /></Link>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                    <p>{data.User.name}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            
                            <h1 className='text-base flex items-center text-[#414141]'>335k enrolled <Dot/> 2 days</h1>
                            <h1 className='text-base text-[#414141]'>Price - <span className={`${data.originalPrice && ('text-red-600 text-lg font-medium')}`}>
                                ${data.price}
                                </span> {data.originalPrice && (<span className='line-through ms-1 '>${data.originalPrice}</span>)}</h1>
                            {/* <h1 className='my-1 text-xl font-semibold'>CA$ 99</h1> */}
                            </div>
                            
                        </div>
                    </div>
                    
                    )
                }
                </>
                :
                <CourseCardSkeleton count={6}/>
            }

            
            
            

          </div>
    </div>
        
    </>
  )
}

export default RowPost


interface CourseCardSkeletonProps {
    count?: number;
  }
const CourseCardSkeleton: React.FC<CourseCardSkeletonProps> = ({ count = 1 }) => {
    return (
        <>
        {Array.from({ length: count }).map((_, index) => (
            <div key={index} className="overflow-hidden relative animate-pulse">
                {/* Shimmer overlay */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer" />
                
                {/* Title skeleton */}
                <div className="w-full rounded-xl aspect-video object-cover bg-gray-200 relative z-10" />
                
                {/* Author skeleton */}
                <div className="flex items-start gap-[12px] py-4 relative z-10">
                    <div className='h-[36px] w-[36px] aspect-square  rounded-full bg-gray-200'/>
                    <div className='w-full'>
                        <div className="h-6 bg-gray-200 rounded w-full  mb-2" />
                        <div className="mx-1/2 h-4 w-1/2 bg-gray-200 rounded mb-2" />
                        {/* Stats skeleton */}
                        <div className="flex items-center mb-2 relative z-10">
                        <div className="h-4 bg-gray-200 rounded w-1/3" />
                        <div className="mx-2 h-2 w-2 bg-gray-200 rounded-full" />
                        <div className="h-4 bg-gray-200 rounded w-1/4" />
                        </div>
                        
                        {/* Price skeleton */}
                        <div className="flex items-center relative z-10">
                        <div className="h-6 bg-gray-200 rounded w-1/4" />
                        <div className="h-6 bg-gray-200 rounded w-1/4 ml-2" />
                        <div className="h-6 bg-gray-200 rounded w-1/4 ml-2" />
                        </div>

                    </div>
                
                </div>
                
                
            </div>
        ))}
        </>
    );
  };
  