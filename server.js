import express from "express"
import cors from "cors"
import { sign } from "./router/sign.js"
import { toDos } from "./router/toDo.js"
import session from "express-session"
import cookieParser from "cookie-parser"
const app = express()
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(session({ secret: 'your-session-secret', resave: false, saveUninitialized: false, cookie: { secure: true } }));

app.get("/", async (req, res) => {
    console.log(req.session.accessToken);
    res.send(req.session)
    // if (req.session.accessToken != undefined) {
    //     res.redirect("/todos")
    // }
    // else {
    //     res.redirect("/sign/in")
    // }
})
app.use("/sign", sign)
app.use("/todos", toDos)

app.listen(5000, () => console.log("server listened port 5000"))