import express from "express"
export const sign = express.Router()
import { insertUser } from "../db/dbFunctions.js"
import { getFullUTCDate } from "../additionalFunction/additional.js"
import bcrypt from "bcrypt"
sign.post("/up", async (req, res) => {
    const { firstName, lastName, userName, password, born, gender } = req.body
    const hashedPasswrod = await bcrypt.hash(password, 9)
    if (firstName != "" && lastName != "" && born != "" && gender != "" && password != "") {
        const sendedDate = {
            firstName,
            lastName,
            born,
            gender,
            userName,
            password: hashedPasswrod,
            signUpDate: getFullUTCDate()
        }
        try {
            await insertUser("toDoAppDb", "users", sendedDate)
            res.sendStatus(200)
        } catch (error) {
            if (error.code === 11000) {
                res.send({ errorMessage: "duplicate key error collection:" })
            }

        }
    }
    else {
        res.sendStatus(400)
    }


})
sign.post("/in", (req, res) => {

})