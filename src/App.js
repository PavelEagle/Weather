import React from 'react';
import Info from './components/info';
import Form from './components/form';
import Weather from './components/weather';
import ShinningText from './components/shinningText';

const API_KEY = '88ec93c8bc578fb7e09367b86bce7577';

class App extends React.Component {

  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    pressure: undefined,
    sunrise: undefined,
    sunset: undefined,
    error: undefined
  }

  gettingWeather = async (event) => {
    event.preventDefault(); // убираем стандартное поведение, без перезагрузки
    const city = event.target.elements.city.value; // форма - кнопка - имя - значение
    
    if(city) {
      const api_url = await 
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`); // прочитать адрес и получить информацию из него
      const data = await api_url.json();

      let sunset = data.sys.sunset; 
      let sunrise = data.sys.sunrise; 
      let date = new Date (); // сегодняшняя дата
      date.setTime(sunset); 
      let sunset_date = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds (); // переводим sunset в чч:мм:сс
      date.setTime(sunrise); 
      let sunrise_date = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds (); // переводим sunset в чч:мм:сс

      this.setState({
        temp: data.main.temp,
        city: data.name,
        country: data.sys.country,
        pressure: data.main.pressure,
        sunrise: sunrise_date,
        sunset: sunset_date,
        error: undefined
      });
    } else {
      this.setState({
        temp: undefined,
        city: undefined,
        country: undefined,
        pressure: undefined,
        sunrise: undefined,
        sunset: undefined,
        error: "Введите название города" 
      })
    }
  }

  render () {
    return(
      <div className = "wrapper">
        <div id ="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <div className = "main">
          <div className = "info">
            <Info />
          </div>
          <div className = "mainForm">
            <Form weatherMethod={this.gettingWeather}/>
            <Weather 
              temp={this.state.temp}
              city={this.state.city}
              country={this.state.country}
              pressure={this.state.pressure}
              sunrise={this.state.sunrise}
              sunset={this.state.sunset}
              error={this.state.error}
            />
          </div>
          <ShinningText />
        </div>
      </div>
    )
  }
}

export default App;