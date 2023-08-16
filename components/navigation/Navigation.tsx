import Link from 'next/link';
import React from 'react';
import PaddingContainer from '../layout/PaddingContainer';

const Navigation = () => {
    return (
        <div className='sticky top-0 z-[999] left-0 right-0 bg-white bg-opacity-50 border-b backdrop-blur-md'>
            <PaddingContainer>
                <nav className='flex items-center justify-between py-6'>
                    <Link className='font-bold' href='/'>Explorer</Link>
                    <ul className='flex items-center gap-4 text-neutral-600'>
                        <li>
                            <Link href={'/cities'}>Cities</Link>
                        </li>
                        <li>
                            <Link href={'/experiences'}>Experiences</Link>
                        </li>
                    </ul>
                </nav>
            </PaddingContainer>
        </div>
    );
};

export default Navigation;
