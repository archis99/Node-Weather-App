"use strict";

const axios = require('axios');
const express = require('express');
const path = require('path');
const _ = require('underscore');
const url = require('./constants/url');
const err = require('./constants/error');
const keys = require('./keys/key');
const asyncApiHandler = require('./handler/asyncApiHandler');
const mapApiHandler = require('./handler/googleMapApi');
const darkSkyApiHandler = require('./handler/darkSkyApi');

const app = express();

//app.use(express.static(path.join(__dirname + '/')));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/fetchWeatherDetails',(req,res) => {
    //Get query string value
    let address = req.query.address;

    if (address === '') {
        res.send({
            Error : err.NO_ADDRESS
        });
    } else if (_.size(address) === 0) {
        res.send({
            Error : err.NO_ADDRESS_QUERY_STRING
        });
    } else {
        //let addr;
        asyncApiHandler(address, res)
        .then(() => {
            console.log(`Response Sent`);
        })
        .catch((error) => {
            console.log(error);
            res.end();
        });

        /*axios.get(`${url.GOOGLE_MAP_API}?address=${address}&key=${keys.mapApiKey}`)
        .then((response) => {
            return mapApiHandler(res, response);
        }).then((response) => {
            darkSkyApiHandler(res, response);
        })
        .catch((error) => {
            console.log(error);
            res.end();
        });*/
    }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Weather app running on ${port}`);
});
