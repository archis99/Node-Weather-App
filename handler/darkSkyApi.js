const _ = require('underscore');

module.exports = (res, response) => {
    console.log(`Address: ${addr}`);
    if (_.size(response) === 0) {
        throw new Error("Google Map API couldn't fetch details");
    } else {
        //console.log(JSON.stringify(response.data, undefined, 1));
        let formattedAddress = addr;
        let curTemp = response[1].data.currently.temperature;
        let feelTemp = response[1].data.currently.apparentTemperature;
        let humidity = response[1].data.currently.humidity;
        let windSpeed = response[1].data.currently.windSpeed;
        let condition = response[1].data.currently.summary;

        res.send({
            "Place" : formattedAddress,
            "Current Temperature(deg.C)": curTemp,
            "Feels Like(deg.C)": feelTemp,
            "Humidity" : humidity,
            "Wind Speed(m/s)" : windSpeed,
            "Current Condition": condition
        });
    }
};