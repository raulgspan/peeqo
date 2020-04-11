const config = require('config/config.js')
const speak = require('js/senses/speak')
const actions = require('js/actions/actions')
const responses = require('js/responses/responses')

async function doJoke() {
    actions.setAnswer(responses.joke, {
        type: 'remote',
        queryTerms: ['joke'],
    })

    const response = await fetch(`https://api.jokes.one/jod`)
    const json = await response.json()
    const joke = json.contents.jokes[0].joke.text

    console.log('joke', joke)

    speak.speak(joke, () => {
        event.emit('servo-move', 'jiggle')
    })
}

async function doChuck() {
    actions.setAnswer(responses.joke, {
        type: 'remote',
        queryTerms: ['chuck norris'],
    })

    const response = await fetch(`https://api.icndb.com/jokes/random`)
    const json = await response.json()    
    const joke = json.value.joke

    actions.setAnswer(responses.joke, {
        type: 'remote',
        queryTerms: ['chuck norris'],
        text: joke,
    })

    console.log('chuck', joke)

    speak.speak(joke, () => {
        event.emit('servo-move', 'jiggle')
    })
}

async function doTrendingGif() {
    const randNum = Math.floor(Math.random() * 100)
    const response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${config.giphy.key}&limit=1&offset=${randNum}`)
    const json = await response.json()        
    const url = json.data[0].images.original_mp4.mp4

    console.log('trending', url)

    actions.setAnswer(responses.joke, {
        type: 'url',
        url: url
    })
    
}

module.exports = {
    doJoke,
    doChuck,
    doTrendingGif,
}