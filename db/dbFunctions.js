import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
const url = "mongodb://localhost:27017"
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

export async function insertUser(dbName, collName, data) {
    await client.connect()

    const cleanup = (e) => {
        client.close()
        process.exit()
    }
    process.on('SIGINT', cleanup)
    process.on('SIGTERM', cleanup)
    const db = client.db(dbName)
    const colletcion = db.collection(collName)
    return await colletcion.insertOne(data)
}
export async function selectUser(dbName, collName, data) {
    await client.connect()

    const cleanup = (e) => {
        client.close()
        process.exit()
    }
    process.on('SIGINT', cleanup)
    process.on('SIGTERM', cleanup)
    const db = client.db(dbName)
    const colletcion = db.collection(collName)
    return await colletcion.findOne(data)
}
// To Do Database CRUD
export async function insertToDo(dbName, collName, data) {
    await client.connect()

    const cleanup = (e) => {
        client.close()
        process.exit()
    }
    process.on('SIGINT', cleanup)
    process.on('SIGTERM', cleanup)
    const db = client.db(dbName)
    const colletcion = db.collection(collName)
    return await colletcion.insertOne(data)
}
export async function selectToDo(dbName, collName, query) {
    await client.connect()

    const cleanup = (e) => {
        client.close()
        process.exit()
    }
    process.on('SIGINT', cleanup)
    process.on('SIGTERM', cleanup)
    const db = client.db(dbName)
    const colletcion = db.collection(collName)
    return await colletcion.find(query).toArray()
}

export async function updateToDo(dbName, collName, query, newValue) {
    await client.connect()

    const cleanup = (e) => {
        client.close()
        process.exit()
    }
    process.on('SIGINT', cleanup)
    process.on('SIGTERM', cleanup)
    const db = client.db(dbName)
    const colletcion = db.collection(collName)
    return await colletcion.updateOne(query, newValue)
}

export async function deleteToDo(dbName, collName, query) {
    await client.connect()

    const cleanup = (e) => {
        client.close()
        process.exit()
    }
    process.on('SIGINT', cleanup)
    process.on('SIGTERM', cleanup)
    const db = client.db(dbName)
    const colletcion = db.collection(collName)
    return await colletcion.deleteOne(query)
}
