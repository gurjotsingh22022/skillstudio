
import { GalleryVerticalEnd } from "lucide-react"
import { signIn, getProviders } from "next-auth/react";

import Link from "next/link"
import Image from "next/image"
import { LoginForm } from "@/components/login-form";

const LoginPage=async()=> {
  const providers: any = await getProviders();
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/oppen.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
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
            <LoginForm providers={providers}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;
