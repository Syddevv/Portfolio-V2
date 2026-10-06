import { MongoClient } from 'mongodb'

type ChatLogEntry = {
  message: string
  reply: string
  historyLength: number
  model: string
}

let mongoClient: MongoClient | null = null

async function getClient(uri: string) {
  if (!mongoClient) {
    mongoClient = new MongoClient(uri, { serverSelectionTimeoutMS: 3_000 })
    await mongoClient.connect()
  }
  return mongoClient
}

export async function logChatIfConfigured(entry: ChatLogEntry) {
  const uri = process.env.MONGODB_URI?.trim()
  if (!uri) return

  try {
    const client = await getClient(uri)
    await client.db().collection('portfolio_chat_logs').insertOne({
      ...entry,
      createdAt: new Date(),
    })
  } catch {
    // Logging is optional and must never prevent a successful chat response.
  }
}
