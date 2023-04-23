import { Post } from '@/models/types'
import useSWR from 'swr'

export function usePosts() {
  const { data, error, isLoading, mutate } = useSWR<Post[]>('/posts')

  return {
    error,
    isLoading,
    posts: data,
    mutatePosts: mutate,
  }
}
