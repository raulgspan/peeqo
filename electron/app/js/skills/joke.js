const speak = require('js/senses/speak')

async function doJoke() {
    const joke = await media.getJoke()
    console.log('joke', joke)

    speak.speak(joke)
    /*
    let cbDuring = () => {
        speak.speak(joke)
    }
    actions.setAnswer(responses.joke, {
        type: 'remote',
        queryTerms: ['joke'],
        cbDuring: cbDuring,
        text: joke
    })
    */
}