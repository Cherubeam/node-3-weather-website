const request = require('request')

const forecast = (latitude, longitude, callback) => {
	const url = `https://api.darksky.net/forecast/14672e0761839f0249dddf78245b8ef6/${latitude},${longitude}?lang=de&units=si`

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather service!')
		} else if (body.error) {
			callback('Unable to find location!')
		} else {
			callback(
				undefined,
				`${body.daily.data[0].summary} Die Temperatur beträgt derzeit ${
					body.currently.temperature
				} Grad. Die Tiefsttemperatur beträgt ${
					body.daily.data[0].temperatureLow
				} Grad und die Höchsttemperatur beträgt ${
					body.daily.data[0].temperatureHigh
				} Grad. Es besteht eine ${
					body.currently.precipProbability
				}%ige Chance auf Regen.`
			)
		}
	})
}

module.exports = forecast
