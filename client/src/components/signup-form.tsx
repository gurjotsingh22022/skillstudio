import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create account and Start Learning</h1>
      </div>
      <div className="grid gap-6">
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            continue with
          </span>
        </div>
        <Button variant="outline" className="w-full items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              fill="currentColor"
            />
          </svg>
          Login with Google
        </Button>
        <Button variant="outline" className="w-full items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              fill="currentColor"
            />
          </svg>
          Login with GitHub
        </Button>
        <Button variant="outline" className="w-full items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M4.98 3.5C4.98 2.12 3.87 1 2.49 1S0 2.12 0 3.5 1.12 6 2.5 6 4.98 4.88 4.98 3.5zM.47 8.13h4.07v14.74H.47V8.13zM8.11 8.13h3.91v2.01h.06c.54-.97 1.87-1.99 3.85-1.99 4.11 0 4.87 2.71 4.87 6.24v8.48h-4.07v-7.52c0-1.79-.03-4.09-2.5-4.09-2.5 0-2.88 1.96-2.88 3.98v7.63H8.11V8.13z"
            fill="currentColor"
          />
          </svg>
          Login with LinkedIn
        </Button>
        <Button variant="outline" className="w-full items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="items-center" viewBox="0 0 24 24">
          <path
    d="M17.32 2H21l-7.42 8.48L22.5 22h-6.45l-4.85-6.73L5.2 22H1.5l7.92-9.08L1 2h6.67l4.47 6.2L17.32 2Zm-1.1 18.16h1.79L6.51 3.78H4.6l11.62 16.38Z"
    fill="currentColor"
  />
          </svg>
          Login with X
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/auth/login" className="underline underline-offset-4">
          Log in
        </Link>
      </div>
    </form>
  )
}
