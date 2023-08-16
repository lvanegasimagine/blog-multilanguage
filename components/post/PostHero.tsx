import { Post } from '@/types/typings'
import React from 'react'
import { PostContent } from '.'
import Image from 'next/image'

interface IPostHeroProps {
    post: Post
}

const PostHero = ({ post }: IPostHeroProps) => {
    return (
        <div>
            <PostContent isPostPage post={post} />
            <Image
                src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${post.image}?key=optimised`}
                alt={post.title}
                width={1280}
                height={500}
                className='object-cover object-center rounded-md h-[300px] md:h-[500px] transition-all mt-6'
            />
        </div>
    )
}

export default PostHero