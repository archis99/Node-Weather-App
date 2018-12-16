const axios = require('axios');
const keys = require('./keys/key');
const express = require('express');
const _ = require('underscore');

const app = express();

var formattedAddress = '';

app.get('/fetchWeatherDetails',(req,res) => {
    var address = req.query.address;

    if (address === '') {
        res.send({
            Error : "Provide an address or ZipCode"
        });
    } else if (_.size(address) === 0) {
        res.send({
            Error : "Give 'address' query string after the url"
        });
    } else {
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${keys.mapApiKey}`)
        .then((response) => {
            if (response.data.status === 'ZERO_RESULTS') {
                res.send({
                    Error : "Give a proper address"
                });
            } else if (response.data.status === 'OVER_QUERY_LIMIT') {
                let err_msg = "Oops!!" + response.data.error_message;
                res.end(err_msg);
            } else if (response.data.results !== undefined) {
                
                formattedAddress = response.data.results[0].formatted_address;
                //Using ES6 Object Destructuring
                var {lat, lng} = response.data.results[0].geometry.location;

                return axios.get(`https://api.darksky.net/forecast/${keys.weatherKey}/${lat},${lng}?exclude=hourly,daily&units=auto`);
            }
        }).then((response) => {
            if (response === undefined) {
                throw new Error("Google Map API couldn't fetch details");
            } else {
                //console.log(JSON.stringify(response.data, undefined, 1));
                var curTemp = response.data.currently.temperature;
                var feelTemp = response.data.currently.apparentTemperature;
                var humidity = response.data.currently.humidity;
                var windSpeed = response.data.currently.windSpeed;
                var condition = response.data.currently.summary;

                res.send({
                    "Place" : formattedAddress,
                    "Current Temperature": curTemp,
                    "Feels Like": feelTemp,
                    "Humidity" : humidity,
                    "Wind Speed" : windSpeed,
                    "Current Condition": condition
                });
            }
            
        })
        .catch((error) => {
            console.log(error);
        });
    }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Weather app running on ${port}`);
});
