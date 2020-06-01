const { validateAll } = require('indicative/validator')

module.exports = async (request, response, next) => {
    try {
        await validateAll(request.body, {
            choice: 'required',
            ip: 'required|ipv4'
        })

        return next()
    } catch (errors) {
        return response.status(422).json(errors)
    }
}
