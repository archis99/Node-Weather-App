const axios = require('axios');
const keys = require('./keys/key');
const express = require('express');
const _ = require('underscore');

const app = express();

var formattedAddress = '';

app.get('/',(req,res) => {
    var address = req.query.address;

    if (address === '') {
        res.send({
            "Error message": "Provide an address or ZipCode"
        });
    } else if (_.size(address) === 0) {
        res.send({
            "Error message": "Give 'address' query string after the url"
        });
    } else {
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${keys.mapApiKey}`)
        .then((response) => {
            if (response.data.status === 'ZERO_RESULTS') {
                res.send({
                    "Error message": "Give a proper address"
                });
            } else {
                formattedAddress = response.data.results[0].formatted_address;
                var lat = response.data.results[0].geometry.location.lat;
                var lng = response.data.results[0].geometry.location.lng;

                return axios.get(`https://api.darksky.net/forecast/${keys.weatherKey}/${lat},${lng}?exclude=hourly,daily&units=si`);
            }
        }).then((response) => {
            if (response === undefined) {
                throw new Error('Proper address was not given');
            } else {
                var curTemp = response.data.currently.temperature;
                var feelTemp = response.data.currently.apparentTemperature;
                
                res.send({
                    "Place" : formattedAddress,
                    "Current Temperature": curTemp,
                    "Feels Like": feelTemp
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
