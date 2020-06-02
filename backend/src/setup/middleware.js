const cors = require('cors')
const BodyParser = require('body-parser')

module.exports = (app) => {
    app.use(BodyParser.json())

    app.use(cors())
}
