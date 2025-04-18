"use client"

import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import React from 'react'

const page = () => {
  return (
    <Button onClick={()=> signIn("google")}>
        Google
    </Button>
  )
}

export default page