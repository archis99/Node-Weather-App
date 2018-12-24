const axios = require('axios');
const url = require('../constants/url');
const keys = require('../keys/key');
const err = require('../constants/error');

module.exports = async (address, res) => {
    const mapData = await axios.get(`${url.GOOGLE_MAP_API}?address=${address}&key=${keys.mapApiKey}`);
    if (mapData.data.status === 'ZERO_RESULTS') {
        res.send({
            Error : err.NO_PROPER_ADDRESS
        });
        return;
    } else if (mapData.data.status === 'OVER_QUERY_LIMIT') {
        let err_msg = mapData.data.error_message;
        res.end(err_msg);
        return;
    } 
    
    let {lat, lng} = mapData.data.results[0].geometry.location;
    
    const darkSkyData = await axios.get(`${url.DARKSKY_API}${keys.weatherKey}/${lat},${lng}?exclude=hourly,daily&units=si`);
    //console.log(`darkSkyData: ${JSON.stringify(darkSkyData.data, null, 1)}`);

    let formattedAddress = mapData.data.results[0].formatted_address;
    let {temperature, apparentTemperature, 
        humidity, windSpeed, summary } = darkSkyData.data.currently;

    res.send({
        "Place" : formattedAddress,
        "Current Temperature(deg.C)": temperature,
        "Feels Like(deg.C)": apparentTemperature,
        "Humidity" : humidity,
        "Wind Speed(m/s)" : windSpeed,
        "Current Condition": summary
    });
};