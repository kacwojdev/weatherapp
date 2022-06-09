import { getWeatherByCity } from './apiService.js';

const viewElems = {};

const getDomElem = id => document.getElementById(id);

const connectHTMLElems = () => {
    viewElems.mainContainer = getDomElem('mainContainer');
    viewElems.weatherSearchView = getDomElem('weatherSearchView');
    viewElems.weatherForecastView = getDomElem('weatherForecastView');

    viewElems.searchInput = getDomElem('searchInput');
    viewElems.searchButton = getDomElem('searchButton');
    viewElems.weatherCityContainer = getDomElem('weatherCityContainer');
    
    viewElems.weatherCity = getDomElem('weatherCity');
    viewElems.weatherIcon = getDomElem('weatherIcon');

    viewElems.weatherCityCurrentTemp = getDomElem('weatherCurrentTemp');
    viewElems.weatherMaxTemp = getDomElem('weatherMaxTemp');
    viewElems.weatherMinTemp = getDomElem('weatherMinTemp');

    viewElems.returnToSearchBtn = getDomElem('returnToSearchBtn');
}

const setupListeners = () => {
    viewElems.searchInput.addEventListener('keydown', onEnterSubmit);
    viewElems.searchButton.addEventListener('click', onClickSubmit);
    viewElems.returnToSearchBtn.addEventListener('click', returnToSearch);
}

const initializeApp = () => {
    connectHTMLElems();
    setupListeners();
}

const onEnterSubmit = (event) => {
    if (event.key === "Enter") {
        fadeInOut();
        getWeatherByCity(viewElems.searchInput.value).then(data => {
            console.log(data);
            switchView();
            fadeInOut();
        });
    }
};
const onClickSubmit = (event) => {
    event.preventDefault();
    fadeInOut();
    getWeatherByCity(viewElems.searchInput.value).then(data => {
        console.log(data);
        switchView();
        fadeInOut();
    });
};

const fadeInOut = () => {
     if (viewElems.mainContainer.style.opacity === '1' || viewElems.mainContainer.style.opacity === '') {
        viewElems.mainContainer.style.opacity = '0';
     } else {
        viewElems.mainContainer.style.opacity = '1';
     }
}

const switchView = () => {
    console.log(viewElems.weatherSearchView.style);
    if (viewElems.weatherSearchView.style.display !== 'none') {
        viewElems.weatherSearchView.style.display = 'none';
        viewElems.weatherForecastView.style.display = 'flex';
    } else {
        viewElems.weatherSearchView.style.display = 'flex';
        viewElems.weatherForecastView.style.display = 'none';
    }
}

const returnToSearch = () => {
    fadeInOut();
    setTimeout(() => {
        switchView();
        fadeInOut();
    }, 500);
}

document.addEventListener('DOMContentLoaded', initializeApp);