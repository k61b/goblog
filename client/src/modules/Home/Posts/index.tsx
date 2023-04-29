import { usePosts } from '@hooks/data'
import { Post } from '@components/Shared/Post'

function Posts() {
  const { posts } = usePosts()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {posts?.map((post) => (
        <a key={post.id} href={`/post/${post.id}`}>
          <Post post={post} />
        </a>
      ))}
    </div>
  )
}

export default Posts
