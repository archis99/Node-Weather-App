const axios = require('axios');
const url = require('../constants/url');
const keys = require('../keys/key');
const err = require('../constants/error');

module.exports = (res, response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        res.send({
            Error : err.NO_PROPER_ADDRESS
        });
    } else if (response.data.status === 'OVER_QUERY_LIMIT') {
        let err_msg = response.data.error_message;
        res.end(err_msg);
    } else if (response.data.results !== undefined) {
        formattedAddress = response.data.results[0].formatted_address;
        addr = formattedAddress;
        //Using ES6 Object Destructuring
        let {lat, lng} = response.data.results[0].geometry.location;
        let darkSky = axios.get(`${url.DARKSKY_API}${keys.weatherKey}/${lat},${lng}?exclude=hourly,daily&units=si`);
        return Promise.all([formattedAddress, darkSky]);
    }
};