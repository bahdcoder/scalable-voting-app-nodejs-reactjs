const Router = require('express').Router
const getPoll = require('../handlers/get-poll')
const createPolls = require('../handlers/create-polls')
const createVotes = require('../handlers/create-votes')

const createPollsValidator = require('../validators/create-polls')
const createVotesValidator = require('../validators/create-votes')

module.exports = (app, db, redisDb) => {
    const router = new Router()

    router.post('/polls', createPollsValidator, createPolls(db))

    router.put('/polls/:poll', createVotesValidator, createVotes(db, redisDb))

    router.get('/polls/:poll', getPoll(db))

    app.use(router)
}
