import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import FeaturedPosts from '../components/home/featured-posts'
import Hero from '../components/home/hero'
import { getFuturedPost } from '../lib/posts-util'
import { PostProps } from '../components/posts/posts-grid'
import Head from 'next/head'

interface Props {
  featuredPosts: PostProps[]
}

const Home: NextPage<Props> = ({ featuredPosts }) => {
  return (
    <>
      <Head>
        {/* ', "" gibi karakterler girince eslint hatası alıyoruz bu nedenle ya entity kullanmak ya da ilgili eslint kuralını "off" a çekmek zorundayız.  */}
        <title>John&apos;s Blog</title>
        <meta name='description' content='I post about programming.' />
      </Head>
      <Hero />
      <FeaturedPosts posts={featuredPosts} />
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const featuredPosts = getFuturedPost()
  return {
    props: {
      featuredPosts,
    },
  }
}
