const { promisify } = require('util')

module.exports = (db, redisDb) => {
    const saddAsync = promisify(redisDb.sadd).bind(redisDb)
    const sisMemberAsync = promisify(redisDb.sismember).bind(redisDb)

    return async (request, response) => {
        const isMember = await sisMemberAsync(request.params.poll, request.body.ip)

        if (isMember) {
            return response.status(400).json({
                message: 'You have already voted for this poll.'
            })
        }

        const result = await db.collection('polls').updateOne({
            _id: request.params.poll,
            'choices._id': request.body.choice
        }, {
            $inc: {
                'choices.$.count': 1
            }
        })

        await saddAsync(request.params.poll, request.body.ip)

        return response.json({
            message: 'Vote has been registered.'
        })
    }
}
