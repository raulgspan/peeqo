const config = require('config/config.js')
const giphy = require('giphy-api')(config.giphy.key);
const path = require('path')


async function findRemoteGif(query){
	if (!query){
		return null
	}

	const randNum = Math.floor(Math.random() * 100)
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${config.giphy.key}&q=${query}limit=1&offset=${randNum}`)
	const json = await response.json()
	
    return json.data[0].images.original_mp4.mp4
}

async function findRemoteVideo(query){

	query = encodeURI(query)
	// let json = null
	try {
		let response = await fetch(`https://apiv2.vlipsy.com/v1/vlips/search?q=${query}&key=${config.vlipsy.key}`)
		if(!response.ok){
			throw new Error(`Error accessing vlipsy. Check api key or query`)
		}
		var json = await response.json()
	} catch(e){
		console.error(e)
		return
	}
	
	const acceptableDuration = 5.5;
	let acceptableVlips = []

	for(let i=0; i<json.data.length; i++){
		if(json.data[i].duration <= acceptableDuration){
			acceptableVlips.push(json.data[i])
		}
	}

	const item = acceptableVlips[Math.floor(Math.random()*acceptableVlips.length)]

	return item.media.mp4.url
}

async function findMediaType(filepath){

	if(!filepath){
		return null
	}

	let imgFiles = [".png", ".jpg", ".jpeg"]
	let videoFiles = [".mp4"]
	let gifFiles = [".gif", ".webp"]

	if(imgFiles.includes(path.extname(filepath).toLowerCase())){
		return "img"
	}

	if(videoFiles.includes(path.extname(filepath).toLowerCase())){
		return "video"
	}

	if(gifFiles.includes(path.extname(filepath).toLowerCase())){
		return "gif"
	}
}

async function findMediaDuration(path){
	if(!path){
		return null
	}

	let type = await findMediaType(path)

	let duration = 0

	if(type == 'video'){

		duration = await findVideoDuration(path)
		

	} else if(type == 'img'){
		console.log('image')

		duration = await findGifDuration(path)

	} else if(type == 'gif'){
		
		duration = await findGifDuration(path)
		
	}

	return duration
}

async function findGifDuration(path){

	let gif = document.getElementById("gif")
	gif.src = path
	return 5000
	// need to implement method to find duration of gif
}


async function findVideoDuration(path){

	if(!path){
		return null
	}

	let endPauseDuration = 1200
	let video = document.getElementById("video")
	video.src = path
	video.pause()

	const canplay = await new Promise((resolve, reject) => {
		video.addEventListener('canplay', (e)=>{
			resolve(e.returnValue)
		})
	})

	if(!canplay){
		return 0
	}

	let duration = video.duration*1000+endPauseDuration
	return duration
}

// a text to voice api that we don't appear to need since we have "speak"
async function getVoice(text) {
	const response = await fetch(`https://api.voicerss.org/?key=622b7c80270449c9a52129e5b07b83c6&hl=en-us&src=` + escape(text))
	return response.body
}

module.exports = {
	findRemoteGif,
	findRemoteVideo,
	findMediaType,
	findMediaDuration,
	getVoice,
}