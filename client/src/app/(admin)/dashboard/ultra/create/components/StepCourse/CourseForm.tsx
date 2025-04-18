'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import React, { useEffect, useState } from 'react'
import FilePicker from '../FilePicker'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { UplaodCourse } from '../../../../../../../../actions/course/uploadCourse'
import { toast } from 'sonner'
import { useAppDispatch } from '@/app/store/hooks/reduxHook'
import { hideLoader, showLoader } from '@/app/store/slices/loaderSlice'
import { useRouter } from 'next/navigation'
import { fetchDataFromBackend } from '../../../../../../../../actions/query/axiosQuery'

const CourseForm = () => {

    const [allClear, setAllClear] = useState<boolean>(false);
    const [isDiscounted, setIsDiscounted] = useState<boolean>(false);
    const [pIdAvailable, setPIdAvailable] = useState<boolean>(false);
    const [pIdLoading, setPIdLoading] = useState<boolean>(false);
    const [title, setTitle] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [thumbnail, setThumbnail] = useState<File>();
    const [language, setLanguage] = useState<string>();
    const [price, setPrice] = useState<number>(0);
    const [originalPrice, setOGPrice] = useState<number>();
    const [timeAccess, setTimeAccess] = useState<number>();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [publicId, setPublicId] = useState<string>('');

    const handleFileSelect = (file: File | null) => {
        console.log('Selected file:', file);
        setThumbnail(file as File)
        // Handle the file (upload to server, etc.)
      };

      const convertToPublicId = (text:any) => {
              return text
                .toLowerCase()               // Convert to lowercase
                .replace(/\s+/g, '-')        // Replace spaces with hyphens
                .replace(/[^a-z0-9-]/g, '')  // Remove special characters
                .replace(/-+/g, '-')         // Replace multiple hyphens with single
                .replace(/^-|-$/g, '');      // Remove leading/trailing hyphens
            };
      
            useEffect(() => {
              if (title) {
                setPIdAvailable(false);
                setPublicId(convertToPublicId(title));
              }
            }, [title]);
          
            // Handle public ID change (user manual edit)
            const handlePublicIdChange = (e:any) => {
                const value = e.target.value;
                // Convert spaces to hyphens and enforce lowercase in real-time
                const processedValue = value
                .toLowerCase()
                .replace(/\s/g, '-')
                .replace(/[^a-z0-9-]/g, '');
              
                setPIdAvailable(false);
                setPublicId(processedValue);
            };


    useEffect(()=>
    {
        validateForm()
    }, [title, description, thumbnail, language, price, originalPrice, isDiscounted])

    const validateForm=()=>
    {
        if(title && description && thumbnail && language && !isNaN(price as number) && (price as number) >=10)
        {
            if(isDiscounted)
            {
                console.log(originalPrice)
                if(!isNaN(originalPrice as number) && (originalPrice as number)>=11)
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
    const validateData=()=>
    {
        if(title && description && thumbnail && language && !isNaN(price as number) && (price as number) >=10)
        {
            if(isDiscounted)
            {
                if(!isNaN(originalPrice as number) && (originalPrice as number)>=11)
                {
                    return {
                        title,
                        description,
                        thumbnail,
                        language,
                        price,
                        isDiscounted,
                        originalPrice
                    }
                }
                else
                {
                    return false
                }
            }
            else
            {
                return {
                    title,
                    description,
                    thumbnail,
                    language,
                    price,
                    isDiscounted
                }
            }
            
        }
        else
        {
            return false;
        }
    }

    const sendToServer=async()=>
    {
        setAllClear(false);
        dispatch(showLoader());
        const data = validateData()
        if(data)
        {
            const result = await UplaodCourse(data);
            if(result.success)
            {
                toast(`${result.message}`)
            }
            else
            {
                toast(`${result.error}`)
            }
        }
        dispatch(hideLoader());
        router.push(`/dashboard/ultra/content`)
        
    }

    const checkPublicId=async()=>
    {
        setPIdLoading(true);
        const resp = await fetchDataFromBackend("/api/public/check-publicid", publicId)
        console.log(resp)
        setPIdAvailable(resp.available);
        setPIdLoading(false);
    }

  return (
    <>
          <div className="grid w-full items-center gap-6">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name" className='text-base'>Title</Label>
              <Input id="name" className='h-14 !text-base' onChange={(e)=> setTitle(e.target.value)} placeholder="Name of your Course" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="publicId" className='text-base'>Public Url Id</Label>
              <div className="relative">
                <Input className='h-14 !text-base' type="text"
                    id="publicId"
                    value={publicId}
                    onChange={handlePublicIdChange}
                    placeholder="Public ID will be generated automatically"/>
                    {
                        publicId && (
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
              
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="Description" className='text-base'>Description</Label>
              <Textarea rows={6} onChange={(e)=> setDescription(e.target.value)} id='Description' className='!text-base !resize-none' placeholder="Tell students about your course" />
            </div>
            
            <div className="flex flex-col space-y-1.5">
              <Label className='text-base'>Thumbnail</Label>
              <FilePicker
              onFileSelect={handleFileSelect}
              accept="image/*"
              label="Upload multiple images (PNG, JPG)"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label className='text-base' htmlFor="language">Course Language</Label>
              <Select onValueChange={(e)=> setLanguage(e)}>
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper" className='text-base'>
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
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="price" className='text-base'>Price</Label>
              <Input min={10} onChange={(e)=> setPrice(parseFloat(e.target.value))} type='number' id="price" className='h-14 !text-base' placeholder="Price of the course" />
            </div>
            <div className="flex items-center space-x-2">
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
                isDiscounted?
                <>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="originalPrice" className='text-base'>Pre Discount Price</Label>
                    <Input min={11} defaultValue={originalPrice || ''} onChange={(e)=> setOGPrice(parseFloat(e.target.value))} type='number' id="originalPrice" className='h-14 !text-base' placeholder="Pre Discount Original Price" />
                </div>
                </>
                :null
            }
            <div className="flex flex-col space-y-1.5">
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

            <div className="flex space-y-1.5">
                {
                    allClear?
                    <>
                    <Button onClick={sendToServer} className='hover:cursor-pointer'>
                        Create and Go Next
                    </Button>
                    </>
                    :
                    <Button disabled>
                        Create and Go Next
                    </Button>
                }
                
            </div>
            
          </div>
    </>
  )
}

export default CourseForm