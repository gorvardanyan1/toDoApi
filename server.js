import express from "express"
import cors from "cors"
import { sign } from "./router/sign.js"


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", async (req, res) => {
    res.send({
        firstName: "Tom",
        lastName: "Redl"
    })
})
app.use("/sign", sign)

app.listen(5000,()=>console.log("server listened port 5000"))