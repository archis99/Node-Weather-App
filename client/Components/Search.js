import React from 'react';
import WeatherDetail from './WeatherDetail';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            spinners: false,
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
        this.setState({
            spinners: true,
            weatherComponent: false
        });
        fetch(`/fetchWeatherDetails?address=${this.state.searchValue}`)
        .then((response) => {
            response.json().then((data) => {
                this.setState({
                    weatherComponent: true,
                    place: data.Place,
                    currTemp: data["Current Temperature(deg.C)"],
                    feelsLike: data["Feels Like(deg.C)"],
                    humidity: data.Humidity,
                    windSpeed: data["Wind Speed(m/s)"],
                    currCondition: data["Current Condition"],
                    spinners: false
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
            <div id="search">
                
                <div className="row justify-content-center">
                    <form onSubmit={this.fetchWeather.bind(this)}>
                        <div>
                            <input 
                            type="search" 
                            placeholder="Zipcode or Place name"
                            value={this.state.searchValue} 
                            onChange={this.updateSearchValue.bind(this)} />
                        </div>
                        
                        <div className="row justify-content-center">
                            <input 
                            type="submit" 
                            value="Give it a shot!" 
                            className="btn btn-primary" 
                            id="submit-border"/>
                        </div> 
                    </form>
                </div>

                <div className="row justify-content-center">
                    {this.state.spinners?
                    <div>
                        <div class="spinner-grow text-success" role="status">
                        <span class="sr-only">Loading...</span>
                            </div>
                        <div class="spinner-grow text-danger" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                        <div class="spinner-grow text-warning" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>:null}
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
                

            </div>
        );
    }
}

export default Search;