import PostItem from './post-item'
import classes from './posts-grid.module.css'

export interface PostProps {
  slug: string
  title?: string
  date?: string
  image?: string
  excerpt?: string
  isFeatured?: boolean
  content: string
}

export interface PostGridProps {
  posts: PostProps[]
}

const PostsGrid: React.FC<PostGridProps> = ({ posts }) => {
  return (
    <ul className={classes.grid}>
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </ul>
  )
}

export default PostsGrid
