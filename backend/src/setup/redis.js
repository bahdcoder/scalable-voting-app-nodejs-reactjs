const redis = require('redis')

module.exports = () => {
    return redis.createClient()
}
