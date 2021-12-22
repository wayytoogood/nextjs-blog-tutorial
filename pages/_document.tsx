import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head />
        <body>
          <Main />
          <NextScript />
          {/* Notification elementinin render'lanıcağı yeri aşağıdaki div'in içi olarak belirliyoruz. */}
          <div id='notifications'></div>
        </body>
      </Html>
    )
  }
}

export default MyDocument
