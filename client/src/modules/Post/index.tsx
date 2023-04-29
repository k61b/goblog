import { usePost } from '@hooks/data'
import { useRouter } from 'next/router'
import { Post } from '@components/Shared/Post'

function PostModule() {
  const router = useRouter()
  const { post } = usePost(router.query.post as string)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Post post={post} />
    </div>
  )
}

export default PostModule
