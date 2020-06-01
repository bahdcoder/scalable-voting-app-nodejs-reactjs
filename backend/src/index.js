const Express = require('express')
const setupDatabase = require('./setup/database')
const setupMiddleware = require('./setup/middleware')

const app = Express()

setupMiddleware(app)

setupDatabase()
    .then((client) => {
        app.listen(4000, () => {
            console.log('Server started on port 4000')
        })
    })
    .catch(console.error)
