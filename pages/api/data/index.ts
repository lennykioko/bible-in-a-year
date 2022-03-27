// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { Item } from "../../../typings"
const fsp = require("fs").promises

interface Data {
  items?: Item[]
  error?: string
}

export async function getData() {
  try {
    const data = await fsp.readFile("utils/cleanedData.json")
    const parsedData = JSON.parse(data)
    return { items: parsedData.items }
  } catch (error) {
    console.error(error)
    return { items: [] }
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const data = await fsp.readFile("utils/cleanedData.json")
    const parsedData = JSON.parse(data)
    res.status(200).json({ items: parsedData.items })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error reading data" })
  }
}
