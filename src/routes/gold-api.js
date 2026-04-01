import express from "express"

import { karatValues } from "../constants/karatValues.ts"

const app = express()
const port = 3000

app.get("/api", async (req, res) => {
  try {
    const data = {
      "gold": {
        "9k": {
          "purify": 0.375,
          "price_per_gram": karatValues[9],
        },
        "14k": {
          "purify": 0.585,
          "price_per_gram": karatValues[14],
        },
        "18k": {
          "purify": 0.75,
          "price_per_gram": karatValues[18],
        },
        "24k": {
          "purify": 1,
          "price_per_gram": karatValues[24],
        },
      },
      currency: "AOA",
      last_update: new Date().toISOString(),
    }


    res.json(data)
  } catch (e) {
    res.status(500).send(e)
  }
})

app.listen(port, () => {
  console.log("Server running")
})
