const Mongodb = require('mongodb')

const uri = 'mongodb://localhost/voting-platform'

module.exports = () => {
    const client = new Mongodb.MongoClient(uri, {
        useUnifiedTopology: true
    })

    return client.connect()
}
