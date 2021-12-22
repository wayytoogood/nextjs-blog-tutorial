import PostsGrid from './posts-grid'
import classes from './all-posts.module.css'
import { PostGridProps } from './posts-grid'

const AllPosts: React.FC<PostGridProps> = ({ posts }) => {
  return (
    <section className={classes.posts}>
      <h1>All Posts</h1>
      <PostsGrid posts={posts} />
    </section>
  )
}

export default AllPosts
