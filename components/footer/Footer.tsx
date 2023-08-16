import React from 'react'
import { PaddingContainer } from '../layout'
import siteConfig from '../config/site'
import Link from 'next/link'
import SocialLinks from '../elements/socialLinks/SocialLinks'


const Footer = () => {
    return (
        <div className='py-8 border-t mt-10'>
            <PaddingContainer>
                <div>
                    <h2 className='text-3xl font-bold'>{siteConfig.siteName}</h2>
                    <p className='max-w-md mt-2 text-lg text-neutral-700'>{siteConfig.description}</p>
                </div>
                <div className='flex flex-wrap justify-between gap-4 mt-6'>
                    <div>
                        <div className="font-medium text-lg">#exploreworld</div>
                        <div className="flex items-center gap-3 text-neutral-600 mt-2">
                            <SocialLinks platform='facebook' link={siteConfig.socialLinks.facebook} />
                            <SocialLinks platform='twitter' link={siteConfig.socialLinks.twitter} />
                            <SocialLinks platform='instagram' link={siteConfig.socialLinks.instagram} />
                            <SocialLinks platform='youtube' link={siteConfig.socialLinks.youtube} />
                            <SocialLinks platform='linkedin' link={siteConfig.socialLinks.linkedin} />
                            <SocialLinks platform='github' link={siteConfig.socialLinks.github} />
                        </div>
                    </div>
                    <div>
                        <div className="text-sm text-neutral-400">Currently At</div>
                        <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-md shadow-md">
                            <div className="w-2 h-2 rounded-full bg-emerald-400" />
                            {siteConfig.currentlyAt}
                        </div>
                    </div>
                </div>
                <div className='border-t py-3 flex items-center gap-4 flex-wrap justify-between mt-16'>
                    <div className='text-sm text-neutral-400'>All rights area reserverd | Copyright {new Date().getFullYear()}</div>
                    <div className='text-sm'>Made with love by <Link className='underline underline-offset-4' href='https://github.com/lvanegasimagine'>@lvanegas</Link> </div>
                </div>
            </PaddingContainer>
        </div>
    )
}

export default Footer