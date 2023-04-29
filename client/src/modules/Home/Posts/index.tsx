import { usePosts } from '@hooks/data'
import { Post } from '@components/Shared/Post'

function Posts() {
  const { posts } = usePosts()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}

export default Posts
