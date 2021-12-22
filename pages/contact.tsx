import Head from 'next/head'
import ContactForm from '../components/contact/contact-from'

interface ContactPageProps {}

const ContactPage: React.FC<ContactPageProps> = ({}) => {
  return (
    <>
      <Head>
        <title>Contact me</title>
        <meta name='description' content='Send me your messages.' />
      </Head>
      <ContactForm />
    </>
  )
}

export default ContactPage
