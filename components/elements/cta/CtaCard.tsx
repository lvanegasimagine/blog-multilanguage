import directus from '@/lib/directus'
import Image from 'next/image'
import React from 'react'

const CtaCard = async () => {

    const formAction = async (formData: FormData) => {
        'use server'
        try {
            const email = formData.get('email')
            console.log("🚀 ~ file: CtaCard.tsx:11 ~ formAction ~ email:", email)
            await directus.items('subscribers').createOne({
                email
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="relative px-6 py-10 overflow-hidden rounded-md bg-slate-100">
            {/* Overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/95 via-white/70 to-white/30" />
            {/* Image */}
            <Image
                fill
                alt="CTA Card Image"
                className="object-cover object-center"
                src="https://images.unsplash.com/photo-1672600830594-ae4ccc159578?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1263&q=80"
            />
            <div className="relative z-20">
                <div className="text-lg font-medium">#exploretheworld</div>
                <h3 className="mt-3 text-4xl font-semibold">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque, provident!
                </h3>
                <p className="max-w-lg mt-2 text-lg">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius sit consequuntur perferendis omnis temporibus? Doloremque nisi aperiam saepe quasi deleniti.
                </p>
                <form className='flex items-center gap-2 mt-6 w-full' action={formAction}>
                    <input
                        type="email"
                        name='email'
                        className='w-full px-3 py-2 text-base rounded-md outline-none md:w-auto placeholder:text-sm bg-white/80 focus:ring-2 ring-neutral-600'
                        placeholder='Write your email'
                    />
                    <button
                        type="submit"
                        className="px-3 py-2 rounded-md whitespace-nowrap bg-neutral-900 text-neutral-200"
                    >Sign up</button>
                </form>
            </div>
        </div>
    )
}

export default CtaCard