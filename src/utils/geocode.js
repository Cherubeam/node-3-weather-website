const request = require('request')

const geocode = (address, callback) => {
    if (!address) {
        return console.log('Please provide an address!')
    }

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?limit=1&language=de&access_token=pk.eyJ1IjoiY2hlcnViaW0iLCJhIjoiY2p2a3Z1amc1MGFsOTRhbXVmZHJmczVvMiJ9.heFpg5Lq1UPTJDOwnZVTxA`
    
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location service!')
        } else if (body.features.length === 0) {
            callback('Unable to find location! Try another search.')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode