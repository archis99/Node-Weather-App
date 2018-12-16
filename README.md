# Node-Weather-App
A simple weather API based on Node & Express.The app consumes google-map-api and dark-sky weather api to give you 
some general info about current cliamte condition based on the address provided.

## Getting Started
Download the project from [here](https://github.com/archis99/Node-Weather-App)

### Prerequisites
You need to have Google map api key and Dark sky weather secret key.

## Installing
After downloading the project, create a file `key.js` in `keys` folder and give the api keys in below format,

`
module.exports = {
    mapApiKey: '',
    weatherKey: ''
};
`

Then run the project with command `npm start`.

To see api response, in browser hit the link `http://localhost:port/fetchWeatherDetails?address="some address"`

##Heroku

Currently this service is deployed in Heroku. Visit the link `https://node-weather-appv1.herokuapp.com/fetchWeatherDetails?address=`

Enjoy.
