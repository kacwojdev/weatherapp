import { getWeatherByCity } from './apiService.js';
import { mapListToDOMElements } from './DOMActions.js';

class WeatherApp {
    constructor() {
        this.viewElems = {}
        this.connectDOMElements();
        this.setupListeners();
    }

    connectDOMElements = () => { 
        const listOfIds = Array.from(document.querySelectorAll('[id]')).map(elem => elem.id);
        this.viewElems = mapListToDOMElements(listOfIds);
    }

    setupListeners = () => {
        this.viewElems.searchInput.addEventListener('keydown', this.onSubmit);
        this.viewElems.searchButton.addEventListener('click', this.onSubmit);
        this.viewElems.returnToSearchBtn.addEventListener('click', this.returnToSearch);
    }

    onSubmit = (event) => {
        if (event.type === 'click' || event.key === 'Enter') {
            getWeatherByCity(this.viewElems.searchInput.value)
            .then(data => {
                if (data.cod === '404') {
                    this.viewElems.cityNotFoundLabel.innerText = 'Not found such city';
                    this.viewElems.searchInput.style.backgroundColor = '#f07a7a';
                } else {

                    this.viewElems.cityNotFoundLabel.innerText = '';
                    this.viewElems.searchInput.style.backgroundColor = '#f7f7f7';

                    this.fadeInOut();
                    this.displayWeatherData(data);
                }
            });
        }
    }

    fadeInOut = () => {
        if (this.viewElems.mainContainer.style.opacity === '1' || this.viewElems.mainContainer.style.opacity === '') {
            this.viewElems.mainContainer.style.opacity = '0';
         } else {
            this.viewElems.mainContainer.style.opacity = '1';
         }
    }

    switchView = () => {
        if (this.viewElems.weatherSearchView.style.display !== 'none') {
            this.viewElems.weatherSearchView.style.display = 'none';
            this.viewElems.weatherForecastView.style.display = 'flex';
        } else {
            this.viewElems.weatherSearchView.style.display = 'flex';
            this.viewElems.weatherForecastView.style.display = 'none';
        }
    }

    returnToSearch = () => {
        this.fadeInOut();
        setTimeout(() => {
            this.switchView();
            this.fadeInOut();
        }, 500);
    }

  displayWeatherData = data => {
        this.switchView();
        this.fadeInOut();
    
        const weatherData = data;
        console.log(weatherData);
        let currTemp = weatherData.main.temp;
        let maxTemp = weatherData.main.temp_max;
        let minTemp = weatherData.main.temp_min;
        let cityName = weatherData.name;
        let iconID = weatherData.weather[0].icon;
        console.log([currTemp, maxTemp, minTemp, cityName, iconID]);
        console.log(this.viewElems)
        this.viewElems.weatherCity.innerText = cityName;
        this.viewElems.weatherCurrentTemp.innerText = `${currTemp}°C`;
        this.viewElems.weatherMaxTemp.innerText = `${maxTemp}°C`;
        this.viewElems.weatherMinTemp.innerText = `${minTemp}°C`;
        this.viewElems.weatherIcon.src = `http://openweathermap.org/img/wn/${iconID}@2x.png`;
    
    };
};


document.addEventListener('DOMContentLoaded', new WeatherApp());
