import { PostCard, PostList } from '@/components/post';
import { PaddingContainer } from '@/components/layout';
import { DUMMY_POSTS } from '@/DUMMY_DATA';
import { CtaCard } from '@/components/elements/cta';
import directus from '@/lib/directus';
import { notFound } from 'next/navigation';

async function getData() {
  try {
    const posts = await directus.items('post').readByQuery({
      fields: [
        '*',
        'author.first_name',
        'author.last_name',
        'category.id',
        'category.title'
      ]
    })
    console.log("🚀", posts)

    return posts.data;
  } catch (error) {
    throw new Error("Error fetching posts")
  }
}

export default async function Home() {
  const posts = await getData();

  if (!posts) return notFound();
  return (
    <PaddingContainer>
      <main className='space-y-10'>
        <PostCard post={posts[0]} />
        <PostList posts={posts.filter((_post, index) => index > 0 && index < 3)} />
        <CtaCard />
        <PostCard reverse post={posts[3]} />
        <PostList posts={posts.filter((_post, index) => index > 3 && index < 6)} />
      </main>
    </PaddingContainer>
  );
}
