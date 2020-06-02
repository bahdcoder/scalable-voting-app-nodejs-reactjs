module.exports = {
    port: process.env.PORT || 4000,
    databaseUri: process.env.DATABASE_URI || 'mongodb://localhost/voting-platform',
    redisConnectionUri: process.env.REDIS_CONNECTION_URI
}
