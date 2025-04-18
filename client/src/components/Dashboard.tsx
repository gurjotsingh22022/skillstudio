'use client'

import { AppSidebar } from "@/components/app-sidebar"
import DashboardHeader from "@/components/DashboardHeader"
import NavbarWithoutUser from "@/components/Header"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Code,
  Command,
  Frame,
  GalleryVerticalEnd,
  GraduationCap,
  House,
  Lightbulb,
  Map,
  Megaphone,
  Palette,
  PieChart,
  Settings,
  Settings2,
  ShoppingCart,
  SquareTerminal,
} from "lucide-react"


// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: {
      visible:true,
      data:[
        {
          title: "Development",
          url: "#",
          icon: Code,
          color: 'blue',
          items: [
            {
              title: "Web Development",
              url: "#",
            },
            {
              title: "Mobile App",
              url: "#",
            },
            {
              title: "Data Science",
              url: "#",
            },
            {
              title: "Game Development",
              url: "#",
            },
            {
              title: "Programming Languages",
              url: "#",
            },
          ],
        },
        {
          title: "Business",
          url: "#",
          icon: Lightbulb,
          color: 'orange',
          items: [
            {
              title: "Entrepreneurship",
              url: "#",
            },
            {
              title: "Communication",
              url: "#",
            },
            {
              title: "Management",
              url: "#",
            },
            {
              title: "Sales",
              url: "#",
            },
          ],
        },
        {
          title: "Finance",
          url: "#",
          icon: BookOpen,
          color: "green",
          items: [
            {
              title: "Introduction",
              url: "#",
            },
            {
              title: "Get Started",
              url: "#",
            },
            {
              title: "Tutorials",
              url: "#",
            },
            {
              title: "Changelog",
              url: "#",
            },
          ],
        },
        {
          title: "Marketing",
          url: "#",
          icon: Megaphone,
          color: "red",
          items: [
            {
              title: "Introduction",
              url: "#",
            },
            {
              title: "Get Started",
              url: "#",
            },
            {
              title: "Tutorials",
              url: "#",
            },
            {
              title: "Changelog",
              url: "#",
            },
          ],
        },
        {
          title: "Design",
          url: "#",
          icon: Palette,
          color: "blue",
          items: [
            {
              title: "Introduction",
              url: "#",
            },
            {
              title: "Get Started",
              url: "#",
            },
            {
              title: "Tutorials",
              url: "#",
            },
            {
              title: "Changelog",
              url: "#",
            },
          ],
        },
      ]
    },
  projects: [
    {
      name: "Home",
      url: "/",
      icon: House,
    },
    {
      name: "Your Courses",
      url: "/my-courses",
      icon: GraduationCap,
    },
    {
      name: "Your Cart",
      url: "#",
      icon: ShoppingCart,
    },
  ],
}

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <>
    <SidebarProvider className="flex-col">
      <header className="flex bg-white-100 border-b border-dashed border-[#dedede] fixed w-full z-50 shrink-0 items-center gap-2 transition-[width,height] ease-linear">
          <div className="flex items-center gap-2 px-4 w-full">
            <SidebarTrigger className="-ml-1 [&_svg]:size-8 h-auto w-auto p-2 rounded-full" />
            {/* <Separator orientation="vertical" className="mr-2 h-4" /> */}
            <DashboardHeader/>
            {/* <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb> */}
          </div>
        </header>

        <div className="flex pt-[77.8px] w-full overflow-auto">
          <AppSidebar className="top-[77.8px] h-[calc(100vh-6rem)] border-r border-dashed border-[#dedede]" data={data}/>
      <SidebarInset className="max-w-[calc((100vw-(100vw-100%))-(var(--sidebar-width)))] peer-data-[state=collapsed]:!max-w-[calc((100vw-(100vw-100%))-(var(--sidebar-width-icon)))] px-5">
        
        {/* <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div> */}

        {children}
      </SidebarInset>
        </div>
      
    </SidebarProvider>
    </>
  )
}
