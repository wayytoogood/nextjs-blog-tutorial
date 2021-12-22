import { connect } from 'http2'
import { MongoClient } from 'mongodb'
import { NextApiResponse } from 'next'
import { Data, InputTypes } from '../pages/api/contact'
// import env from 'dotenv'
// env.config()

// nextjs'e dotenv built-in eklenmiş olarak geliyor, o nedenle yüklememize gerek yok.
const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.amdiq.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`

export const connectDB = async (res: NextApiResponse<Data>) => {
  try {
    // Aşağıdaki gibi .env dosyasında kendi oluşturduğumuz değişkeni de kullanabilirdik.
    const client = new MongoClient(connectionString)
    // const client = new MongoClient(process.env.MONGO_URI!)
    await client.connect()
    return client
  } catch (error) {
    res.status(500).json({ message: 'Database connection failed!' })
  }
}

export const insertDocument = async (
  res: NextApiResponse<Data>,
  client: MongoClient,
  col: string,
  document: InputTypes
) => {
  try {
    const db = client.db()
    const collection = db.collection(col)
    const result = await collection.insertOne(document)
    return result
  } catch (error) {
    res.status(500).json({ message: 'Inserting data failed!' })
  }
}
