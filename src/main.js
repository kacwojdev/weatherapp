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

    viewElems.returnToSearchBtn = getDomElem('returnToSearchButton');
}

const setupListeners = () => {
    viewElems.searchInput.addEventListener('keydown', onEnterSubmit);
    viewElems.searchButton.addEventListener('click', onClickSubmit);
}

const initializeApp = () => {
    connectHTMLElems();
    setupListeners();
}

const onEnterSubmit = () => {};
const onClickSubmit = () => {};

document.addEventListener('DOMContentLoaded', initializeApp);