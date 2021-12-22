import { GetStaticProps, NextPage } from 'next'
import AllPosts from '../../components/posts/all-posts'
import { PostProps } from '../../components/posts/posts-grid'
import { getAllPosts } from '../../lib/posts-util'

interface Props {
  posts: PostProps[]
}

const AllPostsPage: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <title>All Posts</title>
      <meta
        name='description'
        content='A list of all programming-related tutorials and posts.'
      />
      <AllPosts posts={posts} />
    </>
  )
}

export default AllPostsPage

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts()
  return {
    props: {
      posts,
    },
  }
}
