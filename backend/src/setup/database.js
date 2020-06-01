const Mongodb = require('mongodb')

const uri = 'mongodb://localhost/voting-platform'

module.exports = async () => {
    const client = new Mongodb.MongoClient(uri, {
        useUnifiedTopology: true
    })

    await client.connect()

    return client.db()
}
