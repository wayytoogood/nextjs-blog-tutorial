import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'

interface DataInterface {
  // title, date...'in matter fonksiyonu yürütüldükten sonra geleceğini biz biliyoruz fakat bunu typescript'e bildirmemiz gerekiyor, soru işaretlerini
  // gray-matter paketi error verdiği için mecburen koyuyoruz.
  data: {
    title?: string
    date?: string
    image?: string
    excerpt?: string
    isFeatured?: boolean
  }
  content: string
}

const postsPath = path.join(process.cwd(), 'posts')

// verilen directory'deki dosyaların ismini array içinde getiriyor.
export const getFileNames = () => fs.readdirSync(postsPath)

export const getPostData = (postIdentifier: string) => {
  // postIdentifier ya slug ya da dosyanın direk ismi oluyor.
  const slug = postIdentifier.replace(/\.md$/, '')

  const filePath = path.join(postsPath, `${slug}.md`)

  const fileContent = fs.readFileSync(filePath, 'utf-8')

  const file: DataInterface = matter(fileContent)

  const { content, data } = file

  return {
    content,
    ...data,
    slug,
  }
}

export const getAllPosts = () => {
  const postFiles = getFileNames()

  const postsData = postFiles.map((file) => getPostData(file))

  const sortedPosts = postsData.sort((postA, postB) => {
    if (postA.date! > postB.date!) {
      return -1
    } else if (postA.date! < postB.date!) {
      return 1
    } else {
      return 0
    }
  })

  return sortedPosts
}

export const getFuturedPost = () => {
  const allPosts = getAllPosts()
  const futurePosts = allPosts.filter((post) => post.isFeatured)
  return futurePosts
}
