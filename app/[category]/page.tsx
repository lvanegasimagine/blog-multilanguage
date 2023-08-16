import { DUMMY_CATEGORIES, DUMMY_POSTS } from '@/DUMMY_DATA'
import { PaddingContainer } from '@/components/layout'
import { PostList } from '@/components/post'
import directus from '@/lib/directus'
import { Post } from '@/types/typings'
import { notFound } from 'next/navigation'

interface ICategoryProps { params: { category: string } }

export const generateStaticParams = async () => {
    // return DUMMY_CATEGORIES.map((category) => {
    //     return {
    //         category: category.slug
    //     }
    // })

    try {
        const categories = await directus.items("category").readByQuery({
            filter: {
              status: {
                _eq: "published",
              },
            },
            fields: ["slug"],
          });
        const params = categories?.data?.map((category) => {
            return {
                category: category.slug as string,
            }
        })

        return params || []
    } catch (error) {
        throw new Error("Error fetching category");

    }
}

const CategoryPage = async ({ params }: ICategoryProps) => {
    // const category = DUMMY_CATEGORIES.find((category) => category.slug === params.category)
    // const posts = DUMMY_POSTS.filter((post) => post.category.title.toLocaleLowerCase() === params.category)

    async function getCategoryData() {
        try {
            const category = await directus.items('category').readByQuery({
                filter: {
                    slug: {
                        _eq: params.category
                    }
                },
                fields: ['*', 'posts.*', 'posts.author.id', 'posts.author.first_name', 'posts.author.last_name', 'posts.category.id', 'posts.category.title']
            });
            return category?.data?.[0]
        } catch (error) {
            console.log(error)
            throw new Error("Error Fetching category data")
        }
    }
    const category = await getCategoryData()

    if (!category) return notFound();

    const typeCorrectedCategory = category as unknown as {
        id: string;
        title: string;
        description: string;
        slug: string;
        posts: Post[];
    }

    console.log(typeCorrectedCategory.posts)
    return (
        <PaddingContainer>
            <div className='mb-10'>
                <h1 className='text-4xl font-semibold'>{category?.title}</h1>
                <p className='text-lg text-neutral-600'>{category?.description}</p>
            </div>
            <PostList posts={typeCorrectedCategory.posts} />
        </PaddingContainer>
    )
}

export default CategoryPage