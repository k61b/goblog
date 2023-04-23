import { Post } from '@/models/types'
import Image from 'next/image'

type Props = {
  post: Post
}

export function Post({ post }: Props) {
  return (
    <div className="flex flex-col w-72 h-72 bg-white rounded-md shadow-md">
      <div className="flex flex-col items-center justify-center w-full h-1/2">
        <Image
          src="https://picsum.photos/200/200"
          alt={post.title}
          width={200}
          height={200}
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full h-1/2">
        <h3 className="text-xl font-bold">{post.title}</h3>
        <p className="text-sm text-gray-500">{post.content}</p>
      </div>
    </div>
  )
}
