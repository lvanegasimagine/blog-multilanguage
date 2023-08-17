import { Post } from '@/types/typings'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { PostContent } from '.'

enum OrientationEnum {
    VERTICAL = "vertical",
    HORIZONTAL = "horizontal",
}

type IPostProps = {
    post: Post,
    layout?: OrientationEnum,
    reverse?: boolean
}
const PostCard: React.FC<IPostProps> = ({ post, layout = OrientationEnum.HORIZONTAL, reverse = false }) => {
    return (
        <Link className={`@container ${layout === OrientationEnum.HORIZONTAL ? 'grid grid-cols-1 md:grid-cols-2 gap-10 items-center' : 'space-y-10'}`} href={`/post/${post.slug}`}>
            <Image
                className={`rounded-md w-full object-cover object-center h-full max-h-[300px] ${reverse ? 'md:order-last' : ''}`}
                src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${post.image}`}
                alt={post.title}
                width={600}
                height={300} />
            <PostContent post={post} />
        </Link>
    )
}

export default PostCard