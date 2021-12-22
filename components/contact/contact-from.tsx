import classes from './contact-form.module.css'
import { useState, FormEvent, ChangeEvent, useEffect } from 'react'
import axios from 'axios'
import Notification from '../notification/notification'

const initialInputValues = {
  name: '',
  email: '',
  message: '',
}

const initialNotificationValues = {
  status: '',
  title: '',
  message: '',
}

const ContactForm = () => {
  const [formInputs, setFormInputs] = useState(initialInputValues)
  const [notificationOn, setNotificationOn] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [notification, setNotification] = useState(initialNotificationValues)

  useEffect(() => {
    if (isFinished) {
      const timer = setTimeout(() => {
        setNotificationOn(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isFinished])

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setIsFinished(false)
      setNotificationOn(true)
      setNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Your message on the way to save.',
      })
      const response = await axios.post('/api/contact', formInputs)
      const { data } = response
      console.log(data)
      setNotification({
        status: 'success',
        title: 'Success!',
        message: 'Your message has been sended.',
      })
      setIsFinished(true)
      setFormInputs(initialInputValues)
    } catch (error) {
      const err = error as Error
      setNotification({
        status: 'error',
        title: 'Error!',
        message: err.message || 'Something went wrong, please try again!',
      })
      setIsFinished(true)
    }
  }

  const changeHandler = (
    e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>
  ) => {
    const name = e.target.name
    const value = e.target.value
    setFormInputs({ ...formInputs, [name]: value })
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor='email'>Your Email</label>
            <input
              name='email'
              type='email'
              id='email'
              value={formInputs.email}
              onChange={changeHandler}
              required
            />
          </div>
          <div className={classes.control}>
            <label htmlFor='name'>Your Name</label>
            <input
              name='name'
              type='text'
              id='name'
              value={formInputs.name}
              required
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor='message'>Your Message</label>
          <textarea
            name='message'
            id='message'
            rows={5}
            value={formInputs.message}
            required
            onChange={changeHandler}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
        {notificationOn && (
          <Notification
            status={notification.status}
            title={notification.title}
            message={notification.message}
          />
        )}
      </form>
    </section>
  )
}

export default ContactForm
