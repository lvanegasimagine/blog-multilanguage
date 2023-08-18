import { DUMMY_POSTS } from '@/DUMMY_DATA'
import { SocialLinks } from '@/components';
import { CtaCard } from '@/components/elements/cta';
import { PaddingContainer } from '@/components/layout'
import { PostBody, PostHero } from '@/components/post';
import directus from '@/lib/directus';
import { notFound } from 'next/navigation';

interface ISlugProps {
    params: { slug: string, lang: string }
}

export const generateStaticParams = async () => {
    // return DUMMY_POSTS.map((post) => {
    //     return {
    //         slug: post.slug
    //     }
    // })

    try {
        const posts = await directus.items("post").readByQuery({
          filter: {
            status: {
              _eq: "published",
            },
          },
          fields: ["slug"],
        });
    
        const params = posts?.data?.map((post) => {
          return {
            slug: post.slug as string,
            lang: "en",
          };
        });
    
        const localisedParams = posts?.data?.map((post) => {
          return {
            slug: post.slug as string,
            lang: "de",
          };
        });
    
        // Concat Localised and Regular Params
        const allParams = params?.concat(localisedParams ?? []);
    
        return allParams || [];
      } catch (error) {
        console.log(error);
        throw new Error("Error fetching posts");
      }
}

const SlugPage = async ({ params }: ISlugProps) => {
    // const post = DUMMY_POSTS.find((post) => post.slug === params.slug)
    const locale = params.lang;


    const getPostData = async () => {
        try {
            const post = await directus.items("post").readByQuery({
              filter: {
                slug: {
                  _eq: params.slug,
                },
              },
              fields: [
                "*",
                "category.id",
                "category.title",
                "auhtor.id",
                "author.first_name",
                "author.last_name",
                "translations.*",
                "category.translations.*",
              ],
            });
        
            const postData = post?.data?.[0];
        
            if (locale === "en") {
              return postData;
            } else {
              const localisedPostData = {
                ...postData,
                title: postData?.translations?.[0]?.title,
                description: postData?.translations?.[0]?.description,
                body: postData?.translations?.[0]?.body,
                category: {
                  ...postData?.category,
                  title: postData?.category?.translations?.[0]?.title,
                },
              };
        
              return localisedPostData;
            }
          } catch (error) {
            console.log(error);
            throw new Error("Error fetching post");
          }
    }

    const post = await getPostData();

    if (!post) return notFound()
    return (
        <PaddingContainer>
            <div className='space-y-10'>
                <PostHero locale={locale }post={post} />
                <div className='mt-10 flex gap-10 flex-col md:flex-row'>
                    <div className='relative'>
                        <div className='sticky top-20 items-center flex md:flex-col gap-5'>
                            <div className='font-medium md:hidden'> Share this content: </div>
                            <SocialLinks
                                isShareURL
                                platform="facebook"
                                link={`https://www.facebook.com/sharer/sharer.php?u=${`${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}`}
                            />
                            <SocialLinks
                                isShareURL
                                platform="twitter"
                                link={`https://twitter.com/intent/tweet?url=${`${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}`}
                            />
                            <SocialLinks
                                isShareURL
                                platform="linkedin"
                                link={`https://www.linkedin.com/shareArticle?mini=true&url=${`${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}`}
                            />
                        </div>

                    </div>
                    <PostBody body={post.body} />
                </div>
                <CtaCard locale={locale} />
            </div>
        </PaddingContainer>
    )
}

export default SlugPage