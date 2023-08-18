import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Post } from '@/types/typings'
import { getReadingTime, getRelativeDate } from '@/lib/helpers'
import { getDictionary } from '@/lib/getDictionary'

interface IPostContent {
    post: Post,
    isPostPage?: boolean,
    locale: string
}

const PostContent = async ({ post, isPostPage = false, locale }: IPostContent) => {
    const dictionary = await getDictionary(locale);
    return (
        <div className='space-y-2'>
            <div className={` flex gap-2 flex-wrap items-center text-neutral-400 ${isPostPage ? 'text-sm' : '@md:text-sm text-xs'}`}>
                <div className={`font-medium ${post.category.title === 'Cities' ? 'text-emerald-500' : 'text-indigo-500'}`}>{post.category.title}</div>
                <div className='w-2 h-2 rounded-full bg-neutral-200' />
                <div>{`${post.author.first_name} ${post.author.last_name}`}</div>
                <div className='w-2 h-2 rounded-full bg-neutral-200' />
                <div>{getReadingTime(post.body, locale)}</div>
                <div className='w-2 h-2 rounded-full bg-neutral-200' />
                <div>{getRelativeDate(post.date_created, locale)}</div>
            </div>

            <h2 className={`${isPostPage ? 'text-2xl md:text-3xl lg:text-4xl font-bold' : '@lg:text-3xl text-xl @md:text-2xl font-medium'}`}>{post.title}</h2>
            <p className="text-neutral-600 leading-snug text-base @lg:text-lg">{post.description}</p>
            {!isPostPage && <div className='flex items-center gap-2 pt-3'>{dictionary.buttons.readMore} <FaArrowRight size={14} /></div>}
        </div>
    )
}

export default PostContent