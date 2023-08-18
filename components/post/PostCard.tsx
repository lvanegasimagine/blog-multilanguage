import { Post } from '@/types/typings'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { PostContent } from '.'
import { getDictionary } from '@/lib/getDictionary'

enum OrientationEnum {
    VERTICAL = "vertical",
    HORIZONTAL = "horizontal",
}

type IPostProps = {
    post: Post,
    layout?: OrientationEnum,
    reverse?: boolean,
    locale: string
}
const PostCard: React.FC<IPostProps> = async ({ post, layout = OrientationEnum.HORIZONTAL, reverse = false, locale }) => {
    const dictionary = await getDictionary(locale);
    return (
        <Link className={`@container ${layout === OrientationEnum.HORIZONTAL ? 'grid grid-cols-1 md:grid-cols-2 gap-10 items-center' : 'space-y-10'}`} href={`/${locale}/post/${post.slug}`}>
            <Image
                className={`rounded-md w-full object-cover object-center h-full max-h-[300px] ${reverse ? 'md:order-last' : ''}`}
                src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${post.image}`}
                alt={post.title}
                width={600}
                height={300} />
            <PostContent locale={locale}  post={post} />
        </Link>
    )
}

export default PostCard