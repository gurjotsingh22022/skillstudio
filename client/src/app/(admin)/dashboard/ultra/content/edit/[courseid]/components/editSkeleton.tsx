import React from 'react';

const CourseLoadingSkeleton = () => {
  return (
    <div className="w-full py-10 px-8 animate-pulse">
        <div className="flex gap-6">
            <div className='w-7/12'>
                <div className="mb-6">
                    <div className="h-9 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-12 bg-gray-200 rounded w-full mb-3"></div>
                    <div className="flex items-center gap-2">
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                    </div>
                    <div className="h-10 bg-gray-200 rounded w-1/2 my-3"></div>
                </div>
                
            </div>
            <div className='w-5/12 bg-gray-200 h-full aspect-video object-cover object-center rounded-2xl'>
            
                </div>
        </div>
        {/* Add Section Button */}
                <div className="flex items-center justify-between py-6">
                    <div className="h-10 bg-gray-200 rounded w-36"></div>
                    <div className="h-10 bg-gray-200 rounded w-36"></div>
                </div>
        <div className='w-full grid grid-cols-2 items-start gap-6'>
            <div className='py-4'>
                
                {/* Section Input */}
                <div className="space-y-4 mb-6">
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-20 bg-gray-200 rounded"></div>
                    <div className="h-10 bg-gray-200 rounded w-24"></div>
                </div>
            </div>

            <div className="space-y-4">
                {/* Day 1 */}
                <div className="border rounded-lg h-20 bg-gray-200 w-full"></div>
                <div className="border rounded-lg h-20 bg-gray-200 w-full"></div>
                <div className="border rounded-lg h-20 bg-gray-200 w-full"></div>
                
            </div>
            
        </div>
        
        
        
        

      
    </div>
  );
};

export default CourseLoadingSkeleton;