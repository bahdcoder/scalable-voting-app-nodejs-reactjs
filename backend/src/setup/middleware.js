const BodyParser = require('body-parser')

module.exports = (app) => {
    app.use(BodyParser.json())
}
