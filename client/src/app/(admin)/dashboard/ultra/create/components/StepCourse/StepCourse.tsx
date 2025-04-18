import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import React from 'react'
import CourseForm from './CourseForm'

export interface StepProps {
    step?: number
}
const StepCourse = ({step}: StepProps) => {
  return (
    <>
    
        <div className="absolute top-0 left-0 h-full w-full py-7 px-5 ">
            <div className="relative h-full w-full flex flex-col gap-5">
                <h1 className='font-medium text-3xl'>Course Details</h1>
            <div className="relative h-full w-full">
                <ResizablePanelGroup
                direction="horizontal"
                className="absolute top-0 left-0 w-full max-h-full rounded-lg border md:min-w-[450px]"
                >
                <ResizablePanel defaultSize={50}>
                    <div className="h-full p-6 !overflow-auto">
                    <CourseForm/>
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={50}>
                    <div className="flex h-full items-center justify-center p-6">
                    <span className="font-semibold">Content</span>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
            </div>
                
            </div>
            
            
        </div>
    </>
  )
}

export default StepCourse