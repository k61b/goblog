import useSWR from 'swr'

export function useAuth() {
  const { data, error, isLoading, mutate } = useSWR('/auth')

  return {
    error,
    isLoading,
    user: data,
    mutateUser: mutate,
  }
}
