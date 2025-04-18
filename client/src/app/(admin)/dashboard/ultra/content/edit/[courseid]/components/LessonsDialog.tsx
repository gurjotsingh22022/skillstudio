import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Menu, Pencil, Trash2, TvMinimalPlay } from "lucide-react"
import FilePicker from "../../../../create/components/FilePicker"
import { Checkbox } from "@/components/ui/checkbox"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { UplaodLesson } from "../../../../../../../../../actions/course/uploadCourse"
import { useAppDispatch } from "@/app/store/hooks/reduxHook"
import { hideLoader, showLoader } from "@/app/store/slices/loaderSlice"
import { postDataToBackend, putDataToBackend } from "../../../../../../../../../actions/query/axiosQuery"
import { callTheApi } from "@/lib/apiCall"
import axios from "axios"
import { secondsToMinSec } from "@/lib/timeFormat"
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd"

interface PropsDecalration {
  section: any
}



interface Lesson {
  id: string,
  title: string,
  videoUrl: string,
  duration: number,
  isFree: boolean,
  order: number,
  sectionId: string
}

interface reOrderObject {
  id: string,
  sectionId: string,
  newIndex: number,
  oldIndex: number
}


type ChildFunctionType = () => void;

export function DialogDemo({section}: PropsDecalration ) {

  const [duration, setDuration] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [videoFile, setVideoFile] = useState<File | null>();
  const [allSet, setAll] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isFree, setIsFree] = useState<boolean>(false);
  const [resetFile, setResetFile] = useState<ChildFunctionType | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>(() =>
      [...section.lessons].sort((a, b) => a.order - b.order)
    );
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
    

  const handleFileSelect=(e:any)=>
  {
    setVideoFile(e)
  }
  const handleDuration=(e:any)=>
  {
    setDuration(e)
  }

  useEffect(()=>
  {
    if(title && title.length>2 && duration>60 && videoFile && videoFile.size<=(100*1024*1024))
    {
      setAll(true)
    }
    else
    {
      setAll(false);
    }
  }, [title, duration, videoFile, isActive, isFree])

  const resetall=async()=>
  {
    setDuration(0)
    setTitle('')
    setVideoFile(null)
    setAll(false)
    setIsActive(false)
    setIsFree(false)
    if(resetFile)
    {
      resetFile();
    }
    
  }

  const handleRegisterFunction = (fn: ChildFunctionType) => {
    setResetFile(() => fn);
  };
  const createLesson = async () =>
  {
    dispatch(showLoader());
    setAll(false);
    try{
        if(title && title.length>2 && duration>60 && videoFile && videoFile.size<=(100*1024*1024))
              {
                const formData = new FormData();
                formData.append('video', videoFile);

                const videoResp = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ultra/upload-video-lesson`, formData);
                console.log(videoResp)
                const data = {
                  title,
                  duration,
                  sectionId: section.id,
                  courseId: section.courseId,
                  isFree,
                  isActive,
                  public_id: videoResp.data.data.public_id,
                  secure_url: videoResp.data.data.secure_url,
                  MetaData: videoResp.data.data,
                }
                const resp = await UplaodLesson(data)
                if(!resp.success)
                {
                  toast.error("Didn't create the lesson")
                  return;
                }
                toast.success("Lesson Created")
                setLessons([...lessons, resp.data])

              }
              else
              {
                toast.error("See the requirements carefully.")
              }
    }
    catch (error) {
      console.error('Error creating lesson:', error);
    }finally{
      
      dispatch(hideLoader());
    }
    
  }

  const handleDragEnd = async (result: DropResult) => {
      dispatch(showLoader());
      if (!result.destination){ 
        dispatch(hideLoader()); return};
  
      const items = Array.from(lessons);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
  
  
      setLessons(items);
  
      const changedSections = items
      .map((theLessons, newIndex) => ({
        id: theLessons.id,
        sectionId: theLessons.sectionId,
        newIndex,
        oldIndex: lessons.findIndex(s => s.id === theLessons.id)
      }))
      .filter(({ newIndex, oldIndex }) => newIndex !== oldIndex);

      console.log(changedSections)
  
      if(changedSections.length>0)
      {
        await updateLessonsOrder(changedSections);
      }
      
      dispatch(hideLoader());
      
    };

    const updateLessonsOrder = async (updatedLessons: reOrderObject[]) => {
        setIsLoading(true);
        setError(null);
        try {
          console.log(updatedLessons)
          const response = await putDataToBackend(`/api/ultra/lesson/reorder`, updatedLessons);
    
          if (!response.success) {
            throw new Error('Failed to update lessons order');
          }
    
          toast.success(`${response.message}`);
        } catch (error) {
          console.error('Error updating lessons order:', error);
          setError('Failed to save lessons order. Please try again.');
          // Revert to previous state if update fails
          setLessons([...lessons]);
        } finally {
          setIsLoading(false);
        }
      };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-slate-500 hover:text-slate-600">
          
      <TvMinimalPlay size={20}/>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[80%] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Section Lessons</DialogTitle>
          <DialogDescription>
            {section.title}
          </DialogDescription>

        </DialogHeader>
        <div className="overflow-auto pe-2">
          <div className="py-2 mb-4">
            <h1 className="text-2xl pb-4 font-bold">Add New Video Lesson</h1>
            <div className="flex gap-5">
            <div className="w-2/4 px-1">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Title of the video" value={title} className="h-auto py-3 shadow-none" type="text" onChange={(e)=> setTitle(e.target.value)} />
              </div>
              <div className="flex flex-col gap-5 py-5">
                <div className="flex items-center space-x-2">
                  <Checkbox id="isActive" checked={isActive} onCheckedChange={(e:boolean)=> setIsActive(e)} />
                  <Label className="text-base font-normal" htmlFor="isActive">is Featuring?</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox checked={isFree} id="isFree" onCheckedChange={(e:boolean)=> setIsFree(e)} />
                  <Label className="text-base font-normal"  htmlFor="isFree">is Free? (is available for Preview?)</Label>
                </div>
                <h1>Note: The video lesson must be at least 1 min long.</h1>
                
              </div>
              {
                allSet?
                <>
                <Button onClick={createLesson}>
                  Uplaod Lesson
                </Button>
                </>
                :
                <>
                <Button disabled>
                  Uplaod Lesson
                </Button>
                </>
              }

              <Button className="mx-2" variant={"destructive"} onClick={resetall}>
                Reset
              </Button>
              
            </div>
            <FilePicker
            className="w-2/4"
            maxSize={100 * 1024 * 1024}
              onFileSelect={handleFileSelect}
              videoDuration={handleDuration}
              resetFiles={handleRegisterFunction}
              accept="video/*"
              label="Upload single video (MP4). Minimum 1 min long."
              />
          </div>
          </div>
          

    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="sections">
        {(provided) => (
          <div
            {...provided.droppableProps}
            
            ref={provided.innerRef}
            className="space-y-3"
          >
            {
            lessons.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                No sections added yet. Create your first section above.
              </div>
            ) : 
            (
          lessons.map((content, index) => (
            <Draggable key={content.id} draggableId={content.id} index={index}
            >
              {(provided) => (
                <div ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                 key={index} 
                 style={{ ...provided.draggableProps.style,
                  left: "auto !important",
                  top: "unset !important",
                  }}
                  className="relative"
                 >
                  <div className="relative w-full flex items-center gap-4 justify-between p-5 rounded-md border bg-white-100"
                 
                  >
            <TvMinimalPlay strokeWidth={1.8} />
            <div className="text-base w-full">
              {content.title}
            </div>
            {content.isFree && (
              <div className="text-base text-red-600">FREE</div>)}
            <div className="text-base underline cursor-pointer text-blue-600">
              Preview
            </div>
            <div className="text-base text-gray-600">
              {secondsToMinSec(content.duration)}
            </div>
            <button className="text-yellow-500 hover:text-yellow-700">
              <Pencil size={20}/>
            </button>
            <button className="text-red-500 hover:text-red-700">
              <Trash2 size={20}/>
            </button>
            <button
            {...provided.dragHandleProps}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Drag to reorder"
            >
              <Menu size={20}/>
            </button>
      </div>
      </div>
              )}
            </Draggable>
          ))
            )
            }
          {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
          
        </div>
        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  )
}
