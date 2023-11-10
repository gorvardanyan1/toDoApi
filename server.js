import express from "express"
import cors from "cors"
import { sign } from "./router/sign.js"
import { toDos } from "./router/toDo.js"
import session from "express-session"

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: 'your-session-secret', resave: true, saveUninitialized: true }));

app.get("/", async (req, res) => {
    if (req.session.accessToken != undefined) {
        res.redirect("/todos")
    }
    else {
        res.redirect("/sign/in")
    }
})
app.use("/sign", sign)
app.use("/todos", toDos)

app.listen(5000, () => console.log("server listened port 5000"))