import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ChartColumn, Earth, EllipsisVertical, Eye, LockKeyhole, Pen, Pencil, ScanEye, Share2Icon, StickyNote, Trash2, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
  
  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ]
  

interface props {
    data: any
}

  export function TableDemo({data}:props) {
    return (
      <Table>
        <TableCaption>A list of your recent courses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Thumbnail</TableHead>
            <TableHead></TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Visibility</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Language</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead className="text-right">Student Access (months)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((course: any, i:number) => (
            <TableRow key={i} className="course-table" id="course-table">
              <TableCell className="text-wrap !w-[150px]">
                    <div className="aspect-video object-cover object-center !h-[80px] relative overflow-hidden rounded-xl">
                    <Image width={120} height={80} className="h-full w-full object-cover object-center" alt="Thumbnail" src={course.thumbnailUrl} />
                    <span className="absolute bottom-2 right-2 z-10 px-2 py-1 text-[12px] font-medium text-white-100 rounded-md bg-[rgba(0,0,0,0.7)]">
                        {course.duration} min
                    </span>
                    </div>
                
                
              </TableCell>
              <TableCell className="!w-[300px] text-wrap">
                <Link href={`/`} className="line-clamp-1 mb-1 text-[13.5px] font-medium hover:underline">{course.title}</Link>
                <div className="relative line-clamp-2 text-gray-600 font-normal" id="the-course-dis">{course.description}
                <div className="absolute z-10 top-0 left-0 h-full w-full inline-flex items-end gap-1 invisible" id="the-course-actions">
                  <Link href={`content/edit/${course.id}`} className="p-2 rounded-full cursor-pointer hover:bg-[rgba(0,0,0,0.1)] hover:text-red-800">
                    <Pencil size={20} />
                  </Link>
                  <Link href={`/`} className="p-2 rounded-full cursor-pointer hover:bg-[rgba(0,0,0,0.1)] hover:text-red-800">
                  <ChartColumn size={20}/>
                  </Link>
                  <Link href={`content/preview/${course.id}`} className="p-2 rounded-full cursor-pointer hover:bg-[rgba(0,0,0,0.1)] hover:text-red-800">
                  <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                            <Eye size={20} />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Course Preview</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                  
                  </Link>
                  {
                    course.status!='draft'?
                    <div className="p-2 rounded-full cursor-pointer hover:bg-[rgba(0,0,0,0.1)] hover:text-red-800">
                      {
                        course.isActive?
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <LockKeyhole size={20}/>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Make it Private</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        :
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Earth size={20}/>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Make it Public</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                      }
                    
                  </div>
                  :null
                  }
                  <div className="p-2 rounded-full cursor-pointer hover:bg-[rgba(0,0,0,0.1)] hover:text-red-800">
                    <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <EllipsisVertical size={20} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Pencil />
              <span>Edit Title & Description</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Share2Icon />
              <span>Get Shareable Link</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash2 />
              <span>Delete Forever</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      </div>
                
                </div>
                </div>
                
              </TableCell>
              <TableCell className="capitalize">
                <div className="inline-flex items-end gap-1">
                {
                    course?.status==='draft'?
                    <>
                    <StickyNote strokeWidth={1} size={20}/>
                    </>
                    :
                    course?.status==='private'?
                    <>
                    <LockKeyhole strokeWidth={1} size={20}/>
                    </>
                    :
                    course?.status==='public'?
                    <>
                    <Earth strokeWidth={1} size={20}/>
                    </>
                    :null
                }
                {course.status}
                </div>
                </TableCell>
              <TableCell>{course.isActive?`Public`:`Private`}</TableCell>
              <TableCell>{course.price}</TableCell>
              <TableCell>{course.language}</TableCell>
              <TableCell>{course.duration}</TableCell>
              <TableCell className="text-right">{course.timeAccess || `Lifetime Access`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    )
  }
  