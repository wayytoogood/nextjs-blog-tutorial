import Image from 'next/image'
import Link from 'next/link'
import classes from './post-item.module.css'
import { PostProps } from './posts-grid'

export interface PostItemProps {
  post: PostProps
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const { title, image, excerpt, date, slug } = post

  const formattedData = new Date(date!).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const imagePath = `/images/posts/${slug}/${image}`

  console.log(imagePath)
  const linkPath = `/posts/${slug}`

  return (
    <li className={classes.post}>
      <Link href={linkPath}>
        <a>
          <div className={classes.image}>
            <Image
              src={imagePath}
              alt={title}
              width={300}
              height={200}
              // layout='responsive'
            />
          </div>
          <div className={classes.content}>
            <h3>{title}</h3>
            <time>{formattedData}</time>
            <p>{excerpt}</p>
          </div>
        </a>
      </Link>
    </li>
  )
}

export default PostItem
