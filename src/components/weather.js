import React from 'react';

const Weather = props => (
    <div>
    { props.city &&
        <div>
        <p>Местонахождение: {props.city}, {props.country}</p>
        <p>Температура: {props.temp}</p>
        <p>Давление: {props.pressure}</p>
        <p>Восход солнца: {props.sunrise}</p>
        <p>Закат: {props.sunset}</p>
        </div>
    }
    <p>{props.error}</p>
    </div>
);

export default Weather;