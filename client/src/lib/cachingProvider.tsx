
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { getQueryClient } from './queryClient'

export default function QueryProviders({ children }: { children: ReactNode }) {
  // const queryClient = new QueryClient({
  //   defaultOptions: {
  //     queries: {
  //       staleTime: 60 * 60 * 1000, // 1 hour
  //       gcTime: 24 * 60 * 60 * 1000, // 24 hours
  //       refetchOnWindowFocus: false, // Critical!
  //       refetchOnReconnect: false,
  //       refetchOnMount: false
  //     }
  //   }
  // })

  return (
    <QueryClientProvider client={getQueryClient()}>
      {children}
    </QueryClientProvider>
  )
}