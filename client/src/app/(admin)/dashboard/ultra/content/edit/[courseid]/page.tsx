"use client"

import { Dot, HelpCircle, Languages, Speech, Star } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import MDFormator from '../../preview/[courseid]/mdFormator'
import { Button } from '@/components/ui/button'
import { SectionList } from './components/SectionList'
import { getAllCourses, getCourseById } from '../../../../../../../../actions/course/getCourse'
import CourseLoadingSkeleton from './components/editSkeleton'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import FilePicker from '../../../create/components/FilePicker'
import { callTheApi } from '@/lib/apiCall'
import axios from 'axios'
import { useAppDispatch } from '@/app/store/hooks/reduxHook'
import { hideLoader, showLoader } from '@/app/store/slices/loaderSlice'
import { toast } from 'sonner'
import { fetchDataFromBackend, putDataToBackend } from '../../../../../../../../actions/query/axiosQuery'



type ChildFunctionType = () => void;
const page = ({
    params,
  }: {
    params: Promise<{ courseid: number }>
  }) => {
      const [title, setTitle] = useState<String>("");
      const [description, setDescription] = useState<String>("");
      const [language, setLanguage] = useState<String>("");
      const [price, setPrice] = useState<number>(0);
      const [originalPrice, setOGPrice] = useState<number>();
      const [timeAccess, setTimeAccess] = useState<number>();
      const [isDiscounted, setIsDiscounted] = useState<boolean>(false);
      const [isActive, setIsActive] = useState<boolean>(false);
      const [allClear, setAllClear] = useState<boolean>(false);
      const [status, setStatus] = useState<string>("draft");
      const [resetFile, setResetFile] = useState<ChildFunctionType | null>(null);
      const [newThumbail, setNewThumbnail] = useState<File | null>();
      const dispatch = useAppDispatch();
      const [publicId, setPublicId] = useState<string>('');
      const [pIdAvailableMsg, setPIdAvailableMsg] = useState<string>('');
      const [pIdAvailable, setPIdAvailable] = useState<boolean>(false);
      const [pIdLoading, setPIdLoading] = useState<boolean>(false);

    // const data = {
    //     message: 'Courses retrieved successfully',
    //     success: true,
    //     data: {
    //         id: 1,
    //         title: 'How to establish your own Kingdom',
    //         description: 'This course will teach you How can you conqueror the world.',
    //         thumbnailPublicId: 'thumbnails/egd3zekf84838fkfbyzh',
    //         thumbnailUrl: 'https://res.cloudinary.com/dcrmh0rio/image/upload/v1743373868/thumbnails/egd3zekf84838fkfbyzh.jpg',
    //         thumbnailMetadata: [Object],
    //         userId: 1,
    //         price: 999,
    //         originalPrice: null,
    //         timeAccess: null,
    //         duration: 0,
    //         language: 'English',
    //         instructors: null,
    //         counseling: null,
    //         status: 'draft',
    //         isActive: false,
    //         Section: [
    //             {
    //               id: '2aa630cb-5594-4449-9c77-6c1c8cb0408d',
    //               title: 'Day 1 - How to Win a war',
    //               description: "Kehnde aunde wari tenu sukka jaan ni dena.",
    //               order: 0,
    //               courseId: 1,
    //               createdAt: '2025-04-05T15:52:12.866Z',
    //               updatedAt: '2025-04-05T15:52:12.866Z'
    //             },
    //             {
    //                 id: '597f0ffe-b16e-47bd-8295-3f95bbd51e3f',
    //                 title: 'Day 1 - How to Win a Debate',
    //                 description: null,
    //                 order: 2,
    //                 courseId: 1,
    //                 createdAt: "2025-04-05T16:07:11.186Z",
    //                 updatedAt: "2025-04-05T16:07:11.186Z"
    //             },
    //             {
    //                 id: '75c1df0b-89b3-489a-ac57-bbf7804cd8a0',
    //                 title: 'Day 3 - How to Betray a King',
    //                 description: null,
    //                 order: 2,
    //                 courseId: 1,
    //                 createdAt: "2025-04-05T16:09:52.788Z",
    //                 updatedAt: "2025-04-05T16:09:52.788Z"
    //               }
    //           ]
    //       }
    //   }

      const initialSections = [
        {
          id: 'section-1',
          title: 'Introduction',
          description: 'Welcome to the course and overview of what you will learn',
          order: 1
        },
        {
          id: 'section-2',
          title: 'Getting Started',
          description: 'Setting up your development environment',
          order: 2
        },
        {
          id: 'section-3',
          title: 'Getting Started',
          description: 'Setting up your development environment',
          order: 3
        },
        {
          id: 'section-4',
          title: 'Getting Started',
          description: 'Setting up your development environment',
          order: 4
        },
        {
          id: 'section-5',
          title: 'Getting Started',
          description: 'Setting up your development environment',
          order: 5
        },
        {
          id: 'section-6',
          title: 'Getting Started',
          description: 'Setting up your development environment',
          order: 6
        },
        {
          id: 'section-7',
          title: 'Getting Started',
          description: 'Setting up your development environment',
          order: 7
        },
        {
          id: 'section-8',
          title: 'Getting Started',
          description: 'Setting up your development environment',
          order: 8
        },
        {
          id: 'section-9',
          title: 'Getting Started',
          description: 'Setting up your development environment',
          order: 9
        },
      ];

      const handleSectionsChange = (updatedSections: any) => {
        // Here you would typically save to your database/API
        console.log('Sections updated:', updatedSections);
      };

      const [data, setData] = useState<any>();

      const convertToPublicId = (text:any) => {
        return text
          .toLowerCase()               // Convert to lowercase
          .replace(/\s+/g, '-')        // Replace spaces with hyphens
          .replace(/[^a-z0-9-]/g, '')  // Remove special characters
          .replace(/-+/g, '-')         // Replace multiple hyphens with single
          .replace(/^-|-$/g, '');      // Remove leading/trailing hyphens
      };
    
      // Handle public ID change (user manual edit)
      const handlePublicIdChange = (e:any) => {
        const value = e.target.value;
        // Convert spaces to hyphens and enforce lowercase in real-time
        const processedValue = value
          .toLowerCase()
          .replace(/\s/g, '-')
          .replace(/[^a-z0-9-]/g, '');
          setPIdAvailable(false)
        setPublicId(processedValue);
      };

      useEffect(()=>{
        const getData=async()=>
        {
            const { courseid } = await params
            const resp = await getCourseById(courseid);
            console.log("Done ",resp)
            setData(resp.data)
            setTitle(resp.data.data.title)
            setDescription(resp.data.data.description)
            setLanguage(resp.data.data.language)
            setPublicId(resp.data.data.publicId)
            setPrice(resp.data.data.price)
            setIsDiscounted(resp.data.data.isDiscounted)
            setOGPrice(resp.data.data.originalPrice)
            setTimeAccess(resp.data.data.timeAccess)
            setStatus(resp.data.data.status)
            setIsActive(resp.data.data.isActive)
        }

        getData();
        

      }, [])


      useEffect(()=>
      {
        validateForm();
      }, [title, description, language, price, isDiscounted, originalPrice, timeAccess, isActive])


      const updateQuery=async()=>
      {
        dispatch(showLoader());
        try{

          const sendableData = await validateInputs();
          const resp = await putDataToBackend(`/api/ultra/course`, {id: data.data.id, data:sendableData})
          setData(resp)
          toast.success("Course Data Updated")
        }
        catch(e:any)
        {
          toast.error("Could not update the data")
        }
        finally{
          dispatch(hideLoader());

        }
      }
    
      const validateForm=()=>
        {
            if(title && publicId && description && language && !isNaN(price as number) && (price as number) >=10)
            {
                if(isDiscounted)
                {
                    console.log(originalPrice)
                    if(!isNaN(originalPrice as number) && (originalPrice as number)>=11 &&(originalPrice as number)>=price)
                    {
                        setAllClear(true);
                    }
                    else
                    {
                        setAllClear(false);
                    }
                }
                else
                {
                    setAllClear(true);
                }
                
            }
            else
            {
                setAllClear(false)
            }
        }

    
      const validateInputs=()=>
        {
            if(title && publicId && description && language && !isNaN(price as number) && (price as number) >=10)
            {
                if(isDiscounted)
                {
                    console.log(originalPrice)
                    if(!isNaN(originalPrice as number) && (originalPrice as number)>=11 &&(originalPrice as number)>=price)
                    {
                        return {
                          title,
                          description,
                          publicId,
                          language,
                          price,
                          isActive,
                          status,
                          timeAccess,
                          originalPrice
                        }
                    }
                    else
                    {
                        return false;
                    }
                }
                else
                {
                  return {
                    title,
                    description,
                    publicId,
                    language,
                    price,
                    isActive,
                    status,
                    timeAccess
                  };
                }
                
            }
            else
            {
              return false;
            }
        }

      const handleFileSelect=async(e:any)=>
      {
        console.log(e)
        setNewThumbnail(e)
      }

      const updateThumbnail=async()=>
      {
          dispatch(showLoader());
        try
        {
          if(!newThumbail)
          {
            return;
          }
          const formData = new FormData();
          formData.append(
            "file", newThumbail
          )
          formData.append(
            "id", data.data.id
          )
          const resp = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ultra/course/thumbnail`, formData);

          console.log(resp.data)

          if(!resp.data.success)
          {
            toast.error("Could not update the thumbnail")
            return;
          }
          if(resetFile)
          {
            resetFile();
          }
          setNewThumbnail(null);
          setData( resp.data);
        }
        catch(e:any)
        {
          toast.error("Could not update the thumbnail")
          dispatch(hideLoader());
        }
        finally{
          dispatch(hideLoader());
        }
        
      }

      const checkPublicId=async()=>
          {
              setPIdLoading(true);
              const resp = await fetchDataFromBackend("/api/public/check-publicid", publicId)
              console.log(resp)
              setPIdAvailable(resp.available);
              setPIdLoading(false);
              if(resp.available)
              {
                setPIdAvailableMsg("")
              }
              else
              {
                setPIdAvailableMsg(resp.message)
              }
          }

      const handleRegisterFunction = (fn: ChildFunctionType) => {
        setResetFile(() => fn);
      };
    
  return (
    <>
    {
        data?
        <>
        <div className="py-10 px-8">
            <div className="flex pb-4 gap-6">
                <div className='w-7/12'>
                    <Textarea id='title' maxLength={90} rows={2} defaultValue={data?.data.title} onChange={(e)=> setTitle(e.target.value)} className='!h-auto p-3 shadow-none !text-4xl font-extrabold mb-4 resize-none'>

                    </Textarea>
                        
                    <MDFormator value={data?.data.description} onChange={(e)=> setDescription(e)}/>
                    
                    <div className='flex flex-col justify-between items-center gap-5 my-5 w-full'>
                       {/* <Image src={`/SkillStudioOriginals.png`} alt='Skill Studio' width={60} height={50} className='w-auto !h-14' unoptimized />
                       <Separator orientation='vertical' className='bg-black h-6 w-[1.5px]' /> */}
                       
                       <div className="flex flex-col space-y-1.5 w-full">
                        <Label className='text-base' htmlFor="language">Course Language</Label>
                        <div className='flex items-end text-base gap-3 font-medium'>
                       <Speech /> 
                        <Select defaultValue={data?.data.language} onValueChange={(e)=> setLanguage(e)}>
                          <SelectTrigger id="language" className='min-w-[143px]'>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent position="popper" className='text-base shadow bg-white-100 z-40'>
                            <SelectItem value="English">English</SelectItem>
                            <SelectItem value="Punjabi">Punjabi (ਪੰਜਾਬੀ)</SelectItem>
                            <SelectItem value="Hindi">Hindi (हिन्दी)</SelectItem>
                            <SelectItem value="Russian">Russian (Русский)</SelectItem>
                            <SelectItem value="Urdu">Urdu (اردو)</SelectItem>
                            <SelectItem value="Mandarin">Mandarin (普通话)</SelectItem>
                            <SelectItem value="Japanese">Japanese (日本語)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                       </div>
                        <div className="flex flex-col space-y-1.5 w-full">
                          <Label htmlFor="publicId" className='text-base'>Public Url Id</Label>
                          <div className="relative">
                                          <Input className='h-14 !text-base' type="text"
                                              id="publicId"
                                              value={publicId}
                                              onChange={handlePublicIdChange}
                                              placeholder="Public ID will be generated automatically"/>
                                              {
                                                  publicId && data?.data.publicId!=publicId && (
                                                      <Button onClick={checkPublicId} disabled={pIdLoading || pIdAvailable} className='absolute top-1/2 translate-y-[-50%] right-2'>
                                                      {
                                                          pIdLoading?
                                                          "Checking..."
                                                          :
                                                          pIdAvailable?
                                                          "Available"
                                                          :
                                                          "Check Availability"
                                                      }
                                                  </Button>
                                                  )
                                              }
                                                  
                                        </div>
                            {
                              pIdAvailableMsg && (<p className='text-red-600 font-medium'>
                                {pIdAvailableMsg}
                              </p>)
                            }
                        </div>
                        <div className="flex flex-col space-y-1.5 w-full">
                          <Label htmlFor="price" className='text-base'>Price</Label>
                          <Input min={10} defaultValue={data?.data.price} onChange={(e)=> setPrice(parseFloat(e.target.value))} type='number' id="price" className='h-14 !text-base' placeholder="Price of the course" />
                        </div>
                        <div className="flex items-center space-x-2 w-full">
                            <Checkbox id="isDiscounted" onCheckedChange={(e:boolean)=> setIsDiscounted(e)} />
                            <label
                                htmlFor="isDiscounted"
                                className="text-base font-medium inline-flex gap-1 items-center leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Is discounted? <span>
                                    <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                        <HelpCircle size={18} strokeWidth={2}/>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p className='text-base'>If your course price is discounted, check the box to show up the Pre-Discount Original Price. e.g. $49 <span className='line-through'>$99</span></p>
                                        
                                        </TooltipContent>
                                    </Tooltip>
                                    </TooltipProvider>
                                </span>
                                
                            </label>
                        </div>
                        {
                          data?.data.originalPrice || isDiscounted?
                          <>
                          <div className="flex flex-col space-y-1.5 w-full">
                              <Label htmlFor="originalPrice" className='text-base'>Pre Discount Price</Label>
                              <Input min={11} value={originalPrice || 0} onChange={(e)=> setOGPrice(parseFloat(e.target.value))} type='number' id="originalPrice" className='h-14 !text-base' placeholder="Pre Discount Original Price" />
                          </div>
                          </>
                          :null
                      }
                      <div className="flex flex-col space-y-1.5 w-full">
                        <Label htmlFor="timeAccess" className='text-base inline-flex gap-1'>Time Access (optional)
          
                        <TooltipProvider>
                                  <Tooltip>
                                      <TooltipTrigger asChild>
                                      <HelpCircle size={18} strokeWidth={2}/>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                          <p className='text-base'>How long can student access the course? e.g. 4,6,12 (months only in form of numbers).</p>
                                      
                                      </TooltipContent>
                                  </Tooltip>
                                  </TooltipProvider>
                        </Label>
                        <Input onChange={(e)=> setTimeAccess(parseInt(e.target.value))} type='number' id="timeAccess" className='h-14 !text-base' placeholder="e.g. 4, 6, 12 months (only number)" />
                      </div>
                      <div className="flex flex-col space-y-1.5 w-full">
                        <Label className='text-base' htmlFor="Visibility">Course Visibility</Label>
                        <div className='flex items-end text-base gap-3 font-medium w-full'>
                        <Select defaultValue={data?.data.status} onValueChange={(e)=> setStatus(e)}>
                          <SelectTrigger id="Visibility" className='py-6 w-full' >
                            <SelectValue placeholder="Course Visibility" />
                          </SelectTrigger>
                          <SelectContent position="popper" className='!w-full text-base shadow bg-white-100 z-40'>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="public">Public</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                       </div>
                       <div className="flex items-center space-x-2 w-full">
                            <Checkbox id="isActive" defaultChecked={data?.data.isActive} onCheckedChange={(e:boolean)=> setIsActive(e)} />
                            <label
                                htmlFor="isActive"
                                className="text-base font-medium inline-flex gap-1 items-center leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Is Active/Featuring? <span>
                                    <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                        <HelpCircle size={18} strokeWidth={2}/>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p className='text-base'>Admin has access to hide/hold a course which can't be activated by Instructor</p>
                                        
                                        </TooltipContent>
                                    </Tooltip>
                                    </TooltipProvider>
                                </span>
                                
                            </label>
                        </div>
                        {
                          allClear?
                          <>
                          <Button className='w-full' onClick={updateQuery}>
                          Update
                      </Button>
                          </>
                          :
                          <>
                          <Button className='w-full' disabled>
                          Update
                      </Button>
                          </>
                        }
                      
                    </div>
                </div>
                <div className="w-5/12">
                  <Image src={data?.data.thumbnailUrl} alt='Thumbnail' width={142} height={80} className='w-full aspect-video object-cover object-center rounded-2xl' />
                  <div className="flex flex-col space-y-1.5 py-4">
                  <FilePicker
                  resetFiles={handleRegisterFunction}
                  onFileSelect={handleFileSelect}
                  accept="image/*"
                  label="Update Thumbnail image (PNG, JPG)"
                  />
                </div>
                {
                  newThumbail && (
                    <Button className='w-full' onClick={updateThumbnail}>
                    Update Thumbnail
                  </Button>
                  )
                }
                  
                
            </div>
            </div>
            <Separator/>
            <div className="py-6">
                <div className='mb-4 flex items-center justify-between'>
                    <h1 className='text-2xl font-semibold'>Course Content</h1>
                    <Button>Create Section</Button>
                </div>
                {/* {
                    data.data.Section.length>0?
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
                    :
                    <div className="flex justify-center items-center w-full py-20 text-lg">
                        No Course Content is Created yet...
                    </div>
                } */}

                <SectionList 
                        initialSections={data?.data.Section} courseId='1'
                    />
            
            </div>
        </div>
        </>
        :
        <CourseLoadingSkeleton/>
    }
        
    </>
  )
}

export default page