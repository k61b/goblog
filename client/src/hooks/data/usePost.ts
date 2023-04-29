import { Post } from '@models/types'
import useSWR from 'swr'

export function usePost(id: string) {
  const { data, error, isLoading, mutate } = useSWR<Post>(`/posts/${id}`)

  return {
    error,
    isLoading,
    post: data,
    mutatePost: mutate,
  }
}
