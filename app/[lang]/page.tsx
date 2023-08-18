import { PostCard, PostList } from '@/components/post';
import { PaddingContainer } from '@/components/layout';
import { CtaCard } from '@/components/elements/cta';
import directus from '@/lib/directus';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/lib/getDictionary';

export default async function Home({ params }: { params: { lang: string } }) {

  const locale = params.lang;

  const getAllPosts = async () => {
    try {
      const posts = await directus.items("post").readByQuery({
        fields: [
          "*",
          "author.id",
          "author.first_name",
          "author.last_name",
          "category.id",
          "category.title",
          "category.translations.*",
          "translations.*",
        ],
      });

      if (locale === "en") {
        return posts.data;
      } else {
        const localisedPosts = posts.data?.map((post) => {
          return {
            ...post,
            title: post.translations[0].title,
            description: post.translations[0].description,
            body: post.translations[0].body,
            category: {
              ...post.category,
              title: post.category.translations[0].title,
            },
          };
        });
        return localisedPosts;
      }

      /* console.log(posts.data?.[0]); */
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching posts");
    }
  };

  const posts = await getAllPosts();

  if (!posts) {
    notFound();
  }

  /* Get Dictionary */
  const dictionary = await getDictionary(locale);
  return (
    <PaddingContainer>
      <main className='space-y-10'>
        <PostCard post={posts[0]} locale={locale} />
        <PostList posts={posts.filter((_post, index) => index > 0 && index < 3)} locale={locale} />
        <CtaCard locale={locale} />
        <PostCard locale={locale} reverse post={posts[3]} />
        <PostList posts={posts.filter((_post, index) => index > 3 && index < 6)} locale={locale} />
      </main>
    </PaddingContainer>
  );
}
