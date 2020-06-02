const Mongodb = require('mongodb')
const Config = require('../config')

module.exports = async () => {
    const client = new Mongodb.MongoClient(Config.databaseUri, {
        useUnifiedTopology: true
    })

    await client.connect()

    return client.db()
}
