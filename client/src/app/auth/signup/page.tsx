import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/components/login-form"
import Link from "next/link"
import Image from "next/image"
import { SignupForm } from "@/components/signup-form"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex h-full justify-center flex-col gap-6 p-6 md:p-10">
        <div className="flex w-full justify-center">
          <Link href="/" className="flex items-center justify-center gap-2 font-medium">
            <Image
              className="w-auto h-24 cursor-pointer"
              src="/SkillStudioLogo.png"
              alt="Skill Studio Logo"
              height={30}
              width={30}
              unoptimized
            />
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md">
            <SignupForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/oppenheimer.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
