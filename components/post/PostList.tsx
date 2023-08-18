import { Post } from '@/types/typings'
import React from 'react'
import { PostCard } from '.'

enum OrientationEnum {
    VERTICAL = "vertical",
    HORIZONTAL = "horizontal",
}

interface IProps {
    posts: Post[],
    layout?: OrientationEnum,
    locale: string
}
const PostList = ({ posts, layout = OrientationEnum.VERTICAL, locale }: IProps) => {
    return (
        <div className='grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-flow-col lg:auto-cols-fr'>
            {posts.map((post) => (
                <PostCard locale={locale} post={post} key={post.id} layout={layout} />
            ))}
        </div>
    )
}

export default PostList