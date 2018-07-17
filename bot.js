var Twit = require('twit')

var T = new Twit({
	consumer_key: '***REMOVED***',
	consumer_secret: '***REMOVED***',
	access_token: '***REMOVED***',
	access_token_secret: '***REMOVED***',
	timeout_ms:           60*1000,
})

tweetIt()

setInterval(tweetIt, 1000 * 60 * 60 * 24)

function tweetIt() {
	var date = new Date()
	var currentYear = date.getFullYear()
	var currentMonth = date.getMonth() + 1
	var currentDay = date.getDate()
	var yesterday = currentDay - 1
	if (yesterday < 1) {
		currentDay = 28
		currentMonth = currentMonth - 1
	}
	if (currentMonth < 1) {
		currentMonth = 12
		currentYear = currentYear - 1
	}
	
	//console.log(currentYear)
	//console.log(currentMonth)
	//console.log(yesterday)
	
	var str = 'since:'
	var dash = '-'
	currentYear = currentYear.toString()
	currentMonth = currentMonth.toString()
	yesterday = yesterday.toString()
	
	var since = str.concat(currentYear, dash, currentMonth, dash, yesterday)
	var hashtag = '#ModdingTipOfTheDay '
	var users = ' from:@vazkii OR from:@DarkGuardsman OR from:@RWTema OR from:@lothrazar OR from:@McJty OR from:@KitsuneAlexx OR from:@TheCodeWarrior1 OR from:@kingbdogz OR from:@UpcraftLP OR from:@gegy1000 OR from:@Glenn_AA OR from:@shin00w OR from:@AtomicBlom OR from:@Drullkus OR from:@ohaiiChun OR from:@ZephyrWolf_ OR from:@DarkhaxDev OR from:@matrexsvigil OR from:@voxcpw OR from:@neptunepunk OR from:@sokratis12GR'
	var query = hashtag.concat(since, users)
	
	//console.log(query)
	
	T.get('search/tweets', { q: query, count: 1000 }, function(err, data, response) {
		var i;
		for (i = 0; i < data.statuses.length; i++) {
			//console.log(data.statuses.length)
			//console.log(data)
			//console.log(data.statuses[i].id_str)
			T.post('statuses/retweet/:id', { id: data.statuses[i].id_str }, function (err, data, response) {
				console.log(data)
			})
		}
	})
}