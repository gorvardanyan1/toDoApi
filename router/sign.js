import express from "express"
export const sign = express.Router()
import { insertUser } from "../db/dbFunctions.js"
sign.post("/up", (req, res) => {
    const date = new Date()

    const { firstName, lastName, born, gender } = req.body
    res.send({ ...req.body, date: date.getUTCDay() })
})
sign.post("/in", (req, res) => {

})