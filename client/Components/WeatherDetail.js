import React from 'react';

class WeatherDetail extends React.Component {

    render() {
        return(
            <div>
                <div>Place: {this.props.place}</div>
                <div>Current Temperature(deg.C): {this.props.currTemp}</div>
                <div>Feels Like(deg.C): {this.props.feelsLike}</div>
                <div>Humidity: {this.props.humidity}</div>
                <div>Wind Speed(m/s): {this.props.windSpeed}</div>
                <div>Current Condition: {this.props.currCondition}</div>
            </div>
        );
    }
};

export default WeatherDetail;