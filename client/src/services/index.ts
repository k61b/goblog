import { Post } from '@models/types'
import { axiosInstance } from '@utils/fetcher'

type CreateSession = {
  username: string
  password: string
}

type CreatePost = {
  title: string
  content: string
}

export function createSession({ username, password }: CreateSession) {
  return axiosInstance.post('/session', {
    username: username,
    password: password,
  })
}

export function createPost({ title, content }: CreatePost): Promise<Post> {
  return axiosInstance
    .post('/posts', {
      title: title,
      content: content,
    })
    .then((res) => res.data)
}
