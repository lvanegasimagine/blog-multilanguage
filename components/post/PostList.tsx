import { Post } from '@/types/typings'
import React from 'react'
import { PostCard } from '.'

enum OrientationEnum {
    VERTICAL = "vertical",
    HORIZONTAL = "horizontal",
}

interface IProps {
    posts: Post[],
    layout?: OrientationEnum
}
const PostList = ({ posts, layout = OrientationEnum.VERTICAL }: IProps) => {
    return (
        <div className='grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-flow-col lg:auto-cols-fr'>
            {posts.map((post) => (
                <PostCard post={post} key={post.id} layout={layout} />
            ))}
        </div>
    )
}

export default PostList