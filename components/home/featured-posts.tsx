import PostsGrid from '../posts/posts-grid'
import classes from './featured-posts.module.css'
import { PostGridProps } from '../posts/posts-grid'

const FeaturedPosts: React.FC<PostGridProps> = ({ posts }) => {
  return (
    <section className={classes.latest}>
      <h2>Featured Posts</h2>
      <PostsGrid posts={posts} />
    </section>
  )
}

export default FeaturedPosts
