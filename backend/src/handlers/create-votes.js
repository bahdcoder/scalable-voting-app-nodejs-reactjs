const { v4 } = require('uuid')

module.exports = (db) => {
    return async (request, response) => {
        const result = await db.collection('polls').updateOne({
            _id: request.params.poll,
            'choices._id': request.body.choice
        }, {
            $inc: {
                'choices.$.count': 1
            }
        })

        return response.json({
            message: 'Vote has been registered.'
        })
    }
}
