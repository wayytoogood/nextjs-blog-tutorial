import PostHeader from './post-header'
import classes from './post-content.module.css'
import ReactMarkdown, { Components } from 'react-markdown'
import { PostItemProps } from '../post-item'
import Image from 'next/image'
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
// import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

// Syntaxhighlighter yukardaki şekilde kullanıldığında bütün dilleri destekleyecek şekilde geliyo ve bu da dosyamızın boyutunun
// çok fazlalaşmasına neden oluyo, bu durumun önüne geçmek için light versiyonunu(PrismLight) çağırıp, sadece kullanacağımız dilleri ekliyoruz.
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
// import { atomDark } yazıldığında yine bütün dosya çağrılacağı için dosya boyutu daha fazla oluyormuş.
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark'
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css'

SyntaxHighlighter.registerLanguage('js', js)
SyntaxHighlighter.registerLanguage('css', css)

const PostContent: React.FC<PostItemProps> = ({ post }) => {
  const imagePath = `/images/posts/${post.slug}/${post.image}`

  const customComponents: Components = {
    // Aşağıdaki geçerli olacağı için bunu kaldırıyoruz.
    // img(image: any) {
    //   return (
    //     <Image
    //       src={`/images/posts/${post.slug}/${image.src}`}
    //       alt={image.title}
    //       width={600}
    //       height={300}
    //       layout='responsive'
    //     />
    //   )
    // },

    p(paragraph: any) {
      // Markdown otomatik olarak her boşluktan sonra p tag'ı ekliyoruz, image'lerde bu tag'ın koyulmaması için aşağıdaki kodu yazıyoruz.
      // node ilk element yani otomatik koyulan p tagi oluyor.
      const { node } = paragraph

      if (node.children[0].tagName === 'img') {
        const image = node.children[0]
        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${post.slug}/${image.properties.src}`}
              alt={image.properties.alt}
              width={600}
              height={300}
              layout='responsive'
            />
          </div>
        )
      }
      //
      return <p>{paragraph.children}</p>
    },

    code(code: any) {
      const { className, children } = code

      // className'den dönen değer language-js oluyor ve match'ın ikinci elemanı da js oluyor.
      const match = /language-(\w+)/.exec(className || '')!

      return (
        // <SyntaxHighlighter
        //   style={atomDark}
        //   language={match[1]}
        //   children={children}
        // />
        // children prop'u kullanıldığında eslint hatası alacağımız için aşağıdaki gibi yazılıyor.
        <SyntaxHighlighter style={atomDark} language={match[1]}>
          {children}
        </SyntaxHighlighter>
      )
    },
  }

  return (
    <article className={classes.content}>
      <PostHeader title={post.title!} image={imagePath} />
      <ReactMarkdown components={customComponents}>
        {post.content}
      </ReactMarkdown>
    </article>
  )
}

export default PostContent
