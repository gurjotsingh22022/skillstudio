import { Dot, Languages, Speech, Star } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import MDFormator from './mdFormator'
import { Separator } from '@/components/ui/separator'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const page =async ({
    params,
  }: {
    params: Promise<{ courseid: string }>
  }) => {
    const { courseid } = await params
    console.log(courseid)

    const data = {
        message: 'Courses retrieved successfully',
        success: true,
        data: {
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
      }

    
  return (
    <>
        <div className="py-10 px-8">
            <div className="flex gap-6">
                <div className='w-7/12'>
                    <h1 className='text-4xl font-extrabold mb-4'>
                        {data.data.title}
                    </h1>
                    {/* <p className='text-base font-normal whitespace-pre-line'>
                        {data.data.description}
                    </p> */}
                    <MDFormator value={data.data.description}/>
                    <div className="flex gap-4 my-4">
                        <div className='flex gap-2 items-center'>
                            <div className="flex gap-1 font-black text-[1.3rem] items-baseline text-yellow-500">
                                <span>5.0</span>
                        <Star size={16} fill='#eab308'/>
                        <Star size={16} fill='#eab308' />
                        <Star size={16} fill='#eab308' />
                        <Star size={16} fill='#eab308' />
                        <Star size={16} fill='#eab308' />
                            </div>
                            
                        <div className='underline text-blue-600 text-base'>
                            (22,987 ratings) 
                            </div> 
                            <div className='text-base'>
                            1,542,896 students
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 my-3'>
                       <Image src={`/SkillStudioOriginals.png`} alt='Skill Studio' width={60} height={50} className='w-auto !h-14' unoptimized />
                       <Separator orientation='vertical' className='bg-black h-6 w-[1.5px]' />
                       <div className='flex items-end text-base gap-3 font-medium'>
                       <Speech /> {data.data.language}
                       </div>
                    </div>
                </div>
                <Image src={data.data.thumbnailUrl} alt='Thumbnail' width={142} height={80} className='w-5/12 h-full aspect-video object-cover object-center rounded-2xl' />
            </div>
            <div className="py-6">
                <div className='mb-4'>
                    <h1 className='text-2xl font-semibold'>Course Content</h1>
                </div>
            <Accordion type="single" collapsible className="w-full border rounded-md">
                <AccordionItem value="item-1" className='px-8 py-3'>
                    <AccordionTrigger className='text-lg font-semibold'>
                    <div className="w-full">
                        Day 1 - Beginner - Working on Types of Power
                            </div>
                        <div className='font-normal items-center text-base flex me-2'>7 Lessons <Dot/> 45 min </div>
                        
                        </AccordionTrigger>
                    <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className='px-8 py-3'>
                    <AccordionTrigger className='text-lg font-semibold'>
                        
                        <div className="w-full">
                        Day 2 - Beginner - Working on Types of Influences
                            </div>
                        <div className='font-normal items-center text-base flex me-2'>12 Lessons <Dot/> 1 hr 5 min </div>
                    </AccordionTrigger>
                    <AccordionContent>
                    Yes. It comes with default styles that matches the other
                    components&apos; aesthetic.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className='px-8 py-3'>
                    <AccordionTrigger className='text-lg font-semibold'>
                        
                    <div className="w-full">
                        Day 3 - Beginner - Working on Types of Political Ideaoligies
                            </div>
                        <div className='font-normal items-center text-base flex me-2'>6 Lessons <Dot/> 1 hr </div>
                        
                        </AccordionTrigger>
                    <AccordionContent>
                    Yes. It&apos;s animated by default, but you can disable it if you
                    prefer.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            </div>
        </div>
    </>
  )
}

export default page