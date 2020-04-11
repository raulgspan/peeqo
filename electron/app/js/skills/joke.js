const media = require('js/helpers/media')
const speak = require('js/senses/speak')
const actions = require('js/actions/actions')
const responses = require('js/responses/responses')

async function doJoke() {
    const joke = await media.getJoke()
    console.log('joke', joke)

    speak.speak(joke, () => {
        event.emit('servo-move', 'jiggle')
    })

    actions.setAnswer(responses.joke, {
        type: 'remote',
        queryTerms: ['joke'],
        text: joke
    })
}

module.exports = {
	doJoke,
}