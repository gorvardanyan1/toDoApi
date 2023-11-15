import express from "express"
import cors from "cors"
import { sign } from "./router/sign.js"
import { toDos } from "./router/toDo.js"
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"
import { selectUser } from "./db/dbFunctions.js"
import { ObjectId } from "mongodb"
const app = express()
// app.use(cors({ origin: 'https://to-do-next-iota.vercel.app', credentials: true }));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}))
app.get("/", async (req, res) => {
    const cookie = req.cookies['jwt']
    if (cookie == undefined) {
        return res.sendStatus(401)
    }
    const claims = jwt.verify(cookie, process.env.SECRET_KEY)

    if (!claims) {
        return res.status(401).send({
            message: 'unauthenticated'
        })
    }
    const userData = await selectUser("toDoAppDb", "users", { _id: new ObjectId(claims._id) })
    res.send({ ...userData })
})
app.use("/sign", sign)
app.use("/todos", toDos)

app.listen(process.env.PORT, () => console.log("server listened port 5000"))