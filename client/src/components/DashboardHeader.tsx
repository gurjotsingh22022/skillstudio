"use client"
import { ChevronDown, ChevronRight, DollarSign, LogOut, Plus, Search, Settings, ShoppingBag, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button";
import { signIn, signOut } from "next-auth/react";
import { fetchDataFromBackend } from "../../actions/query/axiosQuery";
import { LoginExpress } from "../../actions/auth/login";
import { RoleCreateExpress } from "../../actions/roles/roles";
import { useSelector } from "react-redux";
import { getSessionData } from "../../actions/storedData/methods";
import { Skeleton } from "./ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useRouter } from "next/router";
import TopScroller from "./ScrollToTop";

const components: { title: string; href: string }[] = [
  {
    title: "Business",
    href: "/docs/primitives/alert-dialog",
  },
  {
    title: "Marketing",
    href: "/docs/primitives/hover-card",
  },
  {
    title: "IT & Development",
    href: "/docs/primitives/progress",
  },
  {
    title: "Finance & Investment",
    href: "/docs/primitives/scroll-area",
  },
  {
    title: "Design",
    href: "/docs/primitives/tabs",
  },
]

function DashboardHeader() {
  const [show, handleShow] = useState(false);
  const {user, loading } = useSelector((state: any) => state.auth);
  console.log(user)
  const transitionNavBar = () => {
    if (window.scrollY > 80) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => {
      window.removeEventListener("scroll", transitionNavBar);
    };
  }, []);

  return (
    <div className="w-full">
      <TopScroller/>
      <header
        className={`z-50 w-full bg-white-100 flex gap-8 items-center justify-between py-3 px-8 transition duration-200 ease-in-out`}
      >
        <div className="flex h-[56px] aspect-[86/31]">
          <Link href={'/'} className="" >
          <Image
            className="w-full cursor-pointer"
            src="/SkillStudioLogo.png"
            alt="Skill Studio Logo"
            width={60}
            height={60}
            unoptimized
          />
          </Link>
          
        </div>

        <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-xl font-normal">Courses</NavigationMenuTrigger>
          <NavigationMenuContent>
          <ul className="grid w-[24em] py-3">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                  className="text-lg"
                >
                  
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>

        <div className="flex w-full relative">
        <Input className="h-[45px] shadow-none rounded-full px-14 md:text-lg" type="text" placeholder="Search for course" />
        <Search className="absolute left-3 h-full text-gray-500"/>
        </div>

        

        <div className="flex gap-4 justify-end items-center w-fit">

    

          {/* <Link href="/signin" className="text-lg font-normal w-max mr-4">
            Become Teacher
          </Link> */}

          {
            user?.role==='student'?
            <>
            <Link  href="/signin" className="text-lg font-normal w-max mr-4">
            Become Teacher
          </Link>
            </>
            :
            user?.role==='admin' || user?.role==='instructor'?
            <Link href={`/dashboard/ultra/create`} className="py-2 px-3 pe-5 rounded-full capitalize font-medium gap-1 bg-sidebar-accent inline-flex justify-center items-center">
              <Plus strokeWidth="1" size={25}/> <div className="h-full pt-[2px] text-[14px]">Create
                </div>
            </Link>
            :null
          }
          {
            loading?
            <>
              <Skeleton className="w-[100px] h-8 rounded-full" />
            </>
            :
            <>
              {
              user?.email?
              <>
                  <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {/* <Button variant="outline">Open</Button> */}
            <Avatar className="h-12 w-12 cursor-pointer">
                  <AvatarFallback className="font-medium text-[1.8rem] bg-blue-700 text-white-100">{user?.name[0]}</AvatarFallback>
                  <AvatarImage src={`${user?.image}`} />
                </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-60">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href={`${
                  user?.role==='student'?
                  '/dashboard/lite'
                  :
                  '/dashboard/ultra'
                }`}>
              <DropdownMenuItem className="cursor-pointer">
                
                <User />
                <span>My Profile</span>
                
              </DropdownMenuItem>
                </Link>
              <DropdownMenuItem>
                <DollarSign />
                <span>My Purchases</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings />
                <span>Settings</span>
              </DropdownMenuItem>
              
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={()=> signOut()}>
                <LogOut />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
                
              </>
              :
              <>
              <Link href="/auth/login">
              <button className="border w-max border-blue-700 text-blue-700 hover:bg-slate-100 px-4 rounded-sm py-2 text-white text-lg font-bold mr-4 lg:mr-0">
                Log in
              </button>
            </Link>
            <Link href="/auth/signup">
              <button className="border w-max border-transparent bg-blue-700 hover:bg-blue-600 text-white-100 px-4 rounded-sm py-2 text-white text-lg font-bold mr-4 lg:mr-0">
                Create Account
              </button>
            </Link>
              </>
            }
            </>
          }
        
          {/* <Button onClick={()=> fetchData()}>
            <ShoppingCart size={25}/>
          </Button> */}
        </div>
      </header>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 p-3 px-4 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-lg flex items-center justify-between font-normal leading-none [&_svg]:size-4">{title} <ChevronRight/>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"


export default DashboardHeader;