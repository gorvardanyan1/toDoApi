import express from "express"
import { deleteToDo, insertToDo, selectToDoS, updateToDo } from "../db/dbFunctions.js"
import { getFullUTCDate } from "../additionalFunction/additional.js"
import { ObjectId } from "mongodb"
import jwt from "jsonwebtoken"
export const toDos = express.Router()


toDos.get("/", async (req, res) => {
    const cookie = req.cookies['jwt']
    console.log(cookie);
    if (cookie) {
        const claims = jwt.verify(cookie, process.env.SECRET_KEY)
        const todos = await selectToDoS("toDoAppDb", "toDoS", { parent_Id: claims._id })
        res.send(todos)
    }
})

toDos.post("/", async (req, res) => {
    const cookie = req.cookies['jwt']
    if (cookie) {
        const claims = jwt.verify(cookie, process.env.SECRET_KEY)

        const { title, description } = req.body
        const todoData = {
            title,
            description,
            isComplated: false,
            createdDateUTC: getFullUTCDate(),
            parent_Id: claims._id
        }
        try {
            await insertToDo("toDoAppDb", "toDoS", todoData)
            res.sendStatus(200)
        } catch (err) {
            res.sendStatus(400)
        }

    }

    else {
        res.sendStatus(401)
    }

})
toDos.put("/:id", async (req, res) => {
    const { title, description } = req.body
    const todoData = {
        title,
        description
    }
    try {
        await updateToDo("toDoAppDb", "toDoS", { _id: new ObjectId(req.params.id) }, { $set: { ...todoData } })
        res.sendStatus(200)
    } catch (err) {
        res.sendStatus(400)
    }


})
toDos.delete("/:id", async (req, res) => {
    try {
        await deleteToDo("toDoAppDb", "toDoS", { _id: new ObjectId(req.params.id) })
        res.sendStatus(200)
    }
    catch (err) {
        res.sendStatus(400)
    }
})