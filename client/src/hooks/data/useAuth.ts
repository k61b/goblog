import { User } from '@models/types'
import useSWR from 'swr'

export function useAuth() {
  const { data, error, isLoading, mutate } = useSWR<User>('/auth')

  return {
    error,
    isLoading,
    user: data,
    mutateUser: mutate,
  }
}
