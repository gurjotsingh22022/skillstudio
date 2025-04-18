"use client"

import { ChevronRight, CircleEllipsis, Ellipsis, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    color?: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  return (
    <SidebarGroup className="p-0">
      <SidebarGroupLabel className="text-lg font-semibold text-black mt-4 mb-3">Explore</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="text-black h-auto text-[14px] font-normal gap-4 group-data-[collapsible=icon]:[&_svg]:size-6 group-data-[collapsible=icon]:!size-full group-data-[collapsible=icon]:!p-3 [&_svg]:size-6 p-3 data-[active=true]:font-semibold" tooltip={item.title}>
                  {item.icon && <item.icon color={`${item.color || "black"}`} />}
                  <Link href="#"><span>{item.title}</span></Link>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub className="m-0 mx-2">
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton className="text-black h-auto p-2" asChild>
                        <a href={subItem.url}>
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
        <SidebarMenuItem>
                <SidebarMenuButton className="text-black h-auto text-[14px] font-normal gap-4 group-data-[collapsible=icon]:[&_svg]:size-6 group-data-[collapsible=icon]:!size-full group-data-[collapsible=icon]:!p-3 [&_svg]:size-6 p-3 data-[active=true]:font-semibold [&>span:last-child]:truncate" tooltip={'More'}>
                <Ellipsis />
                  <span className="overflow-hidden">Explore More</span>
                  </SidebarMenuButton>
            </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
