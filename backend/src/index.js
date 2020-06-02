const Config = require('./config')
const Express = require('express')
const setupRedis = require('./setup/redis')
const setupRouter = require('./setup/router')
const setupDatabase = require('./setup/database')
const setupMiddleware = require('./setup/middleware')

const app = Express()

setupMiddleware(app)

async function start() {
    const db = await setupDatabase()
    const redisDb = await setupRedis()

    setupRouter(app, db, redisDb)

    app.listen(Config.port, () => {
        console.log('Server started on port', Config.port)
    })
}


start().catch(console.error)
