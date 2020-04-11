const config = require('config/config.js')
const giphy = require('giphy-api')(config.giphy.key);
const path = require('path')


function findRemoteGif(query){
	if(!query){
		return null
	}

	return new Promise((resolve, reject)=>{
		giphy.translate(query, (err,res)=>{

			if(err || !res) reject(`Got error or no response when searching for "${query}" from Giphy`);

			//console.log(res.data.images)

			const gif = res.data.images.original_mp4.mp4

			resolve(gif)

		})
	})	
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
	return 3000
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

async function getJoke() {
	const response = await fetch(`https://api.jokes.one/jod`)
	const json = await response.json()

	return json.contents.jokes[0].joke.text
}

module.exports = {
	findRemoteGif,
	findRemoteVideo,
	findMediaType,
	findMediaDuration,
	getJoke,
}