import { NextResponse } from 'next/server'
import clientPromise from '../../../lib/mongodb'

export async function POST(request) {
  const { name, score } = await request.json()
  const client = await clientPromise
  const db = client.db("good-ol")

  const existingUser = await db.collection("scores").findOne({ name })

  if (existingUser) {
    if (score > existingUser.score) {
      await db.collection("scores").updateOne(
        { name },
        { $set: { score } }
      )
    }
  } else {
    await db.collection("scores").insertOne({ name, score })
  }

  return NextResponse.json({ message: 'Score updated' })
}

export async function GET() {
  const client = await clientPromise
  const db = client.db("good-ol")

  const scores = await db.collection("scores")
    .find({})
    .sort({ score: 1})
    .limit(10)
    .toArray()

  return NextResponse.json(scores)
}