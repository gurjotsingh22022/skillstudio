import { QueryClient } from '@tanstack/react-query'

const STALE_TIME = 60 * 60 * 1000 // 1 hour
const GC_TIME = 24 * 60 * 60 * 1000 // 24 hours

let queryClient: QueryClient | undefined = undefined

export function getQueryClient() {
  if (!queryClient) {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: STALE_TIME,
          gcTime: GC_TIME,
          refetchOnWindowFocus: false, // Critical!
          refetchOnReconnect: false,
          refetchOnMount: false
        }
      }
    })
  }
  return queryClient
}