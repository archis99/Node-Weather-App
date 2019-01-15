import React from 'react';

class WeatherDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            displayError: false
        };
    }

    componentDidMount() {
        if(this.props.error !== null) {
            this.setState({displayError: true});
        }
    }

    render() {
        
        return(
            <div className="card">
                <h3 className="card-header">Details</h3>
                <div className="card-body">
                    
                    {this.state.displayError?<div className="text-danger">Error: {this.props.error}</div>:
                    <div>
                        <div>Place: {this.props.place}</div>
                        <div>Current Temperature(deg.C): {this.props.currTemp}</div>
                        <div>Feels Like(deg.C): {this.props.feelsLike}</div>
                        <div>Humidity: {this.props.humidity}</div>
                        <div>Wind Speed(m/s): {this.props.windSpeed}</div>
                        <div>Current Condition: {this.props.currCondition}</div>
                    </div>}
                </div>
                
            </div>
        );
    }
};

export default WeatherDetail;