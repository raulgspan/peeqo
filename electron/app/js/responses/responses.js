module.exports = {

	/*
	Obj Structure:

	intentName: {
		localFolder: 'xxx' <- Local folder in app/media/responses/ where you are storing local media responses
		queryTerms: ['a','b','c'] <- what terms to use to query media from online sources like giphy.com
		servo: 'ccc' <- name of servo animation stored in app/media/servo_anims/ (without the .json)
		led: {
			anim: 'eee' <- name of animation, must be a function in app/js/senses/leds.js 
			color: 'red' <- color leds, must be defined in app/js/senses/leds.js
		}
		sound: 'cccc.wav/mp3' <- mp3 or wav file located in app/media/sounds/
		cbBefore: function <- callback function before media playback
		cbDuring: function <- callback function during media playback
		cbAfter: function <- callback function after media playback
		text: 'string' <- what text should be overlayed on the screen
	}
	*/
	animals: {
		led: {
			anim: 'circle',
			color: 'aqua'
		},
	},

	joke: {
		led: {
			anim: 'circle',
			color: 'yellow'
		},
	},

	confused: {
		localFolder: 'confused',
		queryTerms: ['shrug', 'confused', 'dont know'],
		servo: null,
		led: {
			anim: 'blink',
			color: 'orange'
		},
		sound: null
	},

	greeting: {
		localFolder: 'greeting',
		queryTerms: ['hello','hi','howdy','sup','whatsup'],
		servo: 'look-up',
		led: {
			anim: 'blink',
			color: 'green'
		},
		sound: 'alert.wav',
		text: 'Hi!'
	},

	bye: {
		localFolder: "bye",
		queryTerms:["bye","see you","goodbye","ciao","so long"],
		servo: "look-up-slow",
		led: {
			anim: "blink",
			color: "blue"
		},
		sound: 'alert.wav',
		text: 'Bye bye!'
	},

	wakeword: {
		localFolder: null,
		queryTerms: null,
		//servo: 'alert',
		led: {
			anim:'circle',
			color: 'aqua'
		},
		//sound: 'alert.wav',
		cbAfter: function(){
			event.emit('speech-to-text')
		}
	},

	ok: {
		localFolder: 'ok',
		queryTerms:["ok","okay","you got it"],
		servo: "look-up",
		led: {
			anim: "blink",
			color: "green"
		},
		sound: null
	},

	alarm: {
		localFolder: "alarm",
		queryTerms:["alarm","ringing","party"],
		servo: "jiggle",
		led: {
			anim: "blink",
			color: "yellow"
		},
		sound:null
	},
}