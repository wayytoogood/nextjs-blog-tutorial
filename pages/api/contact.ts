import type { NextApiRequest, NextApiResponse } from 'next'
import { InsertOneResult, ObjectId } from 'mongodb'
import { connectDB, insertDocument } from '../../connectDB'

export type InputTypes = {
  name?: string
  email?: string
  message?: string
  id?: ObjectId
}

export type Data = { message: string; newMessage?: InputTypes }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const body = req.body as InputTypes
    const { name, email, message } = body

    if (
      (!name || name?.trim() === '' || !email,
      !email?.includes('@') || !message,
      message?.trim() === '')
    ) {
      return res.status(422).json({ message: 'Invalid input values!' })
    }

    const newMessage: InputTypes = {
      name,
      email,
      message,
    }

    const client = await connectDB(res)

    let result: InsertOneResult<Document> | undefined

    if (client) {
      result = await insertDocument(res, client, 'contact', newMessage)
      newMessage.id = result?.insertedId
    }

    return res
      .status(201)
      .json({ message: 'New message has been taken.', newMessage })
  }
}
