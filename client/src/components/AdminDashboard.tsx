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
  useSidebar,
} from "@/components/ui/sidebar"
import { AudioWaveform, Backpack, BookOpen, ChartColumn, Code, Command, DollarSign, GalleryVerticalEnd, GraduationCap, House, LayoutDashboard, LayoutGrid, Lightbulb, LogOut, Megaphone, Palette, Settings, ShoppingCart, TvMinimalPlay, Users } from "lucide-react"
import Image from "next/image"

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
  navMain: [
    {
        visible:false,
    }
  ],
  projects: [
    {
      name: "Dashboard",
      url: "/dashboard/ultra",
      icon: LayoutDashboard,
    },
    {
      name: "Content",
      url: "/dashboard/ultra/content",
      icon: TvMinimalPlay,
    },
    {
      name: "Analytics",
      url: "/dashboard/ultra/analytics",
      icon: ChartColumn,
    },
    {
      name: "Earnings",
      url: "/dashboard/ultra/earnings",
      icon: DollarSign,
    },
    {
      name: "All Users",
      url: "/dashboard/ultra/earnings",
      icon: Users,
    },
    {
      name: "Enrollments",
      url: "/dashboard/ultra/earnings",
      icon: Backpack,
    },
    {
      name: "UI Layout",
      url: "/dashboard/ultra/ui-layout",
      icon: LayoutGrid,
    },
  ],
  foot: [
    {
      name: "Settings",
      url: "/dashboard/ultra/settings",
      icon: Settings,
    },
    {
      name: "Logout",
      url: "/dashboard/ultra/settings",
      icon: LogOut,
    },
  ],
}

export default function AdminDashboard({ children }: { children: React.ReactNode }) {
  return (
    <>
    <SidebarProvider className="flex-col">
      <header className="flex bg-white-100 border-b border-dashed border-[#dedede] fixed w-full z-50 shrink-0 items-center gap-2 transition-[width,height] ease-linear">
          <div className="flex items-center gap-2 px-4 w-full">
            <SidebarTrigger className="-ml-1 [&_svg]:size-8 h-auto w-auto p-2 rounded-full"  />
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

        <div className="flex pt-[77.8px] w-full">
          <AppSidebar className="top-[77.8px] h-[calc(100vh-[77.8px])] border-r border-[#dedede]" data={data}>
            <div className="flex flex-col items-center gap-3 mt-5 mb-1">
                <div>
                    <div className="w-36 border h-36 group-data-[collapsible=icon]:w-[42px] group-data-[collapsible=icon]:h-[42px] aspect-square object-cover object-center overflow-hidden rounded-full">
                <Image className="w-full h-auto" width={20} height={20} alt="Logo" src={`/SkillStudio.jpg`} unoptimized />
                </div>
                </div>
                <h1 className="text-lg text-center group-data-[collapsible=icon]:hidden">
                    Skill Studio
                </h1>
                
            </div>
                    {/* <Separator/> */}
          </AppSidebar>
      <SidebarInset className="max-w-[calc((100vw-(100vw-100%))-(var(--sidebar-width)))] peer-data-[state=collapsed]:!max-w-[calc((100vw-(100vw-100%))-(var(--sidebar-width-icon)))] min-h-[calc(100svh-77.8px)] px-5">
        
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
