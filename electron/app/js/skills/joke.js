const media = require('js/helpers/media')
const speak = require('js/senses/speak')
const actions = require('js/actions/actions')

async function doJoke() {
    const joke = await media.getJoke()
    console.log('joke', joke)

    let cbDuring = () => {
        speak.speak(joke)
    }
    actions.setAnswer(responses.joke, {
        type: 'remote',
        queryTerms: ['joke'],
        cbDuring: cbDuring,
        text: joke
    })
}

module.exports = {
	doJoke,
}