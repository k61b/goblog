import { Post } from '@models/types'
import Image from 'next/image'

type Props = {
  post?: Post
}

export function Post({ post }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {post && (
        <div className="flex flex-col items-center justify-center">
          <Image
            src={'https://picsum.photos/500/500'}
            alt={post.title}
            width={500}
            height={500}
            className="rounded-lg"
          />
          <h1 className="text-4xl font-bold">{post.title}</h1>
          <p className="text-xl">{post.content}</p>
        </div>
      )}
    </div>
  )
}
