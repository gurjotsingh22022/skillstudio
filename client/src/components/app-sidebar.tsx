"use client"

import * as React from "react"
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
  Settings2,
  ShoppingCart,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Separator } from "./ui/separator"

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
  navMain: [
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
  ],
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  console.log(props.data.navMain)
  return (
    <Sidebar collapsible="icon" {...props}>
      {props.children}
      {/* <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader> */}
      <SidebarContent className="p-4">
        <NavProjects projects={props.data.projects} />
        {
          
        props.data.navMain.visible?
        <>
        <Separator/>
        <NavMain items={props.data.navMain.data} />
        <Separator/>
        </>
        :
        null
        }
      </SidebarContent>

{
  props.data.foot?
  <SidebarFooter className="justify-center">
        <NavProjects projects={props.data.foot} />
      </SidebarFooter>:null
}
      
      {/* <SidebarRail /> */}
    </Sidebar>
  )
}
