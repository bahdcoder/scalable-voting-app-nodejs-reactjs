module.exports = (db) => {
    return async (request, response) => {
        const poll = await db.collection('polls').findOne({
            _id: request.params.poll
        })

        return response.json(poll)
    }
}
