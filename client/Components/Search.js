import React from 'react';
import WeatherDetail from './WeatherDetail';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            weatherComponent: false,
            searchValue: '',
            place: null,
            currTemp: null,
            feelsLike: null,
            humidity: null,
            windSpeed: null,
            currCondition: null
        };
    }

    fetchWeather(e) {
        e.preventDefault();
        fetch(`/fetchWeatherDetails?address=${this.state.searchValue}`)
        .then((response) => {
            response.json().then((data) => {
                console.log(data);
                this.setState({
                    weatherComponent: true,
                    place: data.Place,
                    currTemp: data["Current Temperature(deg.C)"],
                    feelsLike: data["Feels Like(deg.C)"],
                    humidity: data.Humidity,
                    windSpeed: data["Wind Speed(m/s)"],
                    currCondition: data["Current Condition"]
                });
            });
        })
        ;
    }

    updateSearchValue(e) {
        this.setState({
            searchValue: e.target.value
        });
    }

    render() {
        return(
            <div>
                <form onSubmit={this.fetchWeather.bind(this)}>
                    <div>
                        <input 
                        type="search" 
                        value={this.state.searchValue} 
                        onChange={this.updateSearchValue.bind(this)} />
                    </div>
                    
                    <div>
                        <input type="submit" value="Weather Me" />
                    </div> 
                </form>

                {this.state.weatherComponent?
                <WeatherDetail 
                    place={this.state.place}
                    currTemp={this.state.currTemp}
                    feelsLike={this.state.feelsLike}
                    humidity={this.state.humidity}
                    windSpeed={this.state.windSpeed}
                    currCondition={this.state.windSpeed}
                />:null}
                

            </div>
        );
    }
}

export default Search;