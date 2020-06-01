const { validateAll } = require('indicative/validator')

module.exports = async (request, response, next) => {
    try {
        await validateAll(request.body, {
            title: 'required',
            choices: 'required|array|min:2',
            'choices.*': 'required|string'
        })

        return next()
    } catch (errors) {
        return response.status(422).json(errors)
    }
}
