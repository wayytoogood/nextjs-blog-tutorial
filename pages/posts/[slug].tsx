import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import PostContent from '../../components/posts/post-detail/post-content'
import { getFileNames, getPostData } from '../../lib/posts-util'
import { ParsedUrlQuery } from 'querystring'
import { PostItemProps } from '../../components/posts/post-item'
import Head from 'next/head'

const SinglePostPage: NextPage<PostItemProps> = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name='description' content={post.excerpt} />
      </Head>
      <PostContent post={post} />
    </>
  )
}

export default SinglePostPage

export const getStaticPaths: GetStaticPaths = async () => {
  const fileNames = getFileNames()
  const slugs = fileNames.map((name) => name.replace(/\.md$/, ''))

  const paths = slugs.map((slug) => ({ params: { slug } }))

  return {
    // paths: [] ve fallback:true yazarak hiçbir sayfanın önceden oluşturulmamasını sağlayabiliyoruz, bu çok fazla post'un olduğu durumlarda uygulanabilir.
    paths,
    // kayıtlı olan bütün post'ları zaten getAllPosts'la getirdiğimiz için fallback'i false olarak ayarlamak zorundayız.
    fallback: false,
  }
}

interface Params extends ParsedUrlQuery {
  slug: string
}

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params as Params
  const post = getPostData(params.slug)

  return {
    props: {
      post,
    },
    // Tüm postların ve featured post'ların getirildiği kısma revalidate eklenmemişti, çünkü hem orası biraz göstermelik hem de pre-render'ın yapılması
    // daha uzun sürecekti. Single post'un re-render'ı çok daha hızlı olacağı için 10dk'lık revalidate ekleniyor.
    revalidate: 600,
  }
}
