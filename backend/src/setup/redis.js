const redis = require('redis')
const Config = require('../config')

module.exports = () => {
    return redis.createClient(Config.redisConnectionUri)
}
